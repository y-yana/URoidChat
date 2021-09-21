import pandas as pd
from random import random

def trans(strj):
    moji = str.maketrans("ぁぃぅぇぉっゃゅょ", "あいうえおつやゆよ")
    return strj.translate(moji)

def shiritori(word,defi):
  word=trans(word)
  #伸ばし棒の除去
  if word[-1]=="-"or word[-1]=="ー":
    word=word[:-1]

  if defi=='10':
    est=0.9
  elif defi=='8':
    est=0.95
  else:
    est=0.997

  if word[-1]=="ん":
    return ""

  else:
    df2=pd.read_csv("./static/shiritori/vocab.csv")
    #print(est)
    if est>random():

      
      res=df2[df2["WEBJRGA"].str.startswith(str(word[-1]))]
      res=res[~res["WEBJRGA"].str.endswith("ん")].sample(n=1)
      r=str(res["WEBJRGA"].values[0])
      #print("勝ち")

 
    else:
      res=df2[df2["WEBJRGA"].str.startswith(str(word[-1]))]
      res=res[res["WEBJRGA"].str.endswith("ん")].sample(n=1)
      r=str(res["WEBJRGA"].values[0])
      #print("負け")



    return r,trans(r[-1])