const fs = require("fs-extra");
const { exec } = require("child_process");
const readline = require("readline");
const path = require("path");
const config = require("./config.js");

(async () => {
    const profile = await promptProfileSelection(config.Profiles)
        .catch(err => {
            console.error(err);
            process.exit();
        });

    if(profile.Backup) {
        console.log("Performing backup")
        await backupDashboard(profile.DashboardBasePath, config.DashboardBackupPath)
            .catch(err => {
                console.error("Failed to backup dashboard:", err);
                process.exit(1);
            });
    }

    if(profile.PreModCommand) {
        console.log("Executing pre-mod command");
        await executeModCommand(profile.PreModCommand)
            .catch(err => {
                console.error("Failed to execute pre-mod command", err);
                process.exit(1);
            });
    }

    console.log("Executing find and replace");
    await findAndReplace(profile.FindAndReplace, profile.DashboardBasePath)
        .catch(err => {
            console.error("Failed to find and replace:", err);
            process.exit(1);
        });

    console.log("Executing find and overwrite");
    await findAndOverwrite(profile.FindAndOverwrite, profile.DashboardBasePath, config.ModificationSourcePath)
        .catch(err => {
            console.error("Failed to find and overwrite:", err);
            process.exit(1);
        });

    console.log("Executing find and insert");
    await findAndInsert(profile.FindAndInsert, profile.DashboardBasePath)
        .catch(err => {
            console.error("Failed to find and insert:", err);
            process.exit(1);
        });

    if (profile.PostModCommand) {
        console.log("Executing post-mod command");
        await executeModCommand(profile.PostModCommand)
            .catch(err => {
                console.error("Failed to execute post-mod command", err);
                process.exit(1);
            });
    }

    console.log("Successfully performed modifications without errors");
})();

function executeModCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if(err) reject (err);
            if(stderr) reject(stderr);

            resolve();
        })
    });
}

function promptProfileSelection(profiles) {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    profiles.push({ Name: "Exit Program" });

    return new Promise((resolve, reject) => {
        interface.question(`Select a patch to apply:\n${profiles.map((p, i) => `${i}) ${p.Name}`).join("\n")} \n`, answer => {
            answer = Number(answer);

            if(isNaN(answer)) return reject("Profile index must be a number")
            if(answer > (profiles.length - 1)) return reject(`No profile with the index ${answer} exists`);
            if(answer === (profiles.length - 1)) process.exit(0);

            const profile = profiles[answer];

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
                if(isDirDest) return reject(`Find and replace destination must be a file (${destFilePath})`);

                let replaceFileContents = await fs.readFileSync(destFilePath, "utf8");

                if(replaceFileContents.indexOf(rule.findString) === -1) reject(`Find string (${rule.findString}) not found in source (${destFilePath})`);

                replaceFileContents = replaceFileContents.replace(rule.findString, rule.replaceString);

                await fs.writeFileSync(destFilePath, replaceFileContents);
            } catch (err) {
                reject(err);
            }
        }

        resolve();
    });
}

function findAndInsert(insertRules, basePath) {
    return new Promise(async (resolve, reject) => {
        for (const rule of insertRules) {
            try {
                const destFilePath = path.join(basePath, rule.destFile);

                const isDirDest = await fs.lstatSync(destFilePath).isDirectory();
                if(isDirDest) return reject(`Find and insert destination must be a file (${destFilePath})`);

                let insertFileContents = await fs.readFileSync(destFilePath, "utf8");
                const insertIndex = insertFileContents.indexOf(rule.findString);

                if(insertIndex === -1) return reject(`Find string (${rule.findString}) not found in source file (${destFilePath})`);

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