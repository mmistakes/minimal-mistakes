---
title: "#PowerPlatformTip 140 – Free Invoice OCR (Process 500 PDFs/Month for €0)"
date: 2025-08-01
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - OCR
  - AzureAI
  - AdobePDF
  - Cloudmersive
  - Invoices
  - PowerPlatformTip
excerpt: "Build a Power Automate flow that reads and summarises up to 500 PDF invoices every month - completely free with Adobe, Cloudmersive, or Azure plus Azure AI Language."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Accounts-payable still receives hundreds of PDF invoices, reminders, and receipts every month.  
Manual keying of amounts, due dates, and suppliers is slow, costly, and error-prone.

## ✅ Solution
Combine any **free-tier OCR connector** (Adobe PDF Services, Cloudmersive PDF/OCR, or Azure Document Intelligence Read F0) with **Azure AI Language – Abstractive Summarization F0**.  
One Power Automate flow extracts text from each PDF and returns a clear, three-bullet summary - at zero cost up to **500 pages per month**.

## 🔧 How It's Done
Here's the 5-step recipe:
1. **Trigger** – *When a file is created* (SharePoint / OneDrive → folder **Incoming Invoices**).  
2. **OCR action** – pick **one** connector:  
   🔸 Adobe PDF Services (standard) 🔸 Cloudmersive PDF (premium) 🔸 Azure Read F0 (standard)  
3. **Compose** – capture the plain OCR text (`content` or `text` field).  
4. **HTTP** – call **Azure AI Language** `/language:analyze-text` with  
   `kind=AbstractiveSummarization` and `summaryLength=short`.  
5. **Post-Process** – send a Teams/Outlook summary, store in Dataverse table **InvoiceSummaries**, then move the PDF to an **Archive** folder.

## 🎉 Result
Every new invoice now triggers an automated pipeline - OCR → AI summary → messaging/storage.  
Finance receives key facts (total, due date, supplier) within seconds and can focus on approvals instead of data entry.

## 🌟 Key Advantages
🔸 **€0 budget** for up to 500 pages per month  
🔸 100 % Power Platform - no external servers or scripts  
🔸 Swappable OCR connectors; keep the same summarisation step  
🔸 Handles multilingual invoices and receipts  
🔸 Seamless upgrade path when your volume grows

## 🛠️ FAQ
**1. Do I need a premium licence?**  
Only if you choose **Cloudmersive** (premium connector). Adobe PDF Services and Azure Read F0 use standard or HTTP actions.

**2. What about multi-page PDFs with Azure Read F0?**  
The free tier processes only the **first two pages**. Split longer invoices or upgrade to S0 (€0.01 / page).

**3. How do I avoid hitting Azure AI token limits?**  
F0 allows 16 384 characters per request - trim or chunk OCR text for very long invoices.

---
