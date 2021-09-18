//アップロードした画像の表示
document.getElementById('file-sample').addEventListener('change', function (e) {
  // 1枚だけ表示する
  var file = e.target.files[0];

  // ファイルのブラウザ上でのURLを取得する
  var blobUrl = window.URL.createObjectURL(file);

  // img要素に表示
  var img = document.getElementById('file-preview');
  img.src = blobUrl;

  var img = document.getElementById('file-preview');
  img.style.display = 'block';
});
