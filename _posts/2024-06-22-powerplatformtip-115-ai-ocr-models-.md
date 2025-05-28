---
title: "#PowerPlatformTip 115 – 'AI OCR Models'"
date: 2024-06-22
categories:
  - Article
  - PowerPlatformTip
tags:
  - ai
  - ai-ocr
  - ai-builder
  - azure-document-intelligence
  - power-automate
  - cost-savings
  - document-processing
  - prebuilt-models
excerpt: "Compare AI Builder and Azure Document Intelligence in Power Platform for cost-effective, flexible AI OCR document processing."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Automating document processing efficiently is crucial for handling various types of documents. Choosing the right AI OCR tool within Power Platform can make a significant difference.

## ✅ Solution
Power Platform offers two main AI OCR tools—AI Builder and Azure Document Intelligence Service—each providing different models, integration options, and cost structures.

## 🔧 How It's Done
Here's how to do it:
1. AI Builder Approach  
   🔸 Setup: Access make.powerapps.com, select prebuilt models like invoice processing, receipt processing, business card reader, and form processing.  
   🔸 Testing & Deployment: Use sample documents to test and integrate into a Power Automate flow.  
   🔸 Costs: Requires purchasing AI Builder credits, costing around 1.6 cents per page.
2. Azure Document Intelligence Service  
   🔸 Setup: Configure the service in Azure, selecting prebuilt models such as invoices, receipts, business cards, and custom documents.  
   🔸 Integration: Obtain API keys and endpoints for Power Automate.  
   🔸 Usage: Send requests to the API and process documents with greater control and flexibility.  
   🔸 Costs: $10 for 1,000 pages (1 cent per page), offering about 40% cost savings compared to AI Builder.

## 🎉 Result
Azure Document Intelligence delivers significant cost savings, a broad selection of prebuilt models, and greater control over document processing workflows, making it the superior choice for most scenarios.

## 🌟 Key Advantages
🔸 Quick and easy setup with AI Builder, fully integrated into Power Automate.  
🔸 Cost savings (up to 40%) with Azure Document Intelligence at $0.01 per page.  
🔸 Broad selection of prebuilt models and greater flexibility with Azure Document Intelligence.

---

## 🎥 Video Tutorial
{% include video id="fLHmEwcg8Jo" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the main difference between AI Builder and Azure Document Intelligence?**  
AI Builder is tightly integrated into Power Platform with an easy setup, while Azure Document Intelligence offers more flexibility, a wider range of models, and lower per-page costs.

**2. How do I choose the right prebuilt model for my documents?**  
Select a model based on your document type—such as invoices, receipts, or business cards—and test it with sample files to ensure accuracy before integration.

**3. What are the cost implications of each service?**  
AI Builder costs around 1.6 cents per page, whereas Azure Document Intelligence costs about 1 cent per page (with $10 per 1,000 pages), providing roughly 40% savings.