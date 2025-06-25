---
title: "When Best Practices Must Wait: Delivering Enhancements Under Pressure"
tags:
  - softwaredevelopment
  - programming
  - engineering
  - consultant
---
# 🚧 When Best Practices Take a Back Seat: Delivering in a Legacy Code Fire Drill

As developers, we pride ourselves on writing clean, modular, and testable code. We refactor ruthlessly, write unit tests religiously, and follow best practices like gospel. But what happens when you’re dropped into a client project with:

- A legacy Python application
- No unit tests
- Poor documentation
- Tight deadlines
- Strict policies (e.g., no AI tool usage)

And yet, you’re expected to **deliver an enhancement or bugfix without breaking anything**?

This post explores how to **temporarily suspend ideal practices** and instead adopt **pragmatic principles** to meet delivery goals without jeopardizing the system—or your sanity.

---

## 🎯 The Real-World Scenario

You're a consultant brought in mid-project. The system is:

- Old and fragile
- Light on documentation
- Missing test coverage
- Written in Python (a language you can read but aren’t fluent in)

You have just **two days** to ship a new feature. Refactoring and test suites are out of the question. The project timeline—and your credibility—are at stake.

So what do you do?

---

## 🧭 The Pragmatic Survival Plan

### 1. **Understand the Entry Point**

Start at the top of the codebase. Look for:

```python
if __name__ == "__main__":
    main()
````

Trace where execution begins. You're not trying to understand everything—just the parts **relevant to the use case**.

#### 🗺 Sample Call Path

```text
main.py
│
└── generate_customer_report()
     ├── fetch_customer_data()
     ├── enrich_with_metadata()
     └── write_csv_report()
```

---

### 2. **Trace Only What You Need**

Look for the flow that touches your use case. For example:

```python
def enrich_with_metadata(data):
    for row in data:
        row["customer_type"] = get_type(row["id"])
        # You want to add "region" here
    return data
```

Skip everything else. Don’t drown in unrelated modules or utility code.

---

### 3. **Use Runtime Clues**

When you can’t write tests, let the app tell you what it’s doing:

```python
print(f"[DEBUG] Customer ID: {row['id']}")
print(f"[DEBUG] Enriched Row: {row}")
```

Or, if logging is available:

```python
logger.debug(f"Customer Region: {row['region']}")
```

You’re building an ad-hoc understanding of the code **as it runs**.

---

### 4. **Make Safe, Minimal Changes**

Avoid sweeping refactors. Your change should be:

* Contained
* Reversible
* Impact-limited

For example:

```python
def enrich_with_metadata(data):
    for row in data:
        row["customer_type"] = get_type(row["id"])
        row["region"] = get_region(row["id"])  # Your enhancement
    return data
```

**Don’t** rename things or clean up old logic unless absolutely necessary.

---

### 5. **Manually Test with Purpose**

Without a test suite, define a manual checklist:

| Step                     | Input             | Expected Output             |
| ------------------------ | ----------------- | --------------------------- |
| 1. Run report for ID 123 | `customer_id=123` | Row has `"region": "West"`  |
| 2. Run report for ID 456 | `customer_id=456` | Row has `"region": "South"` |

**Test incrementally**—run only the code paths you touched.

---

### 6. **Leave a Trail for Future Developers**

Add comments like:

```python
# TODO: Added 'region' field for enhancement X. Needs tests/refactor later.
```

And in your commit notes or changelog:

```markdown
- Enhancement: Added region field to report output
- File modified: reporting.py (enrich_with_metadata)
- Manually tested with sample customer IDs
```

---

## 🧠 Why This Approach Works

You’re applying disciplined, scoped effort under pressure. This means:

* You **don’t risk breaking** unrelated features.
* You **deliver quickly** without trying to modernize everything.
* You leave **breadcrumbs** for future improvements.

---

## 🔁 Summary Workflow Diagram

```text
[ Entry Point ]
      ↓
[ Trace Use Case Path ]
      ↓
[ Add Logs/Prints to Observe Behavior ]
      ↓
[ Make Minimal Targeted Code Change ]
      ↓
[ Manually Test with Clear Scenarios ]
      ↓
[ Document Change & Flag for Future Refactor ]
```

---

## 🧘🏽‍♂️ Final Thoughts

In a perfect world, we’d never touch code without refactoring or writing tests. But in the real world—especially in consulting—you often face trade-offs.

When that happens:

✅ Prioritize delivery
✅ Minimize risk
✅ Stay transparent
✅ Plan for follow-up refactor/testing

**Sometimes, the most professional move isn’t doing what’s ideal—it’s doing what’s necessary, responsibly.**

---

Have thoughts or want to share your experience? Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/aarti-joshi-link/) —I'd love to hear how others approach this challenge.



