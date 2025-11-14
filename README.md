# VRChatにあるカードゲーム「ぷぷりえーる」のデッキ構築などができるwebアプリ
自宅鯖： https://pplale.pgw.jp/  （ipv4対応しました）   
予備: https://pplale-web-front.vercel.app/ （デッキデータをパーソナライズするためGitHubPagesから移行）
![image](https://github.com/user-attachments/assets/f30d43ca-e1b6-463f-ac5a-f3d9b23f0922)

![image](https://github.com/user-attachments/assets/51f9bd05-2cd3-4e7f-9c74-3763ed0fa326)

## ぷぷりえーるとは
VRChatのイベント「ロリっ子喫茶ぷぷりえ」のカードゲーム！幼女カードとお菓子カードがある。推しのカードでデッキを構築しよう！

## 通常構築
カードをドラッグ＆ドロップして構築する
![image](https://github.com/user-attachments/assets/1af293a3-7bbc-4b70-b80d-4d6e29962c78)



## 2pick構築について
シャドウバースの2pickのようにある程度ランダムにデッキを構築する。
```
フルーツ、プレイアブルカードのバージョン選択
↓
最後に選択するプレイアブルカード3枚の確認
↓
二枚ずつ選んデッキ構築
↓
プレイアブルカード選択
```


# 開発について

## 開発経緯

VRChatのカードゲーム「ぷぷりえーる」は、VRChatのワールド内でデッキを構築する必要があり、保存は各自がデッキデータをメモする必要がありました。これをブラウザ上で構築してユーザーごとに保存できるようにしたいと思い開発を開始しました。

また、2Pickで構築したいという要望や、webアプリがあったらいいなという話があったため、このプロジェクトを進めることになりました。

## 技術
なるべく高速に開発（開発->実装まで数週間）するためNext.js+Tailwwind+firebaseの構成。
ハッカソン並みの速度で開発した。
VRをプレイしながら話を聞きながら実装する超高速アジャイル開発を繰り返して作るため、AIが書きやすいNext.js+Tailwwindを選んだ。

## 環境変数について 
firebaseを使うためには必要です。