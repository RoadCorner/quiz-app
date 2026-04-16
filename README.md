# Quiz App

JSON ファイルを読み込んで、そのまま多肢選択クイズとして遊べる React 製のクイズアプリです。  
複数ファイルの読み込み、カテゴリ別の出題、スコア計算、スピードボーナス、解説表示に対応しています。

## デモ

- Live Demo: https://quiz-app-five-tau-77.vercel.app/

## 主な機能

- JSON ファイルをドラッグ&ドロップ、またはファイル選択で読み込み
- 複数ファイルをまとめて取り込み
- 問題カテゴリごとの絞り込み
- 正誤判定と解説表示
- 回答速度に応じたスピードボーナス
- 連続正解数に応じたコンボ表示
- 途中終了時の結果表示
- 不正な JSON や項目不足を読み込み時に検出

## 使用技術

- React 19
- Vite 8
- ESLint

## 開発環境の起動

```bash
npm install
npm run dev
```

ブラウザで表示されたローカル URL を開くと確認できます。

## 利用できるスクリプト

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 使い方

1. トップ画面で JSON ファイルを読み込みます。
2. 有効な問題が 1 件以上あると `Start` ボタンが押せます。
3. カテゴリを選ぶとクイズが始まります。
4. 選択肢を選んで `Check` を押すと正誤と解説が表示されます。
5. `Next` で次の問題へ進み、最後に結果画面が表示されます。

## JSON 形式

読み込む JSON は、問題オブジェクトの配列にしてください。

```json
[
  {
    "question": "Which process is used to aggregate estimated costs?",
    "choices": [
      "Control Costs",
      "Estimate Costs",
      "Plan Cost Management",
      "Determine Budget"
    ],
    "answer": 3,
    "category": "Planning",
    "explanation": {
      "correct": "Determine Budget aggregates estimated costs to establish the cost baseline.",
      "incorrect": [
        "Control Costs is used to monitor cost performance.",
        "Estimate Costs is for estimating individual costs.",
        "Plan Cost Management defines how cost will be managed."
      ]
    }
  }
]
```

## 必須項目

- `question`: 問題文の文字列
- `choices`: 選択肢の配列
- `answer`: 正解のインデックス番号
- `category`: カテゴリ名

## 任意項目

- `explanation.correct`: 正解理由
- `explanation.incorrect`: 他の選択肢が不正解である理由の配列

`explanation` を含める場合は、`correct` と `incorrect` の両方を正しい形式で入れる必要があります。

## バリデーションについて

読み込み時に、以下のような問題があるデータは除外されます。

- JSON のルートが配列ではない
- 問題データがオブジェクトではない
- `question` が空文字または未設定
- `choices` が配列ではない、または要素数が不足している
- `answer` が選択肢の範囲外
- `category` が未設定
- `explanation` の形式が不正

読み込み結果は画面上に表示され、有効件数とエラー内容を確認できます。

## ディレクトリ構成

```text
src/
  components/
    quiz/
      ChoicesList.jsx
      ComboBar.jsx
      ExplanationPanel.jsx
      QuizHeader.jsx
      QuizPlayer.jsx
    screens/
      QuizScreen.jsx
      ResultScreen.jsx
    selectors/
      CategorySelector.jsx
      FileSelector.jsx
  data/
    mockQuestions.js
  App.jsx
  main.jsx
```

## 今後の改善候補

- README の JSON サンプルを日本語版でも追加する
- 問題の重複チェックを入れる
- テストを追加する
- モバイル画面向けのレイアウト最適化を進める

## 補足

このアプリはバックエンドを使わず、ブラウザ上で完結して動作します。  
そのため、読み込んだクイズデータはサーバーには送信されません。
