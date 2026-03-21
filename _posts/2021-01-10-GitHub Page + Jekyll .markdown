---
layout: post
title:  "Jekyll 進階設定和調整"
date:   2021-01-09 21:46:42 +0800
categories: 程式開發
tags: [Jekyll, GitHub Pages, 教學]
---
在這裡，我將會教學如何使用基本的Markdown語法，來幫助剛進入遊戲中，不懂如何寫出漂亮的簡介。

Markdown有介紹全套的語法網站：[Markdown 語法說明](https://markdown.tw/)
官網介紹的非常齊全，但相信我，你不會想看完的



# Jekyll 進階設定和調整

10 Jan 2020

距離上次架好 Jekyll blog 之後已經將近一年了，都一直沒更新文章。最近想起來這件事情，於是又重新整理了一下我的 GiyHub Pages 相關設定，並將主題改用 [Hyde](https://github.com/poole/hyde)。

這次查了一些資源，總算是把 jekyll 調教的比較完整。其中最主要是參考 [Rhadow](http://rhadow.github.io/) 這兩篇進行設定的：

- [Jekyll x Github x Blog (Part 1)](http://rhadow.github.io/2015/02/18/Jekyll-x-Github-x-Blog-Part1/)
- [Jekyll x Github x Blog (Part 2)](http://rhadow.github.io/2015/02/20/Jekyll-x-Github-x-Blog-Part2/)

## GitHub Page + Jekyll 的相關資料

- [Jekyll 官網](https://jekyllrb.com/)
- GitHub 上有[完整的使用 Jekyll 建立 GitHub Pages 的教學](https://help.github.com/categories/customizing-github-pages/)。
- GitHub 有[完整的本地建立教學](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)。
- `_config.yml`: 這是 Jekyll 的設定檔，更多的設定請看 [Jekyll Configuration ](https://help.github.com/articles/configuring-jekyll/#defaults-you-can-change)。

## 在本機電腦上執行 Jykyll 看結果

我們可以在發佈文章之前 (推送到 GitHub 上)，先在本機電腦上嘗試執行 Jekyll 看結果。或是要加入一些新功能、調整頁面 CSS 等，都可以用這個方式先預覽，確定結果之後再推送。

以下會介紹本地建立 Jekyll 環境，或是參考 GitHub 上的[教學](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)。

如果你已經有了一個 Jekyll 發佈的 git 項目，但是本地電腦上沒有建立 Jekyll 環境的話，可以參考以下方式 (例如換電腦，或是之前使用 fork 方式來建立項目)。

1. 安裝 ruby (Jykell 3.0 需要 ruby 2.0+ 版本)
2. `gem install jekyll` 直接安裝 Jekyll
3. 在 jekyll 資料夾下執行 `jekyll serve --watch`

在成功啟動之後，會顯示 `Server address: http://x.x.x.x:4000/{baseurl}/` 的訊息，這時將該 URL 貼到瀏覽器上開啟即可 (IP 可以用 `localhost` 取代，即 `http://localhost:4000/{baseurl}/`)。

## 替未來發佈文章

Jekyll 可以替未來發佈文章，只要發佈的時間格式 (:year-:month-:day-:title.md) 是在當下日期之後，Jekyll 就會等到未來發佈。若是本地端要先預覽，可以使用以下指令：

```
$ jekyll serve --watch --future
```

## 總結

由於第一次使用，CSS 的排版花了很多時間調整，disqus + Jekyll 也遇到了一些問題。前後調整了一段時間，雖然還是有許多地方可以完善，終於算是可以見人了。

希望這樣能夠維持自己寫文章的動力。



