const fs = require("fs-extra");
const path = require("path");
const config = require("./config.js");

async function main() {
    await backupDashboard(config.DashboardBasePath, config.DashboardBackupPath)
        .catch(err => {
            console.error("Failed to backup dashboard, exiting...", err);
            process.exit(1);
        });

    await findAndOverwrite(config.FindAndOverwrite, config.DashboardBasePath)
        .catch(err => {
            console.error("Failed to execute find & overwrite, exiting...", err);
            process.exit(1);
        });
}

function findAndOverwrite(overwriteRules, basePath) {
    return new Promise(async (resolve, reject) => {
        for(const rule of overwriteRules) {
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

main();