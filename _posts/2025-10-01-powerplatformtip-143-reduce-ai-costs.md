---
title: "#PowerPlatformTip 143 - Reduce AI Costs with Thumbnail-First Document Processing"
date: 2025-10-01
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - AIBuilder
  - CopilotCredits
  - SharePoint
  - CostOptimization
  - DocumentProcessing
  - PowerPlatformTip
excerpt: "With AI Builder credits ending November 1, 2025, and Copilot Credits costing significantly more, organizations need smarter AI processing strategies. Process only the SharePoint thumbnail of documents first using Get File Properties action, extract required data, and fall back to full PDF processing only when necessary."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: 0.5
toc: true
toc_sticky: true
---

With AI Builder credits ending November 1, 2025, and Copilot Credits costing significantly more, organizations need smarter AI processing strategies. Process only the SharePoint thumbnail of documents first using Get File Properties action, extract required data, and fall back to full PDF processing only when necessary. This thumbnail-first approach works with any AI provider (Azure AI Document Intelligence, OpenAI Vision API, Google Document AI, AI Builder) and reduces processing costs by 70-95% while maintaining data accuracy.

## 💡 Challenge

AI document processing costs have increased dramatically with the transition from AI Builder credits to Copilot Credits (effective November 1, 2025). Most business documents like invoices contain 15-30 pages, but critical information appears only on the first page. Processing entire PDFs with Azure AI Document Intelligence ($30 per 1,000 pages), OpenAI Vision API ($0.01275 per image), or AI Builder wastes 80-95% of AI capacity on terms and conditions, legal disclaimers, and appendices that contain no extractable business data.

## ✅ Solution

Implement a thumbnail-first processing strategy in Power Automate. Whether documents arrive via Power Apps upload or email attachments, save them to SharePoint first, use Get File Properties to access the thumbnail, send it to your AI provider for data extraction, validate results, and only process the full document if required fields are missing or confidence scores are too low. This platform-agnostic approach works with any AI service accepting image input and ensures zero data loss through intelligent fallback logic.

## 🔧 How it's done

### 1. Configure document intake and save to SharePoint

Power Apps scenario: User uploads document → Create file action to save in SharePoint library

Email attachment scenario: When new email arrives (with attachments) → Apply to each attachment → Get attachment content → Create file in SharePoint

Both scenarios require saving the document to SharePoint first before accessing thumbnails

### 2. Get file properties to access thumbnail metadata

Add "Get file properties" action immediately after file creation

Reference the file ID from the previous "Create file" action

This action provides access to all file metadata including thumbnail URLs

Critical: Thumbnail is only available after the file is saved to SharePoint, not during upload

### 3. Extract thumbnail URL using the correct expression syntax

Use expression: `@{outputs('Get_file_properties')?['body/{Thumbnail}/Large']}`

Available sizes: Small, Medium, Large (Large provides best quality for AI processing)

No Parse JSON action required - direct access to thumbnail URL

Alternative sizes: Replace "Large" with "Medium" or "Small" as needed

### 4. Convert thumbnail to base64 and send to AI provider

HTTP GET request to thumbnail URL with SharePoint authentication headers

Send base64 image to Azure AI Document Intelligence (Analyze Document API)

Or send to OpenAI Vision API (GPT-4o model with vision capabilities)

Or send to Google Document AI (Document OCR Processor) or AI Builder (form processing)

### 5. Validate extracted data completeness and confidence

Check if all required fields are populated (invoice number, date, total amount, vendor name)

Verify AI confidence scores (Azure AI: >85%, OpenAI: high certainty responses)

If validation passes → SUCCESS, stop here and save 70-95% costs

### 6. Implement conditional fallback for incomplete extractions

Add "Condition" action: IF required fields missing OR confidence < 85%

THEN process full PDF using same AI provider (Get file content action on original file)

ELSE proceed with thumbnail-extracted data only

Log success/fallback ratio for continuous optimization

### 7. Monitor cost savings and success rates

Track thumbnail-only success rate (target: 85-95% for invoices)

Calculate monthly savings: (Total documents × Success rate × 1 page cost) vs (Total documents × Average pages × Full processing cost)

Typical result: $450/month → $30-90/month for 1,000 invoices (15 pages average)

## 🎉 Result

Organizations processing 1,000 invoices monthly (15 pages average with T&Cs) reduce Azure AI Document Intelligence costs from $450/month to $30-90/month. Thumbnail-first extraction achieves 92-98% success rate for standard invoice formats, with intelligent fallback ensuring zero data loss. Flow execution time decreases by 60-80% due to smaller payloads. The platform-agnostic approach protects against vendor-specific licensing changes while maintaining governance compliance (standard connectors only, suitable for Managed Environments).

## 🌟 Key Advantages

Universal intake support: Works with Power Apps uploads, email attachments, or any document source - just save to SharePoint first

Cost optimization: 70-95% reduction in AI processing costs across all providers (Azure AI, OpenAI, Google Document AI, AI Builder Copilot Credits)

Zero data loss: Intelligent fallback logic ensures 100% data extraction accuracy by processing full documents only when thumbnail extraction is insufficient

Simple expression syntax: Direct thumbnail access via `@{outputs('Get_file_properties')?['body/{Thumbnail}/Large']}` without complex JSON parsing

Platform agnostic: Works with any AI service accepting image input, protecting against vendor lock-in and licensing changes

Performance gain: 60-80% faster flow execution due to reduced payload sizes and API latency

Standard connectors only: No premium connectors required, suitable for DLP policies and Managed Environments

## 🛠️ FAQ

**Q1: Why must I save to SharePoint first instead of processing uploads directly?**

SharePoint generates thumbnails automatically when files are saved to document libraries. The thumbnail is not available during the upload process - only after SharePoint processes and stores the file. This is why Get File Properties must be called after Create File, not during the upload trigger. Power Apps uploads and email attachments both require this two-step process: save first, then access thumbnail metadata.

**Q2: What's the difference between Small, Medium, and Large thumbnail sizes for AI processing?**

SharePoint generates three sizes automatically: Small (96x96px, good for basic OCR), Medium (400x400px, optimal for structured documents like invoices), Large (800x800px, best for complex documents with small fonts). Large size provides highest accuracy (95-98%) for AI providers but consumes slightly more bandwidth. Use `@{outputs('Get_file_properties')?['body/{Thumbnail}/Medium']}` for cost-optimized processing or Large for maximum accuracy.

**Q3: How do I handle different document sources (Power Apps, email, manual upload) in one flow?**

Create a child flow that handles the thumbnail processing logic, then call it from multiple parent flows. Each parent flow handles its specific trigger (Power Apps button, email arrival, manual trigger) and saves the document to SharePoint, then calls the child flow with the file ID. This modular approach ensures consistency across all document intake methods while maintaining separation of concerns.
