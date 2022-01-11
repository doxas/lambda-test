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

* stage を dev に
  - この dev というのは、serverless が自動でステージング的に分けてくれるもので、AWS の機能ではない
* region を AWS 上と揃える
* events > httpApi > path | method をコメント解除し、指定する
  - path はスラッシュから始まるパスにする

```
$ serverless deploy --verbose --aws-profile プロファイル名
```

## Api Gateway

severless.yml に正しく設定されていれば自動的に作られる。

最初のデプロイ時に、コマンドライン上にもエンドポイントが出力された。

