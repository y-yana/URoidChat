import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { reduceEachLeadingCommentRange } from 'typescript';

// canvasサイズの制御
  // 表示用のサイズを格納する変数
  var newWidth
  var newHeight

  // 画面サイズを取得
  var getWidth = window.innerWidth;
  var getHeight = window.innerHeight;

  // レスポンシブ対応
  if (getWidth <= 950) {
    // 比率計算(mobile)
    newWidth = Math.floor(getWidth * 0.8)
    newHeight = Math.floor(getHeight * 0.8)
    // #chatAreaの高さを設定
    var chatArea = document.getElementById('chatArea')
    chatArea!.style.height = '16rem'
    var setting = document.getElementById('setting')
    setting!.style.display = 'none'
  } else {
    // 比率計算(desktop)
    newWidth = Math.floor(getWidth * (2 / 5))
    newHeight = Math.floor(getHeight * (5 / 7))
    // #chatAreaの高さを設定
    var chatArea = document.getElementById('chatArea')
    chatArea!.style.height = newHeight + 'px'
  }
    // canvas生成
    var modelArea = document.getElementById('modelArea');
    modelArea!.innerHTML = '<canvas id="canvas" width="' + newWidth + 'px" height="' + newHeight + 'px"></canvas>';
  
    // 初期値
    var modelPass = '../static/base_model/base.vrm';
    //var posepass = '../static/pose/suneru.csv';
    var posepass = '../static/pose/hellovrm.csv';
    var facemode = "normal";

    /*$(document).on('click', '#modelChange', function () {
      // pathの受け取り
      var path = <HTMLInputElement>document.getElementById("modelChange");
  
      modelPass = path.value;
      posepass = '../static/pose/anim2.csv'
  
      // 現在のモデルを削除
      scene.remove.apply(scene, scene.children);
  
      // 再描画
      sceneOption()
      newLoad()
      update()
    })*/

  // レンダラーの設定
  var canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: <HTMLCanvasElement>document.querySelector('#canvas'),
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    35,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 1, 4)

  // カメラコントロールの設定
  if (getWidth > 950) {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.85, 0)
    controls.screenSpacePanning = true
    controls.update()
  }
  var NP = <HTMLInputElement>document.getElementById('NPscript');
  var ALL_NP = <HTMLInputElement>document.getElementById('ALL_NPscript');
  var message = <HTMLInputElement>document.getElementById('base_message');
  if (Number(NP.value) > 0 && Number(ALL_NP.value) <= 1) {
    facemode = "fun"
  }
  if (Number(NP.value) < 0 && Number(ALL_NP.value) >= -1) {
    facemode = "sad"
  }
  if (Number(ALL_NP.value) > 0) {
    posepass = '../static/pose/cats.csv'
  }
  if (Number(ALL_NP.value) < 0) {
    posepass = '../static/pose/hands.csv'
  }
  if (Number(ALL_NP.value) <= -3) {
    posepass = '../static/pose/suneru.csv'
  }
  if (message.value == '1') {
    posepass = '../static/pose/ozigi.csv';
    (<HTMLInputElement>document.getElementById('base_message')).value = '0';
  }

/// <reference path="index.ts"/>
//import modelLoad = module("index");
//modelLoad.modelLib.modelLoad(modelPass,facemode,posepass,renderer,camera);