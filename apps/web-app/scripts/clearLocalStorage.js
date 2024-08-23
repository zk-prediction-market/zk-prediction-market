const { exec } = require("child_process")
const os = require("os")

function clearLocalStorage() {
    const platform = os.platform()
    let command

    switch (platform) {
        case "darwin": // macOS
            command =
                'osascript -e \'tell application "Google Chrome" to tell every tab of every window to execute javascript "localStorage.clear()"\''
            break
        case "win32": // Windows
            command =
                "powershell -command \"& {Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('^{F5}')}\""
            break
        case "linux":
            command = "xdotool key ctrl+F5"
            break
        default:
            console.log("Unsupported platform. Please clear localStorage manually.")
            return
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
        console.log("Command executed to clear localStorage. You may need to refresh your browser.")
    })
}

clearLocalStorage()
