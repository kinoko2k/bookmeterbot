# AI向けの作業方針

## 目的

このドキュメントは、AIがこのプロジェクトで作業を行う際の作業方針を定義します。

## 出力スタイル

- **言語**: 日本語で回答する
- **トーン**: 技術的かつ丁寧に
- **形式**: 構造化された情報を提供する

## 共通ルール

- **会話言語**: 日本語
- **コミット規約**: Conventional Commits に従う
  - 形式: `<type>: <description>`
  - `<description>` は日本語で記載
  - 例: `feat: Discord メッセージ送信機能を追加`
- **ブランチ命名**: Conventional Branch に従う
  - 形式: `<type>: <description>`
  - `<type>` は短縮形（feat, fix, chore）を使用
  - 例: `feat: add-discord-notification`

## プロジェクト概要

- **目的**: 読書メーターの情報を出力するDiscordBot

## 開発コマンド

```bash
# コマンドを設定
npm run deploy.js

# メインファイルの実行
npm run bot.js
```

## 注意事項

### セキュリティ

- **コミット禁止**: API キーや認証情報を Git にコミットしない
- **ログ禁止**: 個人情報や認証情報をログに出力しない
