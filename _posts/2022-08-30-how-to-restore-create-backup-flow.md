---
title: "How to Restore and Create a Backup from a Flow"
date: 2022-08-30
permalink: "/article/powerplatform/2022/08/30/how-to-restore-create-backup-flow/"
updated: 2025-06-26
categories:
  - Article
  - PowerPlatform
excerpt: "Safeguarding your workflows with Power Automate: Learn comprehensive methods to create and restore backups for your flows using solutions and direct flow management approaches."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
  teaser: https://lehmann.ws/wp-content/uploads/2022/08/pexels-photo-6429164.jpeg
toc: true
toc_sticky: true
tags:
  - PowerAutomate
  - Backup
  - Restore
  - Solutions
  - Flow Management
  - Dataverse
  - OneDrive
  - PowerPlatform
---

![Hard Disk Drive - Backup Concept](https://lehmann.ws/wp-content/uploads/2022/08/pexels-photo-6429164.jpeg){: .align-center}
*Photo by Sergei Starostin on [Pexels.com](https://www.pexels.com/photo/black-and-white-hard-disk-drive-6429164/)*

The most frequently asked question I receive is **"How to restore (and create) a backup from a flow to restore earlier versions?"**

Unfortunately, there is no simple standard solution, but I will show you some possibilities to avoid this problem in the future. My inspiration for this solution was [Audrie Gordon](https://www.youtube.com/watch?v=2wQSvOfIoBI) and [Pieter Veenstra](https://sharepains.com/2021/06/29/export-and-import-solutions-power-automate/).

## ðŸŽ¯ Three Comprehensive Backup Strategies

### 1. Third-Party Solution by John Liu

The first and easiest solution is the one I presented in [this blog post](https://lehmann.ws/2020/12/30/how-do-i-restore-an-earlier-version-of-my-flow-power-automate-from-john-liu/). It is not free, but it does exactly what we want it to do.

### 2. Backup and Restore Using Solutions and Power Automate

For this approach, we create a 'backup' solution where we add the specific flow (we could also backup multiple flows simultaneously). 

**Important:** The Dataverse actions are **NOT premium**, and you can use them with standard licensing.

**Key Concept:** It's possible to have one flow in multiple solutions. This is what we use here. Significantly, it's only one flow that is linked multiple times - if we change or restore it, it changes in all locations.

In this solution, the flow is saved with the solution as a ZIP file on OneDrive for Business, but any storage location is possible.

#### ðŸ”„ Backup Process

![Export Solution](https://lehmann.ws/wp-content/uploads/2022/08/exportsolution.png){: .align-center}

**Steps:**
1. Build your flow as shown above
2. **SolutionName** = Name column in the solution (no spaces)
3. **File Content** = `base64ToBinary(outputs('Perform_an_unbound_action')?['body/ExportSolutionFile'])`

#### ðŸ”„ Restore Process

![Import Solution](https://lehmann.ws/wp-content/uploads/2022/08/importsolution.png){: .align-center}

**Steps:**
1. Choose file from your data storage (here OneDrive for Business)
2. Take the file content `$content` to the CustomizationFile

### 3. Backup and Restore Using Power Automate Only

Even if this solution looks most complicated at first sight, I prefer this variant. Here we can either use a child flow or copy this directly into our flow.

**Best Practice:** Use this only in the development/customization phase so that a backup is created at the end of a successful flow run. This way we always have a backup of the last successful flow.

In this solution, the flow is saved as a JSON file on OneDrive for Business, but any storage location is possible.

#### ðŸ“¤ Backup Implementation

![Export Flow](https://lehmann.ws/wp-content/uploads/2022/08/exportflow.png){: .align-center}

#### ðŸ“¥ Restore Implementation

![Import Flow](https://lehmann.ws/wp-content/uploads/2022/08/importflow.png){: .align-center}

## ðŸ› ï¸ Ready-to-Use Flow Templates

### Method 2: Solution-Based Backup Templates

#### Backup Solution Template
```json
{
  "id":"d6ad0518-4a44-45dd-8c0e-08125d42e8d5",
  "brandColor":"#8C3900",
  "connectionReferences":{
    "shared_commondataserviceforapps":{
      "connection":{"id":"/crce7_sharedcommondataserviceforapps_6ab0c"}
    },
    "shared_onedriveforbusiness":{
      "connection":{"id":"/new_sharedonedriveforbusiness_58eca"}
    }
  },
  "connectorDisplayName":"Control",
  "operationName":"Restore_Solution_from_Backup",
  "operationDefinition":{
    "type":"Scope",
    "actions":{
      "Restore_Solution":{
        "type":"Scope",
        "actions":{
          "Create_file":{
            "type":"OpenApiConnection",
            "inputs":{
              "host":{
                "connectionName":"shared_onedriveforbusiness",
                "operationId":"CreateFile"
              },
              "parameters":{
                "folderPath":"/Backup PowerAutomate",
                "name":"@{outputs('Internal_Name_Solution')}_@{utcNow()}.zip",
                "body":"@base64ToBinary(outputs('Perform_an_unbound_action')?['body/ExportSolutionFile'])"
              }
            }
          }
        }
      }
    }
  }
}
```

#### Restore Solution Template
```json
{
  "id":"964018a8-e7ef-492a-bfa9-2e7cce95b021",
  "operationName":"Restore_Solution_from_Backup",
  "operationDefinition":{
    "type":"Scope",
    "actions":{
      "Variable":{
        "type":"Scope",
        "actions":{
          "Get_file_content":{
            "type":"OpenApiConnection",
            "inputs":{
              "host":{
                "connectionName":"shared_onedriveforbusiness",
                "operationId":"GetFileContent"
              },
              "parameters":{
                "id":"[FILE_ID]",
                "inferContentType":true
              }
            }
          }
        }
      },
      "Restore_Solution":{
        "type":"Scope",
        "actions":{
          "Perform_an_unbound_action_2":{
            "type":"OpenApiConnection",
            "inputs":{
              "host":{
                "connectionName":"shared_commondataserviceforapps",
                "operationId":"PerformUnboundAction"
              },
              "parameters":{
                "actionName":"ImportSolution",
                "item/CustomizationFile":"@body('Get_file_content')?['$content']",
                "item/ImportJobId":"@guid()"
              }
            }
          }
        }
      }
    }
  }
}
```

### Method 3: Direct Flow Backup Templates

#### Flow Backup Template
```json
{
  "id":"2bd5f6d6-9716-41a7-be39-2997816c8d16",
  "operationName":"Export_Flow_to_OneDrive",
  "operationDefinition":{
    "type":"Scope",
    "actions":{
      "Variable":{
        "type":"Compose",
        "inputs":{
          "FlowID":"@{triggerBody()['text']}",
          "EnvironmentID":"@{triggerBody()['text_1']}"
        }
      },
      "Export_Flow":{
        "type":"Scope",
        "actions":{
          "Create_file":{
            "type":"OpenApiConnection",
            "inputs":{
              "host":{
                "connectionName":"shared_onedriveforbusiness_1",
                "operationId":"CreateFile"
              },
              "parameters":{
                "folderPath":"/Backup PowerAutomate",
                "name":"@{outputs('Get_Flow')?['body/properties/displayName']}_@{utcNow()}.json",
                "body":"@outputs('Get_Flow')?['body/properties/definition']"
              }
            }
          },
          "Get_Flow":{
            "type":"OpenApiConnection",
            "inputs":{
              "host":{
                "connectionName":"shared_flowmanagement_1",
                "operationId":"GetFlow"
              },
              "parameters":{
                "environmentName":"@outputs('Variable')?['EnvironmentID']",
                "flowName":"@outputs('Variable')?['FlowID']"
              }
            }
          }
        }
      }
    }
  }
}
```

#### Flow Restore Template
```json
{
  "id":"e79a25a8-388d-4000-9393-75002528e62a",
  "operationName":"Restore_a_Flow",
  "operationDefinition":{
    "type":"Scope",
    "actions":{
      "Initial":{
        "type":"Scope",
        "actions":{
          "Variable":{
            "type":"Compose",
            "inputs":{
              "EnvironmentID":"@{triggerBody()['text']}",
              "UpdateFlowID":"@{triggerBody()['text_1']}",
              "UpdateFlowName":"@{triggerBody()['text_2']}"
            }
          },
          "Get_file_content":{
            "type":"OpenApiConnection",
            "inputs":{
              "host":{
                "connectionName":"shared_onedriveforbusiness",
                "operationId":"GetFileContentByPath"
              },
              "parameters":{
                "path":"@triggerBody()['text_3']",
                "inferContentType":true
              }
            }
          }
        }
      },
      "Restore":{
        "type":"Scope",
        "actions":{
          "Update_Flow_2":{
            "type":"OpenApiConnection",
            "inputs":{
              "host":{
                "connectionName":"shared_flowmanagement",
                "operationId":"UpdateFlow"
              },
              "parameters":{
                "environmentName":"@outputs('Variable')?['EnvironmentID']",
                "flowName":"@outputs('Variable')?['UpdateFlowID']",
                "Flow/properties/displayName":"@outputs('Variable')?['UpdateFlowName']",
                "Flow/properties/definition":"@json(base64ToString(base64(outputs('Get_file_content')?['body'])))",
                "Flow/properties/state":"Started"
              }
            }
          }
        }
      }
    }
  }
}
```

## ðŸŽ¯ Implementation Strategies

### Development Phase Best Practices

1. **Automated Backups**: Implement backup triggers at the end of successful flow runs
2. **Version Control**: Use naming conventions with timestamps
3. **Testing Environment**: Always test restore procedures in development
4. **Documentation**: Keep track of which backups correspond to which versions

### Production Considerations

1. **Scheduled Backups**: Set up regular backup schedules
2. **Multiple Storage Locations**: Consider redundant backup storage
3. **Access Control**: Secure backup files appropriately
4. **Retention Policies**: Implement backup retention strategies

## ðŸ”§ Technical Requirements

### Method 2 (Solutions) Requirements:
- **Dataverse connection** (included in standard licensing)
- **OneDrive for Business** or alternative storage
- **Solution management** permissions
- **Flow creation** rights

### Method 3 (Direct Flow) Requirements:
- **Flow Management connector**
- **Storage location** (OneDrive, SharePoint, etc.)
- **Environment and Flow IDs**
- **Flow modification** permissions

## ðŸ’¡ Advanced Tips

### Error Handling
- Implement robust error handling in backup flows
- Include retry logic for failed backup attempts
- Add notifications for backup success/failure

### Performance Optimization
- Use chunked transfer for large flow definitions
- Consider compression for storage efficiency
- Implement selective backup (only changed flows)

### Security Considerations
- Encrypt sensitive backup files
- Use service accounts for automated backups
- Implement proper access controls on backup storage

## ðŸŽ¯ Key Takeaways

- **No native backup**: Power Automate lacks built-in version control
- **Multiple approaches**: Choose based on your specific needs and constraints
- **Solutions method**: Best for environment-level backup and restore
- **Direct flow method**: Most flexible for individual flow management
- **Development integration**: Build backup into your development workflow
- **Testing crucial**: Always test restore procedures before you need them

## ðŸ”„ Future Considerations

Microsoft continues to enhance Power Automate capabilities. Keep an eye on:
- **Native versioning** features
- **Enhanced solution** management
- **Automated backup** services
- **Integration improvements** with DevOps pipelines

This comprehensive backup strategy ensures your critical Power Automate flows are protected and recoverable, providing peace of mind and business continuity.

*This article was originally published on Marcel Lehmann's blog and has been migrated to PowerPlatformTip for better accessibility and searchability.*


