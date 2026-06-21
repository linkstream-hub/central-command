$key = (Get-Content 'C:\Users\Aldrick\.claude.json' | ConvertFrom-Json).mcpServers.n8n.env.'N8N_API_KEY'
$url = (Get-Content 'C:\Users\Aldrick\.claude.json' | ConvertFrom-Json).mcpServers.n8n.env.'N8N_API_URL'
$h = @{'X-N8N-API-KEY' = $key; 'Content-Type' = 'application/json'}

# Outbox Poller — queries workflow_events WHERE status='pending', redelivers to event-bus webhook
# DO NOT ACTIVATE until Task 2 (drizzle migration) creates workflow_events table
$body = @'
{
  "name": "CC Event Bus Outbox Poller",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{ "field": "minutes", "minutesInterval": 5 }]
        }
      },
      "id": "ob100001-0000-0000-0000-000000000001",
      "name": "Schedule: Every 5 Min",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [0, 200]
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "SELECT id, type, payload, attempts FROM workflow_events WHERE status = 'pending' AND attempts < 3 ORDER BY occurred_at ASC LIMIT 50",
        "additionalFields": {}
      },
      "id": "ob100002-0000-0000-0000-000000000002",
      "name": "Neon: Query Pending",
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2,
      "position": [240, 200],
      "credentials": {
        "postgres": {
          "id": "CAHXuGzNrYsMeENI",
          "name": "Neon Postgres"
        }
      }
    },
    {
      "parameters": {
        "batchSize": 1,
        "options": {}
      },
      "id": "ob100003-0000-0000-0000-000000000003",
      "name": "Loop: Each Event",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [480, 200]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://n8n-production-4f36b.up.railway.app/webhook/event-bus",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            { "name": "Content-Type", "value": "application/json" }
          ]
        },
        "sendBody": true,
        "specifyBody": "string",
        "body": "={{ JSON.stringify({ id: $json.id, type: $json.type, occurredAt: new Date().toISOString(), payload: typeof $json.payload === 'string' ? JSON.parse($json.payload) : $json.payload }) }}",
        "options": {
          "timeout": 10000
        }
      },
      "id": "ob100004-0000-0000-0000-000000000004",
      "name": "HTTP: Redeliver Event",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [720, 200]
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "UPDATE workflow_events SET status = 'delivered', delivered_at = NOW(), attempts = attempts + 1, last_attempted_at = NOW() WHERE id = '{{ $('Loop: Each Event').item.json.id }}'",
        "additionalFields": {}
      },
      "id": "ob100005-0000-0000-0000-000000000005",
      "name": "Neon: Mark Delivered",
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2,
      "position": [960, 100],
      "credentials": {
        "postgres": {
          "id": "CAHXuGzNrYsMeENI",
          "name": "Neon Postgres"
        }
      }
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "UPDATE workflow_events SET attempts = attempts + 1, last_attempted_at = NOW(), error = '{{ $json.message.replace(/'/g, \"''\") }}', status = CASE WHEN attempts + 1 >= 3 THEN 'failed' ELSE 'pending' END WHERE id = '{{ $('Loop: Each Event').item.json.id }}'",
        "additionalFields": {}
      },
      "id": "ob100006-0000-0000-0000-000000000006",
      "name": "Neon: Mark Failed",
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2,
      "position": [960, 320],
      "credentials": {
        "postgres": {
          "id": "CAHXuGzNrYsMeENI",
          "name": "Neon Postgres"
        }
      }
    },
    {
      "parameters": {
        "resumeUrl": "={{ $execution.resumeUrl }}"
      },
      "id": "ob100007-0000-0000-0000-000000000007",
      "name": "Loop: Back",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [1200, 200]
    }
  ],
  "connections": {
    "Schedule: Every 5 Min": {
      "main": [
        [{ "node": "Neon: Query Pending", "type": "main", "index": 0 }]
      ]
    },
    "Neon: Query Pending": {
      "main": [
        [{ "node": "Loop: Each Event", "type": "main", "index": 0 }]
      ]
    },
    "Loop: Each Event": {
      "main": [
        [{ "node": "HTTP: Redeliver Event", "type": "main", "index": 0 }],
        []
      ]
    },
    "HTTP: Redeliver Event": {
      "main": [
        [{ "node": "Neon: Mark Delivered", "type": "main", "index": 0 }]
      ]
    },
    "Neon: Mark Delivered": {
      "main": [
        [{ "node": "Loop: Back", "type": "main", "index": 0 }]
      ]
    },
    "Neon: Mark Failed": {
      "main": [
        [{ "node": "Loop: Back", "type": "main", "index": 0 }]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  }
}
'@

$result = Invoke-RestMethod -Uri "$url/api/v1/workflows" -Method POST -Headers $h -Body $body
Write-Host "Created outbox poller ID:" $result.id
Write-Host "Status: INACTIVE (activate after Task 2 drizzle migration)"
Write-Host ""
Write-Host "Exporting JSON..."
$wf = Invoke-RestMethod -Uri "$url/api/v1/workflows/$($result.id)" -Headers (@{'X-N8N-API-KEY' = $key})
$wf | ConvertTo-Json -Depth 20 | Out-File -FilePath 'C:\PTOW\1_APT_Central_Command\tools\n8n\workflows\cc-event-bus-outbox-poller.json' -Encoding UTF8
Write-Host "Exported cc-event-bus-outbox-poller.json"
Write-Host ""
Write-Host "Outbox poller workflow ID: $($result.id)"
