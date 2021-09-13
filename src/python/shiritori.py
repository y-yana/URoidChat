import pandas as pd

def shiritori(end_word):
  if end_word=="ん":
    return ""

  else:
    df2=pd.read_csv("./static/shiritori/vocab.csv")
    res=df2[df2["WEBJRGA"].str.startswith(str(end_word))].sample(n=1)
    res["WEBJRGA"].values[0]

    return str(res["WEBJRGA"].values[0])