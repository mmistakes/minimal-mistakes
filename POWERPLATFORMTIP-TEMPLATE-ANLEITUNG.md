# 🚀 PowerPlatformTip Blog Template - Anleitung

Ihr Blog-Template wurde speziell für **PowerPlatformTips** angepasst und folgt dem bewährten Format von Marcel Lehmanns Blog.

## 📋 Template-Struktur

Das Template `_post-template.md` ist jetzt im **PowerPlatformTip-Format** strukturiert:

### 1. **YAML Front Matter**
```yaml
---
title: "PowerPlatformTip [NUMMER] – '[TITEL]'"
date: 2025-05-27
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerApps
  - PowerAutomate
  - PowerBI
  - Technology
  - Marcel Lehmann
excerpt: "[KURZE BESCHREIBUNG]"
---
```

### 2. **Content-Struktur** (in dieser Reihenfolge):

#### 💡 **Challenge**
- Beschreibung des Problems/der Herausforderung
- Was ist die Ausgangssituation?

#### ✅ **Solution** 
- Kurze Beschreibung der Lösung
- Was wird erreicht?

#### 🔧 **How It's Done**
- Schritt-für-Schritt Anleitung
- Nummerierte Liste mit Details (🔸)

#### 🎉 **Result**
- Was wird erreicht?
- Welche Vorteile entstehen?

#### 🌟 **Key Advantages**
- Aufzählung der Hauptvorteile (🔸)

#### **Pro Tip:**
- Zusätzlicher wichtiger Hinweis

#### 🛠️ **FAQ**
- 3 häufige Fragen mit Antworten

#### Video Tutorial
- YouTube Video einbetten

#### Footer-Links
- Newsletter, Training, PowerPlatformTip-Übersicht

## 🎯 Wie Sie neue PowerPlatformTips erstellen:

### 1. Template kopieren
```bash
cp _post-template.md _posts/2025-MM-DD-powerplatformtip-XXX-titel.md
```

### 2. Placeholders ersetzen
- `[NUMMER]` → z.B. "135"
- `[TITEL]` → z.B. "Automate SharePoint with Power Automate"
- `[KURZE BESCHREIBUNG]` → Excerpt für Übersichten
- `[YOUTUBE_VIDEO_ID]` → YouTube Video ID

### 3. Content strukturiert ausfüllen
Folgen Sie der **Challenge → Solution → How It's Done → Result** Struktur

### 4. Tags anpassen
Typische PowerPlatform Tags:
- `PowerPlatform`, `PowerApps`, `PowerAutomate`, `PowerBI`
- `SharePoint`, `Teams`, `AI`, `Automation`
- `Technology`, `Marcel Lehmann`, `PowerPlatformTip`

## ✨ Besondere Features:

### Emojis nutzen
Das Template nutzt konsistente Emojis:
- 💡 Challenge
- ✅ Solution
- 🔧 How It's Done
- 🎉 Result
- 🌟 Key Advantages
- 🔸 Bullet Points
- 🛠️ FAQ

### Video-Einbettung
```markdown
{% include video id="VIDEO_ID" provider="youtube" %}
```

### Konsistente Formatierung
- **Fette Überschriften** für Abschnitte
- Nummerierte Listen für Schritte
- 🔸 für Unterpunkte
- Kursiv für Zitate/Beispiele

## 📝 Beispiel-Post

Ein vollständiges Beispiel finden Sie in:
`_posts/2025-03-13-powerplatformtip-134-optimize-canvas-apps-yaml.md`

Dieser Post zeigt die exakte Struktur und Formatierung.

## 🚀 Quick Start

1. **Template kopieren:** `_post-template.md`
2. **Umbenennen:** `2025-05-27-powerplatformtip-135-mein-tip.md`
3. **Placeholders ausfüllen**
4. **Content strukturiert schreiben**
5. **Speichern** → Jekyll macht den Rest!

---

**Pro Tip:** Das Template ist speziell für die bewährte PowerPlatformTip-Struktur optimiert. Halten Sie sich an das Format für maximale Konsistenz und Lesbarkeit! 🌟
