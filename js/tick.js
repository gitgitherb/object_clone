// 1/30秒毎に実行される
function tick(event) {
  // 画像がすべて読み込まれてから実行する。
  if (statusGame > 0) {

    for (var i = 0; i < baseContainer.children.length; i++) {
      baseContainer.children[i].x = baseContainer.children[i].baseX * ZOOM_MAGNI;
      baseContainer.children[i].y = baseContainer.children[i].baseY * ZOOM_MAGNI;
    }
  }
  // statusGame = -1;// 1回の処理でアプリを止めます。

  stage.update(event); // important!!
}
