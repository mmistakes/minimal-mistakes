# VID Lab Members

Please regularly update your profile file so the website stays current.

## Creating a Profile

1. Copy the template below into a new Markdown file.  
2. Save the file in the `_people` folder with your unique **key** as the filename (e.g. `blomgren.md`).  
3. Do not remove or delete any fields — if you don’t have information for something, just leave it blank.  

**Roles:** Pick one of the following:  
- `faculty`  
- `student`  
- `guest`  
- `alumni`  

Active members should fill in name, role, role title (e.g. “PhD Student”), research interests, and include a photo.  

---

### Profile Template

```yaml
---
# Identity
key: yourkey              # lowercase unique ID (e.g., blomgren)
first_name: First
last_name: Last
title: "Full Name"        # Display name (same as first+last)

# Role & grouping
role: faculty | student | guest | alumni
role_title: ""            # e.g., "PhD Student", "Associate Professor"
grad_year:                # For alumni only, e.g. 2022

# Contact & profiles
email: name@example.com
website: ""               # personal website if any
scholar: ""               # Google Scholar link
orcid: ""                 # ORCID ID

# Affiliation (optional)
department: ""
division: ""
organization: "Linköping University"
address: |
  Linköpings Universitet <br>
  Kopparhammaren 2 <br>
  601 74 Norrköping, Sweden

# Meta
interest: "Short phrase about your research interests."
tags: ["keyword1", "keyword2", "keyword3"]

# Media
image: "/assets/images/portraits-team/lastname.jpg"
image_alt: "Photo of Full Name"
---