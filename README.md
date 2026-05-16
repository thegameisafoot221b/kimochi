# きもちをえらぼう

知的障害のある子どもが日常生活の気持ちをイラストで選んで表現できるアプリです。

## 機能

- 24種類の感情を5カテゴリー（ポジティブ・ネガティブ・イライラ・ドキドキ・からだ）から選択
- 各感情ごとにSVGイラストの顔（表情）を表示
- 「こんなときに感じる」場面イラストを4枚表示
- 感情の強さをバーで選択（ちょっと〜すごく）
- 「つたえる！」ボタンでメッセージ確認

## セットアップ

### 必要なもの
- Node.js 18.17 以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

### ビルド

```bash
npm run build
npm start
```

---

## Vercel へのデプロイ

### 方法1: Vercel CLI（推奨）

```bash
# Vercel CLIをインストール（未インストールの場合）
npm install -g vercel

# デプロイ（初回はログインが必要）
vercel

# 本番デプロイ
vercel --prod
```

### 方法2: GitHub連携

1. このプロジェクトをGitHubにプッシュ
2. [vercel.com](https://vercel.com) でアカウント作成・ログイン
3. 「New Project」→ リポジトリを選択
4. Framework Preset が **Next.js** になっていることを確認
5. 「Deploy」をクリック

設定変更不要でそのままデプロイできます。

---

## プロジェクト構成

```
src/
├── app/
│   ├── layout.tsx        # ルートレイアウト・メタデータ
│   ├── page.tsx          # トップページ
│   └── globals.css       # グローバルスタイル
├── components/
│   └── KimochiApp.tsx    # メインアプリコンポーネント
└── lib/
    ├── feelings.ts        # 感情データ・型定義
    ├── faceSvg.ts         # 顔イラストSVG生成
    └── sceneSvg.ts        # 場面イラストSVG生成
```

## カスタマイズ

### 感情を追加・変更する
`src/lib/feelings.ts` の `CATEGORIES` 配列を編集してください。

### 顔イラストを変更する
`src/lib/faceSvg.ts` の `FACE_CONFIGS` を編集してください。
各感情ごとに `eyes`, `brow`, `mouth`, `cheek`, `extra` を設定します。

### 場面イラストを追加する
`src/lib/sceneSvg.ts` にSVG文字列を追加してください。
