
import requests
import json

def chaplus_API(word,u_name,b_name,url):
    # リクエストに必要なパラメーター
    headers = {'content-type':'text/json'}
    payload = {'utterance':word,
                "username":u_name,
                "agentState":{"agentName":b_name,"tone":"normal", "age":"0歳"},
                "addition" :{"ngwords":['きたないなー']}
                }

    print(u_name)

    # APIKEYの部分は自分のAPI鍵を代入してください
    #url = config['chat_api_key']

    # APIを叩く
    res = requests.post(url=url, headers=headers, data=json.dumps(payload))

    

    return res.json()['bestResponse']['utterance']