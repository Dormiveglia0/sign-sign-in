@echo off
setlocal
set "ROOT=%~dp0.."
set "PYTHON=%ROOT%\.venv\Scripts\python.exe"
set "REQUIREMENTS=%ROOT%\requirements-companion.txt"

if not exist "%PYTHON%" (
  echo [SignSignIn] Creating the Windows companion environment...
  py -3.12 -m venv "%ROOT%\.venv" || exit /b 1
)

"%PYTHON%" -c "import mitmproxy, psutil" >nul 2>nul
if errorlevel 1 (
  echo [SignSignIn] Installing the Windows companion dependencies...
  "%PYTHON%" -m ensurepip --upgrade >nul || exit /b 1
  "%PYTHON%" -m pip install --disable-pip-version-check -r "%REQUIREMENTS%" || exit /b 1
)

"%PYTHON%" "%~dp0credential_companion.py" %*
exit /b %errorlevel%
