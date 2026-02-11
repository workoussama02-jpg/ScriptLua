# Simple test script for notification processing
$functionUrl = "https://ndniosrqgrzcsqnfabxr.supabase.co/functions/v1/process-notification-queue"
$functionKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmlvc3JxZ3J6Y3NxbmZhYnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2MTI1MCwiZXhwIjoyMDg1MTM3MjUwfQ.SKFzzoO_i92ug99o8CuP1AlyrxJsjWhs1gqVQvzNhXs"

Write-Host "Testing notification processing..."
Write-Host "URL: $functionUrl"
Write-Host "Key length: $($functionKey.Length)"

try {
    $headers = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $functionKey"
    }

    Write-Host "Making request..."
    $response = Invoke-WebRequest -Uri $functionUrl -Method POST -Headers $headers -TimeoutSec 30

    Write-Host "SUCCESS! Status: $($response.StatusCode)"
    Write-Host "Response: $($response.Content)"
} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Response Status: $($_.Exception.Response.StatusCode)"
        Write-Host "Response Content: $($_.Exception.Response.Content)"
    }
}