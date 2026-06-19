@echo off
echo ======================================================
echo   CENTRAL COMMAND - LOCAL TESTING ENVIRONMENT
echo ======================================================
echo.
echo   Open your browser to:  http://localhost:3000
echo.
echo   This connects to your REAL data (Neon + Sheets).
echo   Changes you make here ARE live changes.
echo   Close this window to stop the server.
echo.
echo ======================================================
echo.
cd /d "a:\PTOW\1_APT_Central_Command\tech-pwa"
npm run dev
pause
