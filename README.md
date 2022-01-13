# lambda-test

my first lambda-function on aws.

## 環境

AWS CLI をあらかじめインストールしておき、コマンドラインから `aws` コマンドが叩けるようにしておく。

このとき、GitBash からコマンドが叩けるようにするにはパスを通す必要がある点に注意。

serverless はローカルインストールでどうにかしたかったが、ちょっと手間が掛かりそうなのでいったんグローバルインストールでお茶を濁す。

```
$ npm install -g serverless
```

## AWS

IAM でユーザーを作成し、アクセスキーとシークレットを生成しておく。

権限はよくわからないが AdministratorAccess に設定するとたぶん全部にフルアクセス（？）だと思われるので、なにが適切なのか要調査。

IAM ユーザーが作成でき、必要な情報を取得できたら以下の文法でローカル環境上に「プロファイル」を設定する。このプロファイルは `~/.aws/` に情報が保存され、そのローカル環境上でのみ有効となる。

```
$ serverless config credentials --provider aws --key アクセスキー --secret シークレット --profile プロファイル名
```

以降、デプロイする際などにはプロファイルを指定して実行する形になる。

もし上記のコマンドでプロファイル名を指定しない場合は `default` というプロファイルが自動的に作成される。

## yml

* stage を `${opt:stage, self:custom.defaultStage}` とし……
* custom > defaultStage で `dev` を指定することで、既定のステージを `dev` とする
* region を AWS 上と揃える
* events > httpApi > path | method をコメント解除し、指定する
  - path はスラッシュから始まるパスにする
* plugins > serverless-webpack を追記

## webpack

Node.js では `import` 構文が使えないとかいろいろあるため、webpack を使ってトランスパイルするようにしたいがこれには `serverless-webpack` というプラグインを利用する。

npm で導入の上、webpack.config.js や serverless.yml への適宜設定が必要。

ローカルでの実行やデプロイの際に自動的に webpack が実行されるようになり、プロジェクトルートに `.webpack` というディレクトリが自動的に生成され、それがそのまま Lambda Function としてデプロイされるようになる。 

## deploy

プロジェクトそのもののデプロイは以下のように。

```
$ serverless deploy --verbose --aws-profile プロファイル名
```

関数単体でもデプロイは可能。

## Api Gateway

severless.yml に正しく設定されていれば自動的に作られる。

最初のデプロイ時に、コマンドライン上にもエンドポイントが出力された。

