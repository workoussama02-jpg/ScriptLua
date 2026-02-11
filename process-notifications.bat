@echo off
REM Batch file to run the notification queue processor
REM Set your SUPABASE_SERVICE_ROLE_KEY environment variable here or in system environment variables

if "%SUPABASE_SERVICE_ROLE_KEY%"=="" (
    echo ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable not set
    echo Please set it in your system environment variables or edit this batch file
    pause
    exit /b 1
)

powershell.exe -ExecutionPolicy Bypass -File "%~dp0process-notifications.ps1"

if %ERRORLEVEL% EQU 0 (
    echo Notification processing completed successfully
) else (
    echo Notification processing failed with error code %ERRORLEVEL%
)