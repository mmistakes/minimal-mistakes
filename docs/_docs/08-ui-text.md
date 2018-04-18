---
title: "UI Text"
permalink: /docs/ui-text/
excerpt: "Text for customizing user interface elements found in the theme."
last_modified_at: 2018-04-10T08:40:57-04:00
---

Text for UI elements, `_layouts`, and `_includes` grouped together as a set of translation keys. This is by no means a full-on i18n solution, but it does help make customizing theme text a bit easier.

The English[^yaml-anchors] main keys in [`_data/ui-text.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/ui-text.yml) are translated in the following languages:

- Brazilian Portuguese (Português brasileiro)
- Chinese
- Danish
- Dutch
- French (Français)
- German (Deutsch)
- Greek
- Indonesian
- Italian (Italiano)
- Korean
- Japanese
- Nepali (Nepalese)
- Polish
- Russian
- Slovak
- Spanish (Español)
- Swedish
- Turkish (Türkçe)
- Vietnamese

If you're are interested in localizing them into other languages feel free to submit a pull request and I will be happy to look it over.

[^yaml-anchors]: `en-US`, and `en-GB` use [YAML anchors](http://www.yaml.org/spec/1.2/spec.html#id2785586) to reference the values in `en` as to not repeat them.

Many of the label based keys like `meta_label`, `categories_label`, `tags_label`, `share_on_label`, and `follow_label` can be left blank if you'd like to omit them from view. It really depends on you and if you want an even more minimal look to your site.

![UI text labels]({{ "/assets/images/mm-ui-text-labels.jpg" | relative_url }})

**Note:** The theme comes with localized text in English (`en`, `en-US`, `en-GB`). If you change `locale` in `_config.yml` to something else, most of the UI text will go blank. Be sure to add the corresponding locale key and translated text to `_data/ui-text.yml` to avoid this.
{: .notice--warning}
