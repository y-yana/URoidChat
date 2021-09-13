import yaml
from flask import Flask, render_template, jsonify, request,session,send_from_directory
import json
from python.chat import response
import os
import cv2
import numpy as np
import datetime
import random, string
from negaposi.negaposi import negaposi
from python.image_transform import image_transform
from python.shiritori import shiritori
from python.ranking_quiz import ranking
app = Flask(__name__)

with open('./config.yml', 'r') as yml:
    config = yaml.load(yml)
app.secret_key = config['flask_secret_key']
#app.permanent_session_lifetime = timedelta(minutes=5)

@app.route('/')
def index():
    #return "Hello World"

    session['user_name'] = 'マスター'
    session['bot_name'] = 'U Roid Chat'
    session['negaposi']=0
    session['np_ALL']=0
    return render_template("index.html", pageTitle='TopPage')

@app.route("/chat", methods=["POST"])
def move_chat():
    return render_template("chat.html", pageTitle='URoidChat')

@app.route("/shiritori", methods=["POST"])
def move_shiritori():
    return render_template("shiritori.html", pageTitle='Shiritori')

@app.route("/quiz", methods=["POST"])
def move_quiz():
    return render_template("quiz.html", pageTitle='Quiz')

@app.route("/nigaoe", methods=["POST"])
def move_nigaoe():
    return render_template("nigaoe.html", pageTitle='Nigaoe')

@app.route('/rename', methods=['POST'])
def rename():
    session['user_name'] = request.form['user_name']
    session['bot_name'] = request.form['bot_name']

    print(session['user_name'])
    print(session['bot_name'])

    #return render_template("chat.html")
    return ""


# /showにPOSTリクエストが送られたら処理してJSONを返す
@app.route('/show', methods=['POST'])
def show():
    u_name=session['user_name']
    b_name=session['bot_name']

    np_ALL=session['np_ALL']



    npi=negaposi(request.form['chatMessage'])
    session['negaposi']+=npi
    if npi==0 and session['negaposi']>0:
        session['negaposi']-=1
    if npi==0 and session['negaposi']<0:
        session['negaposi']+=1

    #print('in_nage',session['negaposi'])


    res = response(request.form['chatMessage'],u_name,b_name,session['negaposi'],np_ALL,npi)

    npo=negaposi(res)

    #print(npi)
    #print(npo)
    NP=npi+npo

    session['np_ALL']+=NP


    return_json = {
        "message": res,
        "NP":NP,
        "ALL_NP":session['negaposi']
    }

    return jsonify(values=json.dumps(return_json))


@app.route('/upload', methods=['POST'])
def upload():
    the_file = request.files['the_file']

    model_dir='./static/models/'
    model_files = os.listdir(model_dir)
    model_files.sort()
    print(model_files)
    if len(model_files)>=7:
        os.remove(model_dir+model_files[0])

    now = datetime.datetime.now()
    file_name = '{0:%d%H%M%S}'.format(now)

    path=f'./static/models/{file_name}.vrm'
    the_file.save(path)


    return_json = {
        "path": path
    }

    return jsonify(values=json.dumps(return_json))


SAVE_DIR = "./static/images/nigaoe"
if not os.path.isdir(SAVE_DIR):
    os.mkdir(SAVE_DIR)

@app.route('/images/<path:path>')
def send_js(path):
    return send_from_directory(SAVE_DIR, path)

@app.route('/img', methods=['POST'])
def upload_img():
    if request.files['image']:
        # 画像として読み込み
        stream = request.files['image'].stream
        img_array = np.asarray(bytearray(stream.read()), dtype=np.uint8)
        img = cv2.imdecode(img_array, 1)



        # 保存
        #dt_now = datetime.now().strftime("test") + random_str(5)
        dt_now='image'
        save_path = os.path.join(SAVE_DIR, dt_now + ".png")
        cv2.imwrite(save_path, img)
        print("save", save_path)
        print("ok----------------")

        image_transform(save_path)

    return ""


@app.route('/shiritori/ajax/', methods=['POST'])
def shiritori_ajax():
    ans = request.get_data('postMessage')
    getMessage = ans.decode()
    print(getMessage)
    res_shiritori=shiritori(getMessage)
    print(res_shiritori)

    '''
    ・ユーザーが入力した単語の最後の1文字(ひらがな)を投げてます
    ・受け取った文字から始まる単語をひらがなで返してほしいです
    ・AIが返した単語の重複チェックやAIが負けた場合の処理はフロント側で実装する予定です(たぶん)(がんばる)
    '''
    return res_shiritori


@app.route('/quiz/ajax/', methods=['POST'])
def quiz_ajax():
    '''
    受信するjsonデータ↓
    {
        trueCounter: this.trueCounter, // 正解数(0~10)
        playTime: this.resultTime //かかった時間(単位はミリ秒)
    }
    ・かかった時間は単位を秒に変えて、小数点第三位を四捨五入して欲しいです
    ・「正解数＞かかった時間」の優先度で順位のソート＆ jsonの書き換えをお願いします
    '''

    # test用なので消して大丈夫です
    return_json = {
        "rankingData": 'Ranking!!'
    }

    '''
    ・jsonの保存先は、src/static/json の中で、フォーマットは↓のようにお願いします
    [
        {"id": 1, "name": "うどん", "trueNum": 10, "time": 32.12},
        {"id": 2, "name": "そば", "trueNum": 10, "time": 33.45},
    〜中間省略〜
        {"id": 7, "name": "らーめん", "trueNum": 8, "time": 46.38}
    ]
    id = 順位
    name = ニックネーム
    trueNum = 正解数
    time = かかった時間
    '''

    getMessage = request.get_json('postMessage')
    trueCounter = getMessage['trueCounter']
    playTime = getMessage['playTime']

    print(trueCounter)
    print(round(playTime/1000, 2))
    ranking(trueCounter,round(playTime/1000, 2),"test")

    return jsonify(values=json.dumps(return_json))


if __name__ == '__main__':
    #port = int(os.environ.get("PORT", 5000))
    #app.run(host="0.0.0.0", port=port)
    app.run()
