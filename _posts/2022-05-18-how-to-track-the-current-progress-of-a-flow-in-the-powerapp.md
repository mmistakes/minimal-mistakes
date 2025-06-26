---
title: "How to Track the Current Progress of a Flow in PowerApps"
date: 2022-05-18
permalink: "/article/powerplatform/2022/05/18/how-to-track-the-current-progress-of-a-flow-in-the-powerapp/"
updated: 2025-06-26
categories:
  - Article
  - PowerPlatform
excerpt: "Learn how to track Power Automate flow progress in real-time within your PowerApps using a StateLog table and timer controls. Complete solution with downloadable example."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
  teaser: https://lehmann.ws/wp-content/uploads/2022/05/overview-1.gif
toc: true
toc_sticky: true
tags:
  - PowerApps
  - PowerAutomate
  - Flow Progress
  - StateLog
  - Timer Control
  - SharePoint
  - GUID
  - PowerPlatform
---

![Flow Progress Overview](https://lehmann.ws/wp-content/uploads/2022/05/overview-1.gif){: .align-center}

In some scenarios, you or your users would like to see how far a Cloud Flow process (Power Automate) has progressed after starting it via PowerApps.

Unfortunately, it's not possible to use "Respond to PowerApps" multiple times to show status updates in the PowerApp during flow execution.

## ðŸ’¡ The Solution: StateLog Table with Timer

For this challenge, we can easily create a StateLog table and check it regularly via a timer control. The key is to send updates to the StateLog entry after reaching important milestones in the flow.

[**Download the complete solution here**](https://lehmannws.sharepoint.com/:u:/s/lehmann.ws/EZPqZIeuWXNBmNMDKrVf7cAB515lmUp4PTtzG8dfWmoZpw?e=8gJXFt) - ready to use at your location.

## ðŸ› ï¸ What You Need for Implementation

- **Flow Trigger** â†’ Button in your app
- **Timer Control** â†’ To refresh the data periodically  
- **Status Display** â†’ Text labels and icons
- **StateLog Table** â†’ SharePoint list for state tracking

## ðŸ“Š Setting Up the StateLog Data Source

![SharePoint List Overview](https://lehmann.ws/wp-content/uploads/2022/05/overview-sp-list-1.png){: .align-center}

**Build a data source with three columns:**

1. **Title** (default column) - for status descriptions
2. **GUID** (text column) - for filtering by unique flow instance
3. **StateCode** (number column) - for programmatic status handling

## âš¡ Configuring the Power Automate Flow

![Cloud Flow Overview](https://lehmann.ws/wp-content/uploads/2022/05/overview-cloudflow.png){: .align-center}

**Create a flow with this structure:**

1. **PowerApps trigger** - receives GUID from the app
2. **Create Item** - immediately creates StateLog entry with:
   - GUID (from PowerApps)
   - Initial status (StateCode 0)
   - Title: "Flow started"
3. **Scope blocks** - your actual business logic
4. **Update Item** - after each milestone, update the status

The scopes named "Flow Actions" are symbolic - use any actions you need. After important milestones, simply update the status (or create additional entries for detailed logging).

## ðŸ“± PowerApps Implementation

![PowerApps Overview](https://lehmann.ws/wp-content/uploads/2022/05/overview.png){: .align-center}

### 1. Flow Trigger Button

On the button's **OnSelect** property:

```powerapps
// Generate GUID for tracking
Set(varStateGUID, GUID());

// Start Flow with GUID
wfState.Run(varStateGUID)
```

### 2. Timer Control Configuration

**Timer Settings:**
- **Duration**: 3000 (3 seconds)
- **AutoStart**: `!IsBlank(varStateGUID)`
- **Repeat**: `locCurrentState.StateCode <> 3`

**OnTimerEnd**:
```powerapps
Refresh(StateLog);
UpdateContext({
    locCurrentState: LookUp(
        StateLog,
        GUID = Text(varStateGUID)
    )
})
```

### 3. Status Display

Show the current status using:
```powerapps
locCurrentState.Title
```

You can also display different icons based on StateCode:
```powerapps
Switch(
    locCurrentState.StateCode,
    0, "â³ Starting...",
    1, "ðŸ”„ Processing...", 
    2, "âš™ï¸ Finalizing...",
    3, "âœ… Complete!"
)
```

## ðŸ’¾ Complete Flow Code

Here's the complete flow definition you can import:

```json
{
  "id":"5d6770c8-725f-42a0-86a9-a13cc239d868",
  "brandColor":"#8C3900",
  "connectionReferences":
  {
    "shared_sharepointonline":
    {
      "connection":
      {
        "id":"/providers/Microsoft.PowerApps/apis/shared_sharepointonline/connections/shared-sharepointonl-2e2e173e-f314-4d56-afe3-20f134d359a6"
      }
    }
  },
  "connectorDisplayName":"Control",
  "icon":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxwYXRoIGQ9Im0wIDBoMzJ2MzJoLTMyeiIgZmlsbD0iIzhDMzkwMCIvPg0KIDxwYXRoIGQ9Im04IDEwaDE2djEyaC0xNnptMTUgMTF2LTEwaC0xNHYxMHptLTItOHY2aC0xMHYtNnptLTEgNXYtNGgtOHY0eiIgZmlsbD0iI2ZmZiIvPg0KPC9zdmc+DQo=",
  "isTrigger":false,
  "operationName":"LogState",
  "operationDefinition":
  {
    "type":"Scope",
    "actions":
    {
      "Create_item_-_Flow_started":
      {
        "type":"OpenApiConnection",
        "inputs":
        {
          "host":
          {
            "connectionName":"shared_sharepointonline",
            "operationId":"PostItem",
            "apiId":"/providers/Microsoft.PowerApps/apis/shared_sharepointonline"
          },
          "parameters":
          {
            "dataset":"https://lehmannws.sharepoint.com/sites/lehmann.ws",
            "table":"5fe8a63f-d26b-419e-a693-6687f7275ebf",
            "item/Title":"Flow started",
            "item/GUID0":"@triggerBody()['text']",
            "item/StateCode":0
          },
          "authentication":"@parameters('$authentication')"
        },
        "runAfter":{},
        "metadata":
        {
          "operationMetadataId":"158862e4-3942-4c31-bcfb-023af6fa6179"
        }
      }
      // Additional flow actions...
    }
  }
}
```

## ðŸŽ¯ Key Takeaways

- **Real-time tracking**: Monitor flow progress without blocking the UI
- **GUID-based**: Each flow instance is uniquely trackable
- **Flexible updates**: Update status at any milestone in your flow
- **User feedback**: Provide clear progress indication to users
- **Scalable**: Works with any complexity of flow logic

## ðŸ’¡ Alternative Approaches

Instead of updating the same StateLog entry, you could:
- **Create new entries** for each milestone (provides detailed history)
- **Use different StateCode values** for more granular status tracking
- **Add timestamps** to track duration of each phase
- **Include error handling** with specific error state codes

## ðŸ”„ Enhanced Timer Logic

For better performance, you might want to:
- **Increase timer duration** for longer flows (reduce SharePoint calls)
- **Stop timer automatically** when flow completes
- **Add retry logic** for failed flow instances
- **Cache results** to reduce unnecessary data calls

This solution provides a robust way to track Power Automate flow progress in real-time, giving your users visibility into long-running processes and improving the overall user experience.

*This article was originally published on Marcel Lehmann's blog and has been migrated to PowerPlatformTip for better accessibility and searchability.*


