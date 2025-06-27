# Study Time Tracker - AI開発ガイド

このドキュメントは、AIペアプログラミング（Claude Code/Cursor）を活用した効率的な開発のためのガイドです。

## 🚀 Study Time Tracker 開発計画 - 最適化版

### 📋 フェーズ0：準備・基盤構築（3-4時間）

#### 1. プロジェクト初期設定
```bash
# GitHubリポジトリ作成後、Cursorで実行
npx create-next-app@latest study-time-tracker --typescript --tailwind --app --src-dir
cd study-time-tracker

# 必要パッケージを一括インストール
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/ssr chart.js react-chartjs-2 date-fns react-hook-form @hookform/resolvers zod lucide-react react-hot-toast
```

#### 2. プロジェクト構造作成
**ClaudeCodeに依頼：**
```
要件定義書（task.rtf）を基に、以下のディレクトリ構造を作成してください：
- src/app/の構造（認証、ダッシュボード系）
- src/components/の構造
- src/lib/の構造（supabase, utils）
- src/hooks/の構造
- src/types/の構造
各ディレクトリに適切なindex.tsも含めてください。
```

#### 3. Supabase設定とDB設計
**ClaudeCodeで実装：**
```sql
-- 以下のテーブル設計でSQLを生成
-- profiles, study_sessions, subjects, user_subjects, goals
-- 各テーブルにRLSポリシー含む
-- トリガーとファンクションも含む
```

#### 4. 環境変数と基本設定
```typescript
// .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

#### 5. 技術検証（PoC）
**Cursorで簡易実装：**
- `/timer`ページでSupabase接続確認
- 基本的なレイアウトコンポーネント作成

---

### 📅 フェーズ1：認証とコア機能（2日）

#### Day 1: 認証システム完成

**午前：Supabase Auth基盤**
- **ClaudeCode活用：**
  ```
  「Next.js 14 App RouterとSupabase SSRを使った認証システムを実装。
  middleware.ts、認証用のサーバーアクション、クライアントフックを含めて」
  ```
  - `src/lib/supabase/server.ts`
  - `src/lib/supabase/client.ts`
  - `src/app/auth/callback/route.ts`
  - `src/middleware.ts`

**午後：認証UI実装**
- **Cursor活用：**
  ```
  「React Hook FormとZodを使った認証フォームコンポーネントを作成。
  サインアップ、サインイン、パスワードリセット対応」
  ```
  - `src/components/auth/AuthForm.tsx`
  - `src/app/(auth)/login/page.tsx`
  - `src/app/(auth)/signup/page.tsx`

#### Day 2: タイマーとセッション管理

**午前：タイマーロジック**
- **ClaudeCode活用：**
  ```
  「バックグラウンドでも正確に動作するタイマーフックを実装。
  Web WorkersまたはrequestAnimationFrameを使用」
  ```
  - `src/hooks/useTimer.ts`
  - `src/hooks/useStudySession.ts`
  - `src/lib/utils/timer.ts`

**午後：タイマーUI**
- **Cursor活用：**
  - タイマー表示コンポーネント
  - 科目選択（プリセット＋カスタム）
  - セッション保存ロジック

---

### 📊 フェーズ2：データ管理とCRUD（1.5日）

#### Day 3: セッション管理完成

**午前：API実装**
- **ClaudeCode活用：**
  ```
  「Supabaseを使ったセッションCRUD操作を実装。
  Server ActionsまたはRoute Handlersで」
  ```
  - セッション作成・更新・削除
  - 科目管理API
  - リアルタイム購読設定

**午後：セッション管理UI**
- **Cursor活用：**
  - セッション履歴表示
  - 編集・削除機能
  - 手動時間追加モーダル

---

### 📈 フェーズ3：可視化とダッシュボード（2日）

#### Day 4: ダッシュボード基盤

**午前：データ集計**
- **ClaudeCode活用：**
  ```
  「Supabase RPCで効率的な集計関数を作成。
  日次・週次・月次のサマリーデータ取得」
  ```
  - 集計用SQL関数
  - データフェッチフック
  - キャッシュ戦略

**午後：ダッシュボードUI**
- **Cursor活用：**
  - 統計カード群
  - リアルタイム更新対応
  - レスポンシブレイアウト

#### Day 5: グラフとカレンダー

**全日：可視化コンポーネント**
- **Cursor活用：**
  ```
  「Chart.jsを使って以下のグラフコンポーネントを作成：
  - 科目別円グラフ
  - 日別棒グラフ
  - カレンダーヒートマップ」
  ```

---

### 🎯 フェーズ4：目標機能と最適化（1.5日）

#### Day 6: 目標設定機能

**午前：目標管理バックエンド**
- **ClaudeCode活用：**
  - 目標テーブルとAPI
  - 達成率計算ロジック
  - ストリーク管理

**午後：目標UI**
- **Cursor活用：**
  - 目標設定フォーム
  - プログレスバー表示
  - 達成バッジシステム

---

### 🏁 フェーズ5：仕上げとデプロイ（1日）

#### Day 7: 品質向上とデプロイ

**午前：最適化**
- パフォーマンス改善
- エラーハンドリング強化
- レスポンシブ対応確認

**午後：デプロイ**
- **Cursor活用：**
  ```
  「Vercelデプロイ用の設定ファイルとGitHub Actions CIを作成」
  ```
- 環境変数設定
- プロダクションテスト

---

### 💡 効率化の具体的テクニック

#### 1. テンプレート準備
**初日にClaudeCodeで生成：**
```typescript
// 基本的なCRUDフック
export function useSupabaseCRUD<T>(tableName: string) {
  // 汎用的なCRUD操作
}

// 基本的なフォームコンポーネント
export function FormField({ ... }) {
  // 再利用可能なフォームフィールド
}
```

#### 2. 並行作業の最適化
- **ClaudeCodeでバックエンド作業中** → **CursorでUI作成**
- **デプロイ待ち時間** → **次フェーズの設計**

#### 3. AIへの効果的な指示
**良い例：**
```
「要件定義書のタイマー機能仕様を満たす、
バックグラウンド対応のReactカスタムフックを実装。
テストコードも含めて」
```

#### 4. コードレビューの活用
**各フェーズ完了時：**
```
「このコードをレビューして、
パフォーマンス、セキュリティ、保守性の観点から
改善点を指摘してください」
```

### 📝 チェックリスト

**各フェーズ開始前：**
- [ ] 前フェーズの動作確認完了
- [ ] 次フェーズの要件整理
- [ ] 必要なパッケージ確認

**各フェーズ完了時：**
- [ ] 基本動作テスト
- [ ] エラーケース確認
- [ ] コミット＆プッシュ

### 🎯 成功のための重要ポイント

1. **動くものを優先** - 完璧を求めすぎない
2. **要件定義書を常に参照** - 実装が迷走しないように
3. **AIと対話的に開発** - 詰まったらすぐ相談
4. **早期にユーザーフィードバック** - 使いやすさを確認

---

## 🛠 プロジェクト固有の情報

### テスト実行コマンド
```bash
npm run lint
npm run typecheck
npm test
```

### デプロイ前チェックリスト
- [ ] 環境変数設定確認
- [ ] ビルドエラーなし
- [ ] TypeScriptエラーなし
- [ ] ESLintエラーなし

### よく使うコマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run typecheck

# リント
npm run lint

# テスト
npm test
```