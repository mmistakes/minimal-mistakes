---
layout: single
title: "初めてのPhaser！"
categories: GameDev
tag: [Phaser, TypeScript, Vite]
toc: true
---

このブログでは主にPhaserとTypeScriptを使ってゲーム開発していく過程を記録していきます。

# 環境について

まずは環境設定ですね。

私はNode.js環境でViteを使います。

エディターは[Visual Studio Code](https://code.visualstudio.com/)を使います。

現時点で私が使用しているNode.jsとnpmのバージョンは次の通りです。

```shell
% node --version
v16.20.0
% npm --version
8.19.4
```

普段は自分が作ったテンプレートをコピーして新しいプロジェクトを始めます。

最初の記事はテンプレートを作成する過程を記録していきます。

# Vite設定

ここからは先ほど話しましたNode.js環境とVisual Studio Codeがある前提で話を進めます。
{: .notice}

コマンドラインもしくはターミナルからプロジェクトを作成する場所まで移動します。

その後、次のコマンドでVite設定を始めます。

```shell
% npm init vite@latest 
? Project name: › vite-project
```

最初にプロジェクト名を聞いているので私は「first_phaser」としました。

次は使いたいフレームワークを聞いているので「Vanilla」を選択します。

```shell
✔ Project name: … first_phaser
? Select a framework: › - Use arrow-keys. Return to submit.
❯   Vanilla
    Vue
    React
    Preact
    Lit
    Svelte
    Others
```

次はスクリプト種類を聞いているので「TypeScript」を選択します。
```shell
✔ Project name: … first_phaser
✔ Select a framework: › Vanilla
? Select a variant: › - Use arrow-keys. Return to submit.
❯   TypeScript
    JavaScript
```

これでプロジェクトが作られました。

```shell
% npm init vite@latest 
✔ Project name: … first_phaser
✔ Select a framework: › Vanilla
✔ Select a variant: › TypeScript

Scaffolding project in /Users/kwangho/Projects/study/for_blog/first_phaser...

Done. Now run:

  cd first_phaser
  npm install
  npm run dev
```

# VSCodeでの作業

プロジェクトフォルダが作成されたので該当フォルダに移動してVSCodeを開きます。

```shell
% cd first_phaser 
% code .
```

PATHにVSCodeのパスが設定されてなければ、codeコマンドは使えないです。その場合はVSCodeからフォルダを開いてください。
{: .notice}

![VSCode](/assets/images/2023-05-20-first-post/image001.png)

次は不要なファイルを削除します。

```
削除したファイル
/public/vite.svg
/src/counter.ts
/src/style.css
/src/typescript.svg
/src/vite-env.d.ts
```

Vite用の設定ファイルを追加します。プロジェクトルートフォルダーに「vite.config.ts」ファイルを作成します。

![VSCode](/assets/images/2023-05-20-first-post/image002.png)

vite.config.tsに次の内容を入力します。

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        // サーバ起動時、ブラウザ表示
        open: '/index.html',
    },
    build: {
        // 0: スプライトなどのアセットをロードした時にBase64URLへのインライン化を無効化
        assetsInlineLimit: 0,
    }
});
```

入力したら、赤くエラーが表示されるのが見えます。

![VSCode](/assets/images/2023-05-20-first-post/image003.png)

までモジュールが設置されてないためです。

VSCodeのメニューからターミナル>新しいターミナルを選択してターミナルを表示します。

![VSCode](/assets/images/2023-05-20-first-post/image004.png)

ターミナルに次のコマンドを入力してエンターキーを押します。
```shell
% npm install
```

これで先ほどの「vite.config.ts」ファイルのエラー表示はなくなります。

「package.json」ファイいるを見るとTypeScriptのバージョンは次になります。

```json
{
  "name": "first_phaser",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "vite": "^4.3.2"
  }
}
```

次のコマンドをターミナルで実行してTypeScriptをアップデートします。

```shell
% npm install typescript --save-dev
```

いよいよPhaserのインストールです。

次のコマンドをターミナルで実行してPhaserをインストールします。

```shell
% npm install phaser --save
```

これでプロジェクトの準備は完了です。

# 初めてのPhaser

デフォルトのindex.htmlは必要に応じて修正してください。

私は次のような内容に修正しました。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phaser Template</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

次はsrs/main.tsにPhaserの基本コードを書きます。main.tsにもともとある内容は削除して次のような内容を入力します。

```typescript
import Phaser from "phaser";

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200},
    },
  },
  scene: [],
});
```

次はPhaser公式ホームページに紹介されているExampleコードを入力してみます。

参考：[Phaser Example](https://newdocs.phaser.io/docs/3.60.0)
{: .notice}

上記のコードでimportの下に次のコードを入力します。

```typescript
class Example extends Phaser.Scene {
  constructor() {
    super({key: 'example'});
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0},
      blendMode: 'ADD',
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);
  }
}
```

次は先ほどのPhaser.Game設定に作ったクラスを追加します。

```typescript
scene: [Example],
```

これで準備は終わりました。実行してみます。

ターミナルで次のコマンドを実行します。

```shell
% npm run dev
```

ブラウザが開き、次の画面が見えたら成功です。

![結果](/assets/images/2023-05-20-first-post/image005.png)


ここまで読んでいただき、ありがとうございます。