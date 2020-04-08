const fs = require("fs-extra");
const readline = require("readline");
const path = require("path");
const config = require("./config.js");

async function main() {
    const profile = await promptProfileSelection(config.Profiles)
        .catch(err => {
            console.error(err);
            process.exit();
        });

    if(profile.Backup === true) await backupDashboard(profile.DashboardBasePath, config.DashboardBackupPath)
        .catch(err => {
            console.error("Failed to backup dashboard:", err);
            process.exit(1);
        });

    await findAndOverwrite(profile.FindAndOverwrite, profile.DashboardBasePath, config.ModificationSourcePath)
        .catch(err => {
            console.error("Failed to find and overwrite", err);
            process.exit(1);
        });

    await findAndReplace(profile.FindAndReplace, profile.DashboardBasePath)
        .catch(err => {
            console.error("Failed to find and replace", err);
            process.exit(1);
        });

    await findAndInsert(profile.FindAndInsert, profile.DashboardBasePath)
        .catch(err => {
            console.error("Failed to find and insert:", err);
            process.exit(1);
        });

    console.log("Successfully performed modifications without errors");
}

function promptProfileSelection(profiles) {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        interface.question(`Select a patch to apply:\n${profiles.map((p, i) => `${i}) ${p.Name}\n`).join(", ")} \n`, answer => {
            if(isNaN(answer)) reject("Profile index must be a number")
            
            if(answer > (profiles.length - 1)) reject(`No profile with the index ${answer} exists`);

            const profile = profiles[Number(answer)];

            resolve(profile.Profile);

            interface.close();
        });
    });
}

function findAndReplace(replaceRules, basePath) {
    return new Promise(async (resolve, reject) => {
        for(const rule of replaceRules) {
            try {
                const destFilePath = path.join(basePath, rule.destFile);

                const isDirDest = await fs.statSync(destFilePath).isDirectory();
                if(isDirDest) reject(`Find and replace destination must be a file (${destFilePath})`);

                let replaceFileContents = await fs.readFileSync(destFilePath, "utf8");
                const replaceIndex = replaceFileContents.indexOf(rule.findString);

                if(replaceIndex === -1) reject(`Replace string not found in source file (${rule.destFilePath})`);

                replaceFileContents = replaceAtIndex(replaceFileContents, replaceIndex, rule.replaceString);

                await fs.writeFileSync(destFilePath, replaceFileContents);
            } catch (err) {
                reject(err);
            }
        }
    });
}

function findAndInsert(insertRules, basePath) {
    return new Promise(async (resolve, reject) => {
        for (const rule of insertRules) {
            try {
                const destFilePath = path.join(basePath, rule.destFile);

                const isDirDest = await fs.statSync(destFilePath).isDirectory();
                if(isDirDest) reject(`Find and insert destination must be a file (${destFilePath})`);

                let insertFileContents = await fs.readFileSync(destFilePath, "utf8");
                const insertIndex = insertFileContents.indexOf(rule.findString);

                if(insertIndex === -1) reject(`Insert string not found in source file (${rule.destFilePath})`);

                insertFileContents = insertAtIndex(insertFileContents, insertIndex + rule.findString.length, rule.insertString);

                await fs.writeFileSync(destFilePath, insertFileContents);
            } catch (err) {
                reject(err);
            }
        }

        resolve();
    });
}

function findAndOverwrite(overwriteRules, basePath, modificationSourcePath) {
    return new Promise(async (resolve, reject) => {
        for (const rule of overwriteRules) {
            try {
                const sourcePath = path.join(modificationSourcePath, rule.source);

                const isDir = await fs.statSync(sourcePath).isDirectory();

                if(isDir) {
                    await fs.copySync(sourcePath, path.join(basePath, rule.dest, path.parse(sourcePath).base), { overwrite: true });
                } else {
                    await fs.copyFileSync(sourcePath, path.join(basePath, rule.dest, path.parse(sourcePath).base), { overwrite: true });
                }
            } catch (err) {
                reject(err);
            }
        }

        resolve();
    });
}

function backupDashboard(sourcePath, destPath) {
    return new Promise((resolve, reject) => {
        fs.copy(sourcePath, path.join(destPath, "dashboard-ui-backup"), { overwrite: true }, (err) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

const insertAtIndex = (originalString, insertIndex, string) => originalString.slice(0, insertIndex) + string + originalString.slice(insertIndex);
const replaceAtIndex = (originalString, replaceIndex, string) => "";

main();