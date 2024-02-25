# About

AWS Lambdaで動くNode.jsのHTTPのデータ取得スクリプト

## 想定

* Lambdaが実行されたイベントから取得した値をクエリに含めてhttpsでgetする。

## 動作環境

* Node.js 20.x

## 環境変数

* URL

## テスト

```bash
./run.sh test
# or 
npm test
```