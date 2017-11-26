// 全ファイル読み込み終了時の処理
function handleComplete() {
  for (var i = 0; i < assets.length; i++) {
    var event = assets[i];
    var id = event.item.id;
    var result = event.result;

    // x、y、nameをセットする無名関数
    var xynameSet = function(obj, x, y, name) {
      obj.x = x * ZOOM_MAGNI;
      obj.y = y * ZOOM_MAGNI;
      obj.name = name;
    };

    switch (id) {
      case "spritesheet_char":
        spriteSheetChar = new createjs.SpriteSheet({
            framerate: 12,
            "images": [result],
            "frames": {width:CHAR_W_ZOOM, height:CHAR_H_ZOOM, regY:0, regX:0, spacing:CHAR_SPACING, margin:CHAR_MARGIN},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
              // サバちゃん
              "saba_run": {
                // ダッシュの1/2のスピード
                frames: [0,0,1,1]
              },
              "saba_dash": [0, 1],
              "saba_jump": [1],
              "saba_damage": [2],
              "saba_down": [3],
              // バッグちゃん
              "bag_run": {
                // ダッシュの1/2のスピード
                frames: [4,4,5,5]
              },
              "bag_dash": [4, 5],
              "bag_jump": [5],
              "bag_damage": [6],
              "bag_down": [7]
            }
          });
        spriteChar = new createjs.Sprite(spriteSheetChar, friendsList[activeFriends]['name']+"_run");// 初期値はrun(走る)
        spriteChar.subX = (STAGE_W / 2) - (CHAR_W / 2);// 画面中央 - キャラサイズ半分分ずらす
        spriteChar.baseX = spriteChar.subX;
        spriteChar.baseY = GROUND_LINE - CHAR_H;//
        xynameSet(spriteChar, spriteChar.baseX, spriteChar.baseY, 'spriteChar');
        baseContainer.addChild(spriteChar);
        break;
    }
  }
  statusGame = 1;// 処理開始

  // デバッグ用表示エリア
  var shape = new createjs.Shape();
  shape.graphics.beginFill("DarkRed"); // 赤色で描画するように設定
  shape.graphics.drawRect(0, STAGE_H - 20, 80, 20); // 長方形を描画
  shape.graphics.alpha = 0.5;
  debugContainer.addChild(shape); // 表示リストに追加
  debugText = new createjs.Text("debug","","#ffffff");
  debugText.x = 0 + 5;
  debugText.y = STAGE_H - 20 + 5;
  debugContainer.addChild(debugText);

  // debugText.text = dispW+':'+dispH;
  // debugText.text = 1+':'+2;
  handleResize();
}
