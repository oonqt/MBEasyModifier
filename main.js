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

    await backupDashboard(profile.DashboardBasePath, config.DashboardBackupPath)
        .catch(err => {
            console.error("Failed to backup dashboard:", err);
            process.exit(1);
        });

    await findAndOverwrite(profile.FindAndOverwrite, profile.DashboardBasePath, config.ModificationSourcePath)
        .catch(err => {
            console.error("Failed to find and overwrite", err);
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
        interface.question(`Enter a profile name to apply patch: ${profiles.map(profile => profile.Name).join(", ")} \n\n`, answer => {
            const profile = profiles.filter(profile => profile.Name === answer).shift();

            if(!profile) reject(`No profile with the name ${answer} exists`);

            resolve(profile.Profile);

            interface.close();
        });
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

                if(insertIndex === -1) reject(`Insert string not found in source file g(${rule.destFilePath})`);

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

main();