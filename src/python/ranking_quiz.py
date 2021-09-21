
import json
def ranking(trueCounter,playTime,name,quiz_name):
    json_open = open(f'./static/json/quiz_ranking_{quiz_name}.json', 'r',encoding="utf-8")
    json_load = json.load(json_open)

    d={'rank':"NULL",'name':name,'trueNum':trueCounter,'time':playTime}
    json_load.append(d)
    print(trueCounter)
    print(name)

    #print(json_load)

    rank=sorted(json_load, key=lambda x: (x['trueNum'],-x['time']), reverse=True)

    for i in range(len(json_load)):
        rank[i]['rank']=i+1

    rank=rank[:7]

    """#print(json_load)"""
    with open(f'./static/json/quiz_ranking_{quiz_name}.json', 'w') as f:
        json.dump(rank, f, indent=4)

    return rank
