import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMSchema } from '@pixiv/three-vrm'
import { getConstantValue, updateArrayBindingPattern } from 'typescript';

window.addEventListener("DOMContentLoaded", () => {
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

  $(document).on('click', '#modelChange', function () {
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
  })

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

  // シーンの設定
  const scene = new THREE.Scene()
  sceneOption()

  function sceneOption() {
    // ライトの設定
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1).normalize()
    scene.add(light)

    // グリッドを表示
    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)
    gridHelper.visible = true

    // 座標軸を表示
    const axesHelper = new THREE.AxesHelper(0.5)
    scene.add(axesHelper)
  }

  // VRMの読み込み
  let mixer: any
  const loader = new GLTFLoader()
  newLoad()

  function newLoad() {
    loader.load(modelPass,
      (gltf) => {
        VRM.from(gltf).then((vrm) => {
          // シーンへの追加
          scene.add(vrm.scene)
          vrm.scene.rotation.y = Math.PI
          setupAnimation(vrm)
        })
      }
    )
  }

  // http → str
  const http2str = (url: string) => {
    try {
      let request = new XMLHttpRequest()
      request.open("GET", url, false)
      request.send(null)
      if (request.status == 200 && request.readyState == 4) {
        return request.responseText.trim()
      }
    } catch (e) {
      console.log(e)
    }
    return ""
  }

  // CSV → hierarchy
  const csv2hierarchy = (csv: string, fps: number) => {
    // 文字列 → 配列
    let lines = csv.trim().split('\n')
    let data: number[][] = []
    for (let j = 0; j < lines.length; j++) {
      data[j] = []
      let strs = lines[j].split(',')
      for (let i = 0; i < 55 * 4; i++) {
        data[j][i] = Number(strs[i])
      }
    }
    // 配列 → hierarchy
    let hierarchy = []
    for (let i = 0; i < 55; i++) {
      let keys = []
      for (let j = 0; j < data.length; j++) {
        keys[j] = {
          rot: new THREE.Quaternion(-data[j][i * 4], -data[j][i * 4 + 1], data[j][i * 4 + 2], data[j][i * 4 + 3]).toArray(),
          time: fps * j
        }
      }
      hierarchy[i] = { 'keys': keys }
    }
    //vroid用のsplice
    hierarchy.splice(23, 1)

    return hierarchy
  }

  // アニメーションの設定
  const setupAnimation = (vrm: any) => {
    // ボーンリストの生成
    //const bones = ["hips","leftUpperLeg","rightUpperLeg","leftLowerLeg","rightLowerLeg","leftFoot","rightFoot","spine","chest","neck","head","leftShoulder","rightShoulder","leftUpperArm","rightUpperArm","leftLowerArm","rightLowerArm","leftHand","rightHand","leftToes","rightToes","leftEye","rightEye","jaw","leftThumbProximal","leftThumbIntermediate","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbProximal","rightThumbIntermediate","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal","upperChest"]
    const bones = ["hips", "leftUpperLeg", "rightUpperLeg", "leftLowerLeg", "rightLowerLeg", "leftFoot", "rightFoot", "spine", "chest", "neck", "head", "leftShoulder", "rightShoulder", "leftUpperArm", "rightUpperArm", "leftLowerArm", "rightLowerArm", "leftHand", "rightHand", "leftToes", "rightToes", "leftEye", "rightEye", "leftThumbProximal", "leftThumbIntermediate", "leftThumbDistal", "leftIndexProximal", "leftIndexIntermediate", "leftIndexDistal", "leftMiddleProximal", "leftMiddleIntermediate", "leftMiddleDistal", "leftRingProximal", "leftRingIntermediate", "leftRingDistal", "leftLittleProximal", "leftLittleIntermediate", "leftLittleDistal", "rightThumbProximal", "rightThumbIntermediate", "rightThumbDistal", "rightIndexProximal", "rightIndexIntermediate", "rightIndexDistal", "rightMiddleProximal", "rightMiddleIntermediate", "rightMiddleDistal", "rightRingProximal", "rightRingIntermediate", "rightRingDistal", "rightLittleProximal", "rightLittleIntermediate", "rightLittleDistal", "upperChest"]
    const boneNode = []
    for (let i = 0; i < bones.length; i++) {
      boneNode[i] = vrm.humanoid.getBoneNode(bones[i])
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

    // AnimationClipの生成
    const clip = THREE.AnimationClip.parseAnimation({
      hierarchy: csv2hierarchy(http2str(posepass), 200)
    }, boneNode)

    // トラック名の変更
    clip.tracks.some((track) => {
      track.name = track.name.replace(/^\.bones\[([^\]]+)\].(position|quaternion|scale)$/, '$1.$2')
    })

    if (facemode == "fun") {
      vrm.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Fun, 0.5)
      vrm.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.I, 0.11)
      vrm.blendShapeProxy.update()
    }
    if (facemode == "sad") {
      vrm.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Angry, 0.22)
      vrm.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Sorrow, 0.43)
      vrm.blendShapeProxy.update()
    }

    // AnimationMixerの生成と再生
    mixer = new THREE.AnimationMixer(vrm.scene)

    // AnimationActionの生成とアニメーションの再生
    let action = mixer.clipAction(clip)
    action.play()
  }
  let lastTime = (new Date()).getTime()

  // フレーム毎に呼ばれる
  const update = () => {
    requestAnimationFrame(update)

    var facecheck = <HTMLInputElement>document.getElementById('facecheckbool');
    if (facecheck.value == '1') {
      scene.remove.apply(scene, scene.children);
      sceneOption()
      newLoad();
      (<HTMLInputElement>document.getElementById('facecheckbool')).value = '0';
    }

    // 時間計測
    let time = (new Date()).getTime()
    let delta = time - lastTime;

    // アニメーションの定期処理
    if (mixer) {
      mixer.update(delta)
    }

    // 最終更新時間
    lastTime = time;

    // レンダリング
    renderer.render(scene, camera)
  }
  update()
})
