import os
import win32com.client

desktop = os.path.expanduser('~/Desktop')
shortcut_name = "中国語会話学習トレーナー.lnk"
shortcut_path = os.path.join(desktop, shortcut_name)

target_path = r"c:\Antigravity\Projects\ListeningTraining\start_app.bat"
work_dir = r"c:\Antigravity\Projects\ListeningTraining"

# Remove any old garbled shortcut if present
for f in os.listdir(desktop):
    if f.endswith('.lnk') and ('トレーナー' in f or '中国語' in f or '' in f):
        try:
            os.remove(os.path.join(desktop, f))
            print(f"Removed old shortcut: {f}")
        except Exception as e:
            pass

shell = win32com.client.Dispatch('WScript.Shell')
shortcut = shell.CreateShortcut(shortcut_path)
shortcut.TargetPath = target_path
shortcut.WorkingDirectory = work_dir
shortcut.Description = "中国語会話宿題リスニングマスター (HSK 2-3)"

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

if os.path.exists(edge_exe):
    shortcut.IconLocation = edge_exe + ",0"
elif os.path.exists(chrome_exe):
    shortcut.IconLocation = chrome_exe + ",0"
else:
    shortcut.IconLocation = "shell32.dll,14"

shortcut.Save()
print(f"Successfully created clean Japanese shortcut: {shortcut_path}")
