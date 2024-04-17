const fs = require("fs");
const chokidar = require("chokidar");
const chalk = require("chalk");

const srcDir = "/home/daryl/Projects";
const destDir = "/media/daryl/Desktop/Projects";

// Function to format the current time
const getCurrentTime = () => {
	return new Date().toLocaleTimeString();
};

// Function to duplicate changes
const duplicateChanges = (path, eventType) => {
	const currentTime = getCurrentTime(); // Get the current time
	const relativePath = path.replace(srcDir, "");
	const destinationPath = destDir + relativePath;

	if (eventType === "unlink") {
		fs.unlinkSync(destinationPath);
		console.log(
			chalk.green(`\n[${currentTime}]`) +
				chalk.red(`\nDeleted: ${destinationPath}`),
		);
	} else {
		const sourceStat = fs.statSync(path);
		if (sourceStat.isFile()) {
			fs.copyFileSync(path, destinationPath);
			console.log(
				chalk.green(`\n[${currentTime}]\n`) +
					chalk.yellow(`Copied: ${path} to ${destinationPath}`),
			);
		} else if (sourceStat.isDirectory()) {
			fs.mkdirSync(destinationPath, { recursive: true });
			console.log(
				chalk.green(`\n[${currentTime}]\n`) +
					chalk.cyan(`Created directory: ${destinationPath}`),
			);
		}
	}
};

// Watch for changes
const watcher = chokidar.watch(srcDir, {
	ignored: /node_modules/, // ignore the node_modules directory
	persistent: true,
});

watcher
	.on("add", (path) => duplicateChanges(path, "add"))
	.on("change", (path) => duplicateChanges(path, "change"))
	.on("unlink", (path) => duplicateChanges(path, "unlink"))
	.on("addDir", (path) => duplicateChanges(path, "addDir"))
	.on("unlinkDir", (path) => duplicateChanges(path, "unlinkDir"))
	.on("error", (error) => console.error(`Watcher error: ${error}`));
