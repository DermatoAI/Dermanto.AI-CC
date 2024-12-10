# app.py
from flask import Flask, request, jsonify
import numpy as np
import json
import pickle
import os
from tensorflow.keras.models import load_model

app = Flask(__name__)

<<<<<<< HEAD
# Define paths for models and data
=======
lemmatizer = WordNetLemmatizer()

>>>>>>> 14fca7542d11addcf8f3277c382d096f29520c9f
MODEL_PATH = os.path.join(os.getcwd(), "model/chatbot_model.h5")
WORDS_PATH = os.path.join(os.getcwd(), "model/words.pkl")
CLASSES_PATH = os.path.join(os.getcwd(), "model/classes.pkl")
INTENTS_PATH = os.path.join(os.getcwd(), "model/merged_dataset.json")

# Check if required files exist
required_files = [MODEL_PATH, WORDS_PATH, CLASSES_PATH, INTENTS_PATH]
missing_files = [f for f in required_files if not os.path.exists(f)]

if missing_files:
    raise FileNotFoundError(f"Missing files: {', '.join(missing_files)}")

# Load model and resources
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
<<<<<<< HEAD
    """Clean and prepare the sentence for model prediction."""
    # Simple tokenization by splitting sentence by spaces
    return sentence.lower().split()

def bag_of_words(sentence, words):
    """Convert sentence into bag of words representation."""
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
    return np.array(bag)
=======
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
        print(f"Bag of words for '{sentence}': {bag}")
        return np.array(bag)
    except Exception as e:
        print(f"Error in bag_of_words: {e}")
        raise
>>>>>>> 14fca7542d11addcf8f3277c382d096f29520c9f

def predict_class(sentence, model):
    """Predict class of the given sentence."""
    bow = bag_of_words(sentence, words)
    if not bow.any():  # Return 'unknown' if no valid words found
        return [{"intent": "unknown", "probability": "0"}]

<<<<<<< HEAD
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]
=======
        res = model.predict(np.array([bow]))[0]
        ERROR_THRESHOLD = 0.25 
        results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
        results.sort(key=lambda x: x[1], reverse=True)
        print(f"Prediction results: {results}") 
        return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]
    except Exception as e:
        print(f"Error in predict_class: {e}")
        return [{"intent": "error", "probability": "0"}]
>>>>>>> 14fca7542d11addcf8f3277c382d096f29520c9f

def get_response(intents_list, intents_json):
    """Get a response from the intents."""
    if not intents_list:
        return "Sorry, I don't understand."
<<<<<<< HEAD
    tag = intents_list[0]["intent"]
    for intent in intents_json["intents"]:
        if intent["tag"] == tag:
            return np.random.choice(intent["responses"])
=======
    try:
        tag = intents_list[0]["intent"]
        for intent in intents_json["intents"]:
            if intent["tag"] == tag:
                return np.random.choice(intent["responses"])  
    except Exception as e:
        print(f"Error in get_response: {e}")
        raise
>>>>>>> 14fca7542d11addcf8f3277c382d096f29520c9f
    return "Sorry, I don't understand."

@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()

        if not message:
            return jsonify({"error": "No message provided"}), 400

        predicted_intents = predict_class(message, model)
        print(f"Predicted intents: {predicted_intents}")

<<<<<<< HEAD
=======
        response = get_response(predicted_intents, intents)
        print(f"Response: {response}") 

>>>>>>> 14fca7542d11addcf8f3277c382d096f29520c9f
        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port=8080, debug=True)
