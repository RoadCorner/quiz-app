# Quiz App

ローカルの JSON ファイルを読み込んで使う、React + Vite 製のクイズアプリです。  
複数の問題セットを取り込み、カテゴリで絞り込みながら、`Multiple Choice` または `Text Input` 形式で回答できます。

## デモ

- Live Demo: https://quiz-app-five-tau-77.vercel.app/

## 主な機能

- 1つ以上のローカル JSON ファイルを読み込み
- 読み込み時にクイズデータをバリデーション
- カテゴリごとの出題範囲選択
- デフォルトで全カテゴリ対象
- 選択式モードでの選択肢シャッフル
- 問題順のシャッフル
- `Multiple Choice` と `Text Input` の切り替え
- `Text Input` モードで選択肢の表示・非表示を切り替え
- 正解・不正解の解説表示
- 終了後に間違えた問題だけを復習

## 使用技術

- React 19
- Vite 8
- ESLint

## セットアップ

```bash
npm install
npm run dev
```

開発サーバー起動後、ターミナルに表示されるローカル URL をブラウザで開いてください。

## 利用できるスクリプト

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 使い方

1. ファイル選択画面で 1 つ以上の JSON クイズファイルを読み込みます。
2. 有効な問題セットが少なくとも 1 つ読み込まれていることを確認します。
3. カテゴリ設定画面で、出題対象のカテゴリを選びます。
4. 出題形式、シャッフル設定、選択肢の表示設定を調整します。
5. `Start Quiz` でクイズを開始します。
6. 各問題に回答し、`Check` を押します。
7. `Next` を押して次の問題へ進みます。
8. 結果画面で成績を確認し、必要なら間違えた問題だけ復習します。

## 出題形式

### Multiple Choice

- デフォルトの出題形式です。
- 表示された選択肢の中から 1 つを選んで回答します。
- このモードでは `Shuffle Choices` を利用できます。

### Text Input

- 選択肢の文言を自分で入力して回答します。
- 入力判定では次の正規化を行います。
  - 大文字・小文字を区別しない
  - 余分な空白を無視する
  - 軽微な記号差を無視する
- 入力内容がどの選択肢にも一致しない場合、すぐに不正解にはせず、候補にある回答を入力するよう案内します。
- 必要に応じて、選択肢を表示したまま入力することもできます。

## JSON 形式

アップロードするファイルは、問題オブジェクトの配列になっている必要があります。

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

## 必須フィールド

- `question`: 問題文
- `choices`: 選択肢の配列
- `answer`: 正解の選択肢インデックス
- `category`: カテゴリ名

## 任意の解説フィールド

- `explanation.correct`: 正解の解説
- `explanation.incorrect`: 他の選択肢が不正解である理由の配列

`explanation` を含める場合は、`correct` と `incorrect` の両方が正しい形式で入っている必要があります。

## バリデーションルール

読み込まれたデータは、クイズへ追加する前に検証されます。

- JSON のルートは配列であること
- 各問題はオブジェクトであること
- `question` は空でない文字列であること
- `choices` は 2 件以上の空でない文字列を含むこと
- `answer` は `choices` 内の有効なインデックスであること
- `category` は空でない文字列であること
- `explanation` を含む場合は以下を満たすこと
  - `correct` が空でない文字列であること
  - `incorrect` が空でない文字列の配列であること

不正なデータがある場合は、UI 上にエラーとして表示されます。

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
      TextAnswerInput.jsx
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

## 補足

- このアプリはリモート API ではなく、ローカル JSON の読み込みを前提にしています。
- 複数のクイズファイルを 1 セッション内でまとめて扱えます。
- `src/data/mockQuestions.js` に含まれるサンプルデータは、開発や動作確認に便利です。
