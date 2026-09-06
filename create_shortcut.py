import os
import win32com.client

user_dir = r"C:\Users\ymura"
possible_desktops = [
    os.path.join(user_dir, "OneDrive", "Desktop"),
    os.path.join(user_dir, "Desktop"),
    r"C:\Users\Public\Desktop"
]

target_path = r"c:\Antigravity\Projects\ListeningTraining\start_app.bat"
work_dir = r"c:\Antigravity\Projects\ListeningTraining"
shortcut_name = "中国語会話学習トレーナー.lnk"

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

shell = win32com.client.Dispatch('WScript.Shell')

created_count = 0
for d in possible_desktops:
    if os.path.exists(d):
        shortcut_path = os.path.join(d, shortcut_name)
        try:
            shortcut = shell.CreateShortcut(shortcut_path)
            shortcut.TargetPath = target_path
            shortcut.WorkingDirectory = work_dir
            shortcut.Description = "中国語会話宿題リスニングマスター (HSK 2-3)"

            if os.path.exists(edge_exe):
                shortcut.IconLocation = edge_exe + ",0"
            elif os.path.exists(chrome_exe):
                shortcut.IconLocation = chrome_exe + ",0"
            else:
                shortcut.IconLocation = "shell32.dll,14"

            shortcut.Save()
            print(f"Successfully created shortcut at: {shortcut_path}")
            created_count += 1
        except Exception as e:
            print(f"Error creating shortcut at {shortcut_path}: {e}")

print(f"Total shortcuts created: {created_count}")
