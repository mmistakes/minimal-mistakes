---
title: "So einfach erstellen Sie neue Blog Posts"
date: 2025-05-27
categories:
  - Tutorial
  - How-To
tags:
  - Jekyll
  - Blogging
  - Markdown
  - Anleitung
excerpt: "Eine Schritt-für-Schritt Anleitung, wie Sie kinderleicht neue Blog-Posts erstellen."
toc: true
---

# Neue Blog Posts erstellen - So einfach geht's! 📝

Mit diesem Jekyll-Setup ist das Erstellen neuer Blog-Posts kinderleicht. Hier ist eine Schritt-für-Schritt Anleitung:

## 1. Neue Markdown-Datei erstellen

Erstellen Sie eine neue `.md` Datei im `_posts` Ordner mit folgendem Namensschema:

```
YYYY-MM-DD-titel-des-posts.md
```

**Beispiele:**
- `2025-05-27-mein-neuer-post.md`
- `2025-05-28-rezept-fur-erfolg.md`
- `2025-06-01-sommertipps.md`

## 2. YAML Front Matter hinzufügen

Jeder Post beginnt mit einem YAML Front Matter Block:

```yaml
---
title: "Ihr Post-Titel"
date: 2025-05-27
categories:
  - Kategorie1
  - Kategorie2
tags:
  - tag1
  - tag2
  - tag3
excerpt: "Eine kurze Beschreibung des Posts für Übersichten"
header:
  overlay_color: "#2dd4bf"  # Optional: Mint-Farbe
---
```

## 3. Content in Markdown schreiben

Nach dem Front Matter schreiben Sie einfach Ihren Content in Markdown:

```markdown
# Hauptüberschrift

Dies ist ein Paragraph mit **fettem Text** und *kursivem Text*.

## Unterüberschrift

- Liste Punkt 1
- Liste Punkt 2

### Code-Beispiele

\```javascript
function helloWorld() {
    console.log("Hello, World!");
}
\```

> Dies ist ein Zitat

[Link Text](https://example.com)
```

## 4. Automatische Features nutzen

### Tags und Kategorien
- **Tags**: Spezifische Schlagworte (z.B. "JavaScript", "Tutorial", "Rezept")
- **Kategorien**: Übergeordnete Themenbereiche (z.B. "Programmierung", "Kochen", "Reisen")

### Excerpt
- Kurze Zusammenfassung für Übersichtsseiten
- Wird automatisch in Listen und auf der Startseite angezeigt

### Header-Optionen
```yaml
header:
  overlay_color: "#2dd4bf"        # Farbe als Hintergrund
  overlay_image: /assets/images/  # Bild als Hintergrund
  teaser: /assets/images/         # Kleines Bild für Listen
```

## 5. Erweiterte Optionen

### Inhaltsverzeichnis
```yaml
toc: true          # Inhaltsverzeichnis anzeigen
toc_sticky: true   # Inhaltsverzeichnis beim Scrollen fixieren
```

### Social Sharing
```yaml
share: true        # Social Media Buttons anzeigen
```

### Verwandte Posts
```yaml
related: true      # Ähnliche Posts am Ende anzeigen
```

## 6. Bilder hinzufügen

### Einfache Bilder
```markdown
![Alt Text](/assets/images/mein-bild.jpg)
```

### Bilder mit Bildunterschrift
```markdown
{% include figure image_path="/assets/images/mein-bild.jpg" alt="Alt Text" caption="Dies ist eine Bildunterschrift." %}
```

## 7. Praktische Tipps

### ✅ Best Practices
- Verwenden Sie aussagekräftige Dateinamen
- Fügen Sie immer ein Datum hinzu
- Schreiben Sie gute Excerpts
- Nutzen Sie konsistente Tags und Kategorien
- Strukturieren Sie mit Überschriften

### 🚫 Häufige Fehler
- Vergessen des YAML Front Matter
- Falsches Dateinamensformat
- Leerzeichen in Dateinamen (verwenden Sie Bindestriche)
- Vergessen des Datums

## 8. Vollständiges Beispiel

```markdown
---
title: "Mein erster Blog Post"
date: 2025-05-27
categories:
  - Personal
  - Blog
tags:
  - Anfang
  - Vorstellung
excerpt: "In diesem Post stelle ich mich vor und erkläre, worum es in diesem Blog gehen wird."
header:
  overlay_color: "#2dd4bf"
toc: true
---

# Willkommen zu meinem ersten Post!

Hier beginnt meine Blog-Reise...

## Über mich

Ich bin...

## Was Sie erwarten können

In diesem Blog werde ich über... schreiben.

## Nächste Schritte

Bleiben Sie dran für...
```

## 9. Nach dem Erstellen

Nach dem Speichern der Datei wird Jekyll automatisch:
- ✅ Den Post zur Homepage hinzufügen
- ✅ Tags und Kategorien verlinken
- ✅ Eine schöne URL generieren
- ✅ SEO-Meta-Tags erstellen
- ✅ Related Posts berechnen

## 10. Live-Vorschau

Wenn Sie Jekyll lokal laufen haben:

```bash
bundle exec jekyll serve
```

Dann können Sie Ihre Änderungen sofort unter `http://localhost:4000` sehen!

---

**Tipp:** Kopieren Sie dieses Template und passen Sie es für neue Posts an! 🚀
