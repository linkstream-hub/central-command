$key = (Get-Content 'C:\Users\Aldrick\.claude.json' | ConvertFrom-Json).mcpServers.n8n.env.'N8N_API_KEY'
$url = (Get-Content 'C:\Users\Aldrick\.claude.json' | ConvertFrom-Json).mcpServers.n8n.env.'N8N_API_URL'
$h = @{'X-N8N-API-KEY' = $key; 'Content-Type' = 'application/json'}

# Minimal stub: Webhook → Code (log type) → Respond 200
# Switch routing to consumers is Phase 18 Task 5 follow-on
$body = @'
{
  "name": "CC Event Bus Router",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "event-bus",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "eb100001-0000-0000-0000-000000000001",
      "name": "Webhook: Event Bus",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [0, 200],
      "webhookId": "cc-event-bus-router-v2"
    },
    {
      "parameters": {
        "jsCode": "// Log incoming event type for observability\nconst event = $input.first().json;\nconsole.log('[EventBus] Received:', event.type, 'id:', event.id);\n// Pass through\nreturn $input.all();"
      },
      "id": "eb100002-0000-0000-0000-000000000002",
      "name": "Code: Log Event",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [240, 200]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ JSON.stringify({ status: 'received', eventId: $json.id, type: $json.type }) }}",
        "options": {
          "responseCode": 200
        }
      },
      "id": "eb100003-0000-0000-0000-000000000003",
      "name": "Respond: 200 OK",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [480, 200]
    }
  ],
  "connections": {
    "Webhook: Event Bus": {
      "main": [
        [{ "node": "Code: Log Event", "type": "main", "index": 0 }]
      ]
    },
    "Code: Log Event": {
      "main": [
        [{ "node": "Respond: 200 OK", "type": "main", "index": 0 }]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  }
}
'@

$result = Invoke-RestMethod -Uri "$url/api/v1/workflows" -Method POST -Headers $h -Body $body
Write-Host "Created workflow ID:" $result.id
Write-Host ""

# Activate
$activate = Invoke-RestMethod -Uri "$url/api/v1/workflows/$($result.id)/activate" -Method POST -Headers $h
Write-Host "Active:" $activate.active
Write-Host ""
Write-Host "============================="
Write-Host "N8N_EVENT_BUS_URL = $url/webhook/event-bus"
Write-Host "============================="
