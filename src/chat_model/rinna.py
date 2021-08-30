

def rinna(word):

  from transformers import T5Tokenizer, AutoModelForCausalLM
  # トークナイザーとモデルの準備
  tokenizer = T5Tokenizer.from_pretrained("rinna/japanese-gpt2-xsmall")
  model = AutoModelForCausalLM.from_pretrained("rinna/japanese-gpt2-xsmall")

  # 推論
  input = tokenizer.encode(word, return_tensors="pt")
  output = model.generate(input, do_sample=True, max_length=15, num_return_sequences=1)
  res=tokenizer.batch_decode(output)

  res=res[0].split('</s>')[-1]
  return res