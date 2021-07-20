import yaml
from flask import Flask, render_template, jsonify, request,session
import json
from chat import response
import os
import datetime
import random, string
from negaposi.negaposi import negaposi
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
    return render_template("home.html")

@app.route("/index", methods=["POST"])
def move_index():
    return render_template("index.html")

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


if __name__ == '__main__':
    #port = int(os.environ.get("PORT", 5000))
    #app.run(host="0.0.0.0", port=port)
    app.run()
