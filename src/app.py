import yaml
from flask import Flask, render_template, jsonify, request,session,send_from_directory
import json
from python.chat import response
import os
import cv2
import numpy as np
import datetime
import random, string
from threading import Lock
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit, join_room
from engineio.payload import Payload
from negaposi.negaposi import negaposi
from python.image_transform import image_transform
from python.shiritori import shiritori
from python.ranking_quiz import ranking
app = Flask(__name__)

with open('./config.yml', 'r') as yml:
    config = yaml.load(yml)
app.secret_key = config['flask_secret_key']
#app.permanent_session_lifetime = timedelta(minutes=5)
async_mode = None
Payload.max_decode_packets = 50
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()


@app.route('/')
def index():
    #return "Hello World"

    session['user_name'] = 'マスター'
    session['bot_name'] = 'U Roid Chat'
    session['negaposi']=0
    session['np_ALL']=0
    return render_template("index.html", pageTitle='TopPage')

@app.route("/top", methods=["POST"])
def move_top():
    return render_template("index.html", pageTitle='TopPage')


@app.route('/opening', methods=['POST'])
def openingForm():
    getData = request.get_json('postFormData')
    sound = getData['sound']  #boolean
    yourName = getData['yourName'] #str
    AIname = getData['AIname'] #str
    vrmFile = getData['vrmFile'] #str

    print(sound)
    print(yourName)
    print(AIname)
    print(vrmFile)

    return ""


@app.route('/oekaki',methods=["POST"])
def move_oekaki():
    return render_template('draw.html', pageTitle='Oekaki',async_mode=socketio.async_mode)

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

        w=img.shape[1]

        if w>300:
            w=300

        img = cv2.resize(img, dsize=(w, int(w * img.shape[0] / img.shape[1])))

        



        # 保存
        #dt_now = datetime.now().strftime("test") + random_str(5)
        dt_now='image'
        save_path = os.path.join(SAVE_DIR, dt_now + ".png")
        cv2.imwrite(save_path, img)
        #print("save", save_path)
      

        image_transform(save_path)

    return ""

@app.route('/shiritori/ajax/', methods=['POST'])
def shiritori_ajax():
    """ans = request.get_data('postMessage')
    getMessage = ans.decode()"""
    getMessage = request.get_json('postMessage')
    word = getMessage['word']
    defi = getMessage['difficult']

    #print(word,defi)

    #10,8,5
    #est=0.5
    res_shiritori,end_str=shiritori(word,defi)


    #print(res_shiritori,defi)

    #return res_shiritori
    return_json = {
        "res_shiritori": res_shiritori,
        "endstr":end_str
    }
    #print(return_json)

    return jsonify(values=json.dumps(return_json))



@app.route('/quiz/ajax/', methods=['POST'])
def quiz_ajax():
    getMessage = request.get_json('postMessage')
    trueCounter = getMessage['trueCounter']
    playTime = getMessage['playTime']

    #print(trueCounter)
    #print(round(playTime/1000, 2))
    ranking(trueCounter,round(playTime/1000, 2),session['user_name'])

    #return jsonify(values=json.dumps(return_json))
    return ""

#お絵かき
@socketio.event
def my_event(message):
    emit('my_response',
         {'data': message['data']})


@socketio.event
def broadcast_event(message):
    emit('my_response',
         {'data': session['user_name'] + ' : ' + message['data']}, to=message['room'])


@socketio.event
def all_broadcast_event(message):
    emit('send user', message, to=message['room'])


@socketio.event
def clear_room_board(message):
    emit('clear user', to=message['room'])


@socketio.event
def join(message):
    join_room(message['room'])
    emit('my_response',
         {'data': session['user_name']+'さんが入室しました'}, to=message['room'])
#お絵描きここまで

if __name__ == '__main__':
    #port = int(os.environ.get("PORT", 5000))
    #app.run(host="0.0.0.0", port=port)
    app.run()
