# lambda-test

my first lambda-function on aws.

# yml

* stage を dev に
  - この dev というのは、serverless が自動でステージング的に分けてくれるもので、AWS の機能ではない
* region を AWS 上と揃える
* events > httpApi > path | method をコメント解除し、指定する
  - path はスラッシュから始まるパスにする
