# monde

A Node script that synchronizes file & directory changes from a source to destination file & directory in real-time. It is designed to mirror file creation, modification, and deletion events between directories, making it an ideal tool for developers who work in local environments and need to duplicate changes to another location, such as an external storage device or a network share.

### Clone

```bash
git clone https://github.com/ebin1da/monde.git && cd monde
```

### Install

Ensure you have **node** & **npm** installed.

```bash
npm i
```

### Usage

Modify the `srcDir` and `destDir` variables at the top of `index.js` to suit your needs for the source and destination paths.

```bash
npm start
```

### Notes

Currently ignores the `node_modules` directory to avoid unnecessary copying of dependency files.

### Optional

**Setup as a system service by running**

```bash
bash setup.sh
```

1. Install `pkg`, if not allready installed.
2. Install dependencies.
3. Build the **monde** binary.
4. Copy the **monde** binary to `/usr/bin`
5. Create a system service file `/etc/systemd/system/monde.service`
6. Enable new system service.
7. Reload the systemctl daemon.
8. Start `monde.service`.
9. Display the status for `monde.service`.

### Author

**debinum**

### License

**MIT**
