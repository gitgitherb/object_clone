// bodyのonloadから呼び出される。
function init() {
  stage = new createjs.Stage("testCanvas");

  baseContainer = new createjs.Container();
  stage.addChild(baseContainer);
  debugContainer = new createjs.Container();
  if (debagMode) {
    stage.addChild(debugContainer);
  }
  // マスク用シェイプ
  maskShape = new createjs.Shape();
  maskShape.graphics.beginFill("black");
  maskShape.graphics.drawRect(0, 0, STAGE_W_ZOOM, STAGE_H_ZOOM);// 長方形
  baseContainer.mask = maskShape;

  statusGame = 0;// 画像の読み込みが終了するまで処理しない。
  statusFriends = 'run';//
  jumpPower = 0;
  scrollSpeed = 3;// デフォルトはサバちゃんの移動スピード

  assets = [];
  // 読み込む外部ファイル情報
  manifest = [
    {src: IMAGE_PATH+"spritesheet_char.png", id: "spritesheet_char"},
  ];
  // プリロードの準備
  var loader = new createjs.LoadQueue();
  // createjs.Sound.alternateExtensions = ["mp3"];// なくても鳴るけど一応書いておく
  loader.installPlugin(createjs.Sound);// 必要らしい
  loader.on("fileload", handleFileLoad);// 読み込み開始時の処理？必要ないかも
  loader.on("complete", handleComplete);// 全ファイル読み込み終了時の処理
  loader.loadManifest(manifest);

  // リサイズイベントを検知してリサイズ処理を実行
  window.addEventListener("resize", handleResize);
  handleResize(); // 起動時にもリサイズしておく

  // タッチ操作をサポートしているブラウザーならば
  if (createjs.Touch.isSupported() == true) {
     // タッチ操作を有効にします。
     createjs.Touch.enable(stage)
  }

  // マウスイベントの登録
  stage.addEventListener("click", handleClick);
  // stage.addEventListener("dblclick", handleDblclick);

  // onはaddEventListenerの省略版？
  createjs.Ticker.on("tick", tick);
  createjs.Ticker.setFPS(30);
}
