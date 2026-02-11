# Manual test script for notification queue processing
# Run this to test the escalation system

param(
    [Parameter(Mandatory=$true)]
    [string]$FunctionKey
)

$functionUrl = "https://ndniosrqgrzcsqnfabxr.supabase.co/functions/v1/process-notification-queue"

try {
    $headers = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $FunctionKey"
    }

    Write-Host "Calling notification queue processor..."
    $response = Invoke-RestMethod -Uri $functionUrl -Method POST -Headers $headers

    if ($response.success) {
        Write-Host "SUCCESS: Processed $($response.processed) notifications"
        if ($response.results) {
            Write-Host "Results:"
            $response.results | ForEach-Object {
                Write-Host "  Ticket $($_.ticket_id): $($_.status)"
                if ($_.error) {
                    Write-Host "    Error: $($_.error)"
                }
            }
        }
    } else {
        Write-Host "ERROR: $($response.error)"
    }
} catch {
    Write-Host "ERROR: Failed to call notification queue function - $($_.Exception.Message)"
}