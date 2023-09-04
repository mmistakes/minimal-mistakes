from string import Template

OUTPUT_FOLDER='_posts'

post_template = Template("""---
layout: elternbrief
title: "${title}"
date: "${date}"
modified: "${modified}"
category: elternbrief
---

${body}

""")

def main():
    import os

    def parse_date(date_str):
        import dateutil.parser
        datetime = dateutil.parser.isoparse(date_str)
        return datetime

    post = {
        'id': os.environ['ISSUE_ID'],
        'title': os.environ['ISSUE_TITLE'],
        'body': os.environ['ISSUE_BODY'],
        'created_at': parse_date(os.environ['ISSUE_CREATED_AT']), # 2023-09-04T15:34:54Z
        'updated_at': parse_date(os.environ['ISSUE_UPDATED_AT']), # 2023-09-04T15:34:54Z
    }

    def post_filename(post):
        from slugify import slugify
        # YEAR-MONTH-DAY-title.MARKUP
        date_str = post['created_at'].strftime("%Y-%m-%d")
        slug_title = slugify(post['title'])
        return f'{date_str}-{slug_title}.md'

    def to_jekyll_date(date):
        return date.strftime("%Y-%m-%d %H:%M:%S") # YYYY-MM-DD HH:MM:SS

    template_post = dict(**post)
    template_post['date'] = to_jekyll_date(template_post['created_at'])
    template_post['modified'] = to_jekyll_date(template_post['updated_at'])
    template_post['filename'] = post_filename(template_post)

    print (f"post_id: {post['id']}")
    print (f"filename: {template_post['filename']}")
    print (post_template.substitute(**template_post))

    with open(OUTPUT_FOLDER + '/' + template_post['filename'], "w") as f:
        f.write(post_template.substitute(**template_post))

if __name__ == "__main__":
    main()
