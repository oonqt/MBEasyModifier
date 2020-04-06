const fs = require("fs-extra");
const path = require("path");
const config = require("./config.js");

async function main() {
    await backupDashboard(config.DashboardBasePath, config.DashboardBackupPath)
        .catch(err => {
            console.error("Failed to backup dashboard:", err);
            process.exit(1);
        });

    await findAndOverwrite(config.FindAndOverwrite, config.DashboardBasePath)
        .catch(err => {
            console.error("Failed to find and overwrite", err);
            process.exit(1);
        });

    await findAndInsert(config.FindAndInsert, config.DashboardBasePath)
        .catch(err => {
            console.error("Failed to find and insert:", err);
            process.exit(1);
        });

    console.log("Successfully performed modifications without errors");
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

                insertFileContents = insertAtIndex(insertFileContents, insertIndex, rule.insertString);

                await fs.writeFileSync(destFilePath, insertFileContents);
            } catch (err) {
                reject(err);
            }
        }

        resolve();
    });
}

function findAndOverwrite(overwriteRules, basePath) {
    return new Promise(async (resolve, reject) => {
        for (const rule of overwriteRules) {
            try {
                const isDir = await fs.statSync(rule.source).isDirectory();

                if(isDir) {
                    await fs.copySync(rule.source, path.join(basePath, rule.dest, path.parse(rule.source).base), { overwrite: true });
                } else {
                    await fs.copyFileSync(rule.source, path.join(basePath, rule.dest, path.parse(rule.source).base), { overwrite: true });
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