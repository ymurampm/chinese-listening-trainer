@echo off
cd /d "C:\Antigravity\Projects\ListeningTraining"

powershell -NoProfile -Command "$ok = $false; try { $r = [System.Net.WebRequest]::Create('http://localhost:8080/').GetResponse(); if ($r.StatusCode -eq 200) { $ok = $true }; $r.Close() } catch {}; if (-not $ok) { Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }; Start-Process -FilePath 'python' -ArgumentList '-m http.server 8080' -WorkingDirectory 'C:\Antigravity\Projects\ListeningTraining' -WindowStyle Hidden; Start-Sleep -Seconds 1 }"

start http://localhost:8080/
exit
