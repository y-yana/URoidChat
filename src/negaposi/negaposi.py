# ネガポジ辞書を読む
import csv
# 形態素解析
from janome.tokenizer import Tokenizer
import os
#a = os.listdir('./')
#print(a)



np_dic = {}
fp = open("./negaposi/pn.csv", "rt", encoding="utf-8")
reader = csv.reader(fp, delimiter='\t')
for i, row in enumerate(reader):
  name = row[0]
  result = row[1]
  np_dic[name] = result
  #if i % 500 == 0: print(i)
#print("ok")



with open('./negaposi/aug.csv', mode='rt', encoding="shift-jis") as inp:
    reader = csv.reader(inp)
    
    aug_dict = {rows[0]:rows[1] for rows in reader}

#print(aug_dict)

np_dic.update(aug_dict)


def negaposi(text):
  tok = Tokenizer()

  # 数える
  res = {"p":0, "n":0, "e":0}
  for t in tok.tokenize(text):
    bf = t.base_form # 基本形
    #print(bf)
    
    # 辞書にあるか確認
    if bf in np_dic:
      r = np_dic[bf]
      print(bf)
      #print(r)
      if r in res:
        res[r] += 1

  # 結果を表示
  #print(res)
  #cnt = res["p"] + res["n"] + res["e"]

  p=res["p"] 
  n=res["n"] 
  print("ポジティブ度", res["p"] )
  print("ネガティブ度", res["n"] )
  return p-n

'''

word = input("なにか話しかけてみてください：")
import requests
import json

# リクエストに必要なパラメーター
headers = {'content-type':'text/json'}
payload = {'utterance':word,
            "username":"マスター",
            "agentState":{"agentName":"サリエリ","tone":"normal", "age":"0歳"},}

# APIKEYの部分は自分のAPI鍵を代入してください
url = 'https://www.chaplus.jp/v1/chat?apikey=60c309a36d313'

# APIを叩く
res = requests.post(url=url, headers=headers, data=json.dumps(payload))

# 最適と思われるレスポンスを抽出
print(res.json()['bestResponse']['utterance'])

text=res.json()['bestResponse']['utterance']

negaposi(word)
negaposi(text)
'''