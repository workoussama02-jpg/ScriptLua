# PowerShell script to call the process-notification-queue function
# This script should be run every 5 minutes via Windows Task Scheduler

# Load environment variables from .env file
$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

$functionUrl = "https://ndniosrqgrzcsqnfabxr.supabase.co/functions/v1/process-notification-queue"
$functionKey = $env:SUPABASE_SERVICE_ROLE_KEY

if (-not $functionKey) {
    Write-Host "ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable not set"
    exit 1
}

try {
    $headers = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $functionKey"
    }

    $response = Invoke-RestMethod -Uri $functionUrl -Method POST -Headers $headers

    if ($response.success) {
        Write-Host "SUCCESS: Processed $($response.processed) notifications"
    } else {
        Write-Host "ERROR: $($response.error)"
        exit 1
    }
} catch {
    Write-Host "ERROR: Failed to call notification queue function - $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
    exit 1
}