# URoidChat &#x1f970; &#x1f4ac;
自分好みのアバターとチャットできるAIチャットアプリです！
<br>
他にもクイズやしりとり、おえかきなどたくさんの機能が実装されています&#x1f606;
<br><br>
<image src='./src/static/images/OGP.png'>
<br><br>

## &#x2728; 作品URL
https://uroidchat.herokuapp.com/<br>
※ Chrome推奨
  
## &#x1f4c4; 発表資料URL
https://docs.google.com/presentation/d/1bwkwZFQ5rkDQIxiZwiaiJ5d8rrG5uynw5kJxL4zBWhU/edit#slide=id.ge110286eb2_1_53<br>
（動画はぜひ音ありでご覧ください…！&#x1f609;&#x2728;）

## &#x1f973; 遊び方
- チャットを送るとAIが返信と読み上げをしてくれます！
- 自分の名前とAIの名前を任意の名前に変更することができます！
- 自分のVRMファイルをアップロードすることで「うちの子」とお話することができます！

## &#x1f44d; 実装機能
- 対話機能(音声認識＆読み上げ)
- ネガポジ判定によるAIの表情や言動仕草の変化(感情の再現)
- 3Dモデル(vrmファイル)アップロード機能
- 同時編集機能によるお絵描き＆チャット
- しりとり
- クイズ
- アップロードした画像を手書き風に加工する機能
- ランキング
- ボイス＆SE

## &#x1f4bb; 使用技術
- HTML
- CSS ( Sass )
- JavaScript ( jQuery / Three.js / Vue.js )
- TypeScript
- Python ( Flask )
- webpack
- websocket
- Docker
- Heroku
- Unity

## &#x1f4af; こだわった点
- とにかく「**世界観**」を大事にした
  - SEなどを取り入れることで、ゲーム感を強くした
  - 世界観にこだわったUIにした
- 楽しく話すために、チャット内容のネガポジ判定でAIの感情を表現した
  - 話した言葉に応じてモデルの動きが変化するようにした
- 軽量化
  - モデルの表示回数を減らすための工夫をした
    - Ajaxを用いてページ遷移なしでデータのやり取りをするようにした
    - Vue.jsを用いて機能ごとのSPAにすることでページ遷移の回数を必要最低限にした
  - 画像やソースコードの最適化(圧縮・分割など)をした

## &#x1f60e; 制作メンバー
- Teamうどん
  - Yuuna Yanagida（フロントエンド担当）
  - Leon Kunishi（インフラ・3Dモデル担当）
  - Ryunosuke Ikeda（バックエンド担当）
- Special thanks
  - みかたま（Voice担当）
<hr>

## &#x1f527; build
```
$ npm run build
```
