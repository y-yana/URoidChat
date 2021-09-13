import pandas as pd
from random import random

def shiritori(word,est):
  if word[-1]=="ん":
    return ""
    
  else:
    df2=pd.read_csv("./static/shiritori/vocab.csv")

    if est>random():

      
      res=df2[df2["WEBJRGA"].str.startswith(str(word[-1]))]
      res=res[~res["WEBJRGA"].str.endswith("ん")].sample(n=1)
      res["WEBJRGA"].values[0]
      #print("勝ち")

 
    else:
      res=df2[df2["WEBJRGA"].str.startswith(str(word[-1]))]
      res=res[res["WEBJRGA"].str.endswith("ん")].sample(n=1)
      res["WEBJRGA"].values[0]
      #print("負け")

    return str(res["WEBJRGA"].values[0])