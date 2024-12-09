from flask import Flask, request, jsonify
import numpy as np
import json
import nltk
import pickle
import os
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer

NLTK_DATA_PATH = os.path.expanduser("~/.nltk_data") 
if not os.path.exists(NLTK_DATA_PATH):
    os.makedirs(NLTK_DATA_PATH)  

nltk.data.path.append(NLTK_DATA_PATH)
if not os.path.exists(os.path.join(NLTK_DATA_PATH, "tokenizers/punkt")):
    nltk.download('punkt', download_dir=NLTK_DATA_PATH)

app = Flask(__name__)

lemmatizer = WordNetLemmatizer()

MODEL_PATH = "model/chatbot_model.h5"
WORDS_PATH = "model/words.pkl"
CLASSES_PATH = "model/classes.pkl"
INTENTS_PATH = "model/merged_dataset.json"

required_files = [MODEL_PATH, WORDS_PATH, CLASSES_PATH, INTENTS_PATH]
missing_files = [f for f in required_files if not os.path.exists(f)]

if missing_files:
    raise FileNotFoundError(f"Missing files: {', '.join(missing_files)}")

try:
    model = load_model(MODEL_PATH)
    print("Model successfully loaded.")
    words = pickle.load(open(WORDS_PATH, 'rb'))
    classes = pickle.load(open(CLASSES_PATH, 'rb'))
    with open(INTENTS_PATH, encoding="utf-8") as file:
        intents = json.load(file)
except Exception as e:
    print(f"Error loading resources: {e}")
    raise

def clean_up_sentence(sentence):
    try:
        sentence_words = nltk.word_tokenize(sentence) 
        sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]  
        return sentence_words
    except Exception as e:
        print(f"Error in clean_up_sentence: {e}")
        raise

def bag_of_words(sentence, words):
    try:
        sentence_words = clean_up_sentence(sentence)
        bag = [0] * len(words)  
        for s in sentence_words:
            for i, w in enumerate(words):
                if w == s:  
                    bag[i] = 1
        return np.array(bag)
    except Exception as e:
        print(f"Error in bag_of_words: {e}")
        raise

def predict_class(sentence, model):
    try:
        bow = bag_of_words(sentence, words)
        if not bow.any(): 
            return [{"intent": "unknown", "probability": "0"}]  

        res = model.predict(np.array([bow]))[0]
        ERROR_THRESHOLD = 0.25 
        results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
        results.sort(key=lambda x: x[1], reverse=True)
        return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

    except Exception as e:
        print(f"Error in predict_class: {e}")
        return [{"intent": "error", "probability": "0"}]

def get_response(intents_list, intents_json):
    if not intents_list:  
        return "Sorry, I don't understand."

    try:
        tag = intents_list[0]["intent"]
        for intent in intents_json["intents"]:
            if intent["tag"] == tag:
                return np.random.choice(intent["responses"])  
    except Exception as e:
        print(f"Error in get_response: {e}")
        raise

    return "Sorry, I don't understand."

@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        
        if data is None:
            return jsonify({"error": "Invalid JSON format or no data provided."}), 400

        message = data.get('message', '').strip()

        if not message:
            return jsonify({"error": "No message provided"}), 400

        predicted_intents = predict_class(message, model)
        response = get_response(predicted_intents, intents)

        print(f"Response: {response}") 

        return jsonify({"response": response})

    except Exception as e:
        print(f"Error during request processing: {e}") 
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)