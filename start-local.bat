@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  echo UNIMUGO CodeLab berjalan di http://localhost:8000
  echo Tekan Ctrl+C untuk menghentikan server.
  py -m http.server 8000
  exit /b
)
where python >nul 2>nul
if %errorlevel%==0 (
  echo UNIMUGO CodeLab berjalan di http://localhost:8000
  echo Tekan Ctrl+C untuk menghentikan server.
  python -m http.server 8000
  exit /b
)
echo Python tidak ditemukan. Instal Python atau jalankan: py -m http.server 8000
pause
