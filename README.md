# Nijikan

VOICEVOXなどの合成音声ソフトで生成した音声をPremiere Proに取り込み、字幕と音声を配置するための拡張ツールです。

## 機能

- 音声ファイルの書き出しを検出しをPremiere Proに取り込みます。
- 音声ファイルの長さに合わせて字幕を配置します。
- 音声ファイルの長さに合わせて画像を配置します。
- labファイルに合わせて口パクさせます。※After Effectsで設定が必要

## インストール方法

1. GitHubの[リリースページ](https://github.com/Ouvill/nijikanDoc/releases/latest)から最新版の`nijikan.zxp`
   ファイルをダウンロードします。
2. Adobeの[コマンドラインからの作業](https://helpx.adobe.com/jp/creative-cloud/help/working-from-the-command-line.html)
   のドキュメントに従ってインストールを行います。 以下にも手順を記載します
1. コマンドラインを開きます。
   - Windows: **スタート/すべてのプログラム/アクセサリ/コマンドプロンプト**を選択します。
   - macOS：**アプリケーション／ユーティリティフォルダー**で**ターミナルアイコン**をクリックして開きます。
2. 次のコマンドを入力します。Windowsの場合、右クリックでコピー＆ペーストができます。
   - Windows:  
   `cd "C:\Program Files\Common Files\Adobe\Adobe Desktop Common\RemoteComponents\UPI\UnifiedPluginInstallerAgent"`
   - Mac:  
   `cd "/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/MacOS"`
3. 次のコマンドを入力します。ファイル名はダウンロードしたファイル名に置き換えてください。
   - Windows:  
   `UnifiedPluginInstallerAgent.exe /install "C:\Users\ユーザー名\ダウンロード\nijikan.zxp"`
   - Mac:  
   `./UnifiedPluginInstallerAgent --install "/Users/ユーザー名/ダウンロード/nijikan.zxp"`

## 使い方

1. Premiere Proを起動します。
2. メニューの**ウィンドウ**→**エクステンション**→**Nijikan**を選択します。
3. Nijikanのウィンドウが表示されます。
4. **アプリ設定**の**ボイスフォルダ**に、合成音声ファイルの保存先を指定します。
5. VOICEVOXなどの音声合成ソフトのファイル出力設定で、先ほど指定したフォルダを指定します。
6. **キャラクター設定**をクリックします。
7. **キャラクター設定を追加**をクリックします
8. **名前**を入力します。

- 日本語入力がオンの場合、名前を入力しても表示されない場合があります。
- その場合、メモ帳などで名前を入力してからコピー＆ペーストしてください。

9. 音声トラック番号を好みの番号に変更します。

- この番号は、キャラクターごとに設定できます。

10. **字幕MOGRT**を指定します。MOGRTはモーショングラフィックテンプレートの略です。

- 読み込めるのはAfter Effectで作成したモーショングラフィックテンプレートです。
- [サンプルのモーショングラフィックテンプレート](https://github.com/Ouvill/nijikanDoc/releases/tag/untagged-ba3d13fc227a9a6bab36)
  を配布しています。
- [作者のPixivファンボックス](https://qlvyggph.fanbox.cc/)でも配布しています。
- 独自に作成もできます。[モーショングラフィックテンプレートの作成方法](subtitleMogrt.md)も参照してください。

11. 字幕トラック番号を好みの番号に変更します。

- この番号は、キャラクターごとに設定できます。

12. 最低限の設定は以上です。パネルの一番上に戻り、**ボイス監視**を有効にしてください。
13. VOICEVOXなどの音声合成ソフトで音声を生成します。
14. 音声が生成されると、Premiere Proに音声ファイルが取り込まれます。