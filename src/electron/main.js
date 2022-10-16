const { app, BrowserWindow } = require('electron');

const { join } = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 450,
        height: 450,
    })

    win.loadFile(join(__dirname, '../pages/index.html'))

    win.webContents.openDevTools();

}

app.whenReady().then(() => {
    createWindow()

    app.on('active', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})