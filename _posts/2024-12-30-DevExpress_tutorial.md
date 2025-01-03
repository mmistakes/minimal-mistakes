---
layout: single
title: "DevExpress-tutorial"
categories: devexpress
tags: [Csharp, WinForm, devexpress]
---

### <a href="https://www.youtube.com/watch?v=iQ-vh1TMSCA&list=PL-EU0JUF-XD1rMTFIuhiLjEwyc0yqNbWt&index=3" target="_blank">1. Layout Control</a>

- 폼의 layout 정보를 파일에 저장하고 로드하는 예제

```csharp
private void XtraForm1_Load(object sender, EventArgs e)
{
    string fileName = string.Format("{0}/{1}.xml", Application.StartupPath, this.Name);
    if (File.Exists(fileName))
    {
        //form의 Layout 정보를 XtraForm1.xml 파일에서 읽어온다.
        layoutControl1.RestoreLayoutFromXml(fileName);
    }

}

private void simpleButton1_Click(object sender, EventArgs e)
{
    try
    {
        //현재 layout 정보를 XtraForm1.xml 파일에 저장한다.
        layoutControl1.SaveLayoutToXml(string.Format("{0}/{1}.xml", Application.StartupPath, this.Name));
    }
    catch (Exception ex)
    {
        XtraMessageBox.Show(ex.Message, "Message", MessageBoxButtons.OK, MessageBoxIcon.Error);
    }
}
```
