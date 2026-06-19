@echo off
SETLOCAL
echo ======================================================
echo   CENTRAL COMMAND - SANDBOX TESTING ENVIRONMENT
echo ======================================================
echo.
echo   This is your TESTING environment.
echo   - Functions EXACTLY like the live version
echo   - Uses isolated local data (NOT your production data)
echo   - Changes persist between page refreshes
echo   - Delete sandbox-data.json to reset all test data
echo.
echo   Open your browser to:  http://localhost:3000
echo   Close this window to stop the server.
echo.
echo ======================================================
echo.

:: Set sandbox mode
set NEXT_PUBLIC_SANDBOX_MODE=true

:: Start dev server
cd /d "a:\PTOW\1_APT_Central_Command\tech-pwa"
npm run dev

ENDLOCAL
pause
