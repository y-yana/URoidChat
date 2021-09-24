#word = input("なにか話しかけてみてください：")
import yaml
import requests
import json
import random

def response(word,u_name,b_name,in_np,np_ALL,npi):
    with open('./config.yml', 'r') as yml:
        config = yaml.load(yml)

    print(in_np)
    print(np_ALL)
    print(npi)

    suki=['すき','好き']
    kirai=['きらい','嫌い','バカ','馬鹿','ばか']


    if in_np>=2 and word in suki:
        return f'わたしも{u_name}のこと好きだよ'
    if np_ALL>=3 and word == 'かわいい':
        return 'えへへ...うれしいな'

    if np_ALL>=3 and word in kirai:
        r=['えっ...','うそだぁー','傷つくなぁ','ぴえん']
        return random.choice(r)

    if np_ALL<-1 and word in kirai:
        r=['えーん...','泣いちゃう',1]
        f=random.choice(r)
        if f!=1:
            return f

    if np_ALL<-2 and npi<0:
        flag=[1,2,3,4]
        f=random.choice(flag)
        if f==1:
            return 'すねちゃうよ？'

    if np_ALL>4 and npi>0:
        flag=[1,2,3,4]
        f=random.choice(flag)
        if f==1:
            return 'そんなこと言ったって喜ばないんだからね！'

    if word=='うん':
        return 'うん！'

    if word=="クレジット":
        return "フロントエンド:柳田祐奈\n　バックエンド:池田柳之介\n　インフラ,3D:國司礼言\n　　Voice:みかたま"


    if in_np<-2:
        return f'{u_name}のばか...'





    # リクエストに必要なパラメーター
    headers = {'content-type':'text/json'}
    payload = {'utterance':word,
                "username":u_name,
                "agentState":{"agentName":b_name,"tone":"normal", "age":"0歳"},
                "addition" :{"ngwords":['きたないなー']}
                }

    print(u_name)

    # APIKEYの部分は自分のAPI鍵を代入してください
    url = config['chat_api_key']

    # APIを叩く
    res = requests.post(url=url, headers=headers, data=json.dumps(payload))

    # 最適と思われるレスポンスを抽出
    #print(res.json()['bestResponse']['utterance'])

    return(res.json()['bestResponse']['utterance'])

#print(response('おはよう'))
