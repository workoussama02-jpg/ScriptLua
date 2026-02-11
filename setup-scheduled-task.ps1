# PowerShell script to create the scheduled task for notification processing

$taskName = "ProcessNotificationQueue"
$scriptPath = "C:\Users\Oussama\Desktop\ScriptLua jules\process-notifications.bat"

# Check if task already exists and remove it
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "Removed existing task: $taskName"
}

# Create the scheduled task action
$action = New-ScheduledTaskAction -Execute $scriptPath

# Create the trigger (every 5 minutes)
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration (New-TimeSpan -Days 365)

# Create task settings
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Register the task
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest -Force

Write-Host "Created scheduled task: $taskName"
Write-Host "Task will run every 5 minutes to process notification queue"