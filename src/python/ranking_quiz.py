
import json
def ranking(trueCounter,playTime,name):
    json_open = open('./static/json/quiz_ranking.json', 'r',encoding="utf-8")
    json_load = json.load(json_open)
    
    d={'rank':"NULL",'name':name,'trueNum':trueCounter,'time':playTime}
    json_load.append(d)
    
    #print(json_load)
    
    rank=sorted(json_load, key=lambda x: (x['trueNum'],-x['time']), reverse=True)
    
    for i in range(len(json_load)):
        rank[i]['rank']=i+1
    
    #print(json_load)
    with open('./static/json/quiz_ranking.json', 'w') as f:
        json.dump(rank, f, indent=4)