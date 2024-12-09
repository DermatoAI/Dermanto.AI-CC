from flask import Flask, request, jsonify
import numpy as np
import json
import nltk
import pickle
import os
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')

app = Flask(__name__)

lemmatizer = WordNetLemmatizer()

MODEL_PATH = "model/chatbot_model.h5"
WORDS_PATH = "model/words.pkl"
CLASSES_PATH = "model/classes.pkl"
INTENTS_PATH = "model/merged_dataset.json"

try:
    model = load_model(MODEL_PATH)
    words = pickle.load(open(WORDS_PATH, 'rb'))
    classes = pickle.load(open(CLASSES_PATH, 'rb'))
    with open(INTENTS_PATH, encoding="utf-8") as file:
        intents = json.load(file)
except Exception as e:
    print(f"Error loading resources: {e}")
    raise

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence) 
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]  
    return sentence_words

def bag_of_words(sentence, words):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)  
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:  
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence, model):
    bow = bag_of_words(sentence, words)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25 
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)  
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

def get_response(intents_list, intents_json):
    if not intents_list:  
        return "Sorry, I don't understand."

    tag = intents_list[0]["intent"]
    for intent in intents_json["intents"]:
        if intent["tag"] == tag:
            return np.random.choice(intent["responses"])  

    return "Sorry, I don't understand."

# Endpoint untuk chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    try:
        data = request.json
        message = data.get('message', '').strip()

        if not message:
            return jsonify({"error": "No message provided"}), 400

        predicted_intents = predict_class(message, model)
        response = get_response(predicted_intents, intents)

        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Menjalankan server Flask
if __name__ == '__main__':
    app.run(debug=True, port=3000)
