# README

## 暗号化について

ZXPに署名するときのパスワードを credential.enc.jsonに暗号化して保存している。

[sops](https://github.com/getsops/sops#using-sops-yaml-conf-to-select-kms-pgp-and-age-for-new-files)を利用して暗号化している。

暗号化、復号化に利用する鍵はGCPのKMSで管理している。

鍵は以下のもの

`projects/nijikan/locations/global/keyRings/sops/cryptoKeys/sops-key`

gcloudのキーリングにアクセスできるアカウントで以下の作業を行うこと。

### GCPの認証情報の設定

```bash
gcloud auth login
gcloud auth application-default login
```

### sops のインストール

```bash
 curl -O -L https://github.com/getsops/sops/releases/download/v3.8.1/sops_3.8.1_amd64.deb
 sudo apt install ./sops_3.8.1_amd64.deb
```

### 復号化

```bash
sops -d credential.enc.json > credential.json
```

### 暗号化

```bash
sops -e credential.json > credential.enc.json
```




