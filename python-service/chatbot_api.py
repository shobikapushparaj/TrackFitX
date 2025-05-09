
from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
from train import predict_full_recommendation

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json
    print(f"Received input data: {input_data}")
    user_query = input_data.get("query", "").lower()
    user_metrics = input_data.get("metrics", {})
    
    prediction = predict_full_recommendation(user_metrics)

    if "diet" in user_query:
        return jsonify({
    "response": (
        f"Your fitness goal is **{prediction['Fitness Goal']}**.\n\n"
        f"Here is your **Diet Plan**:\n{prediction['Diet']}"
         )
         })

    elif "exercise" in user_query or "workout" in user_query:
        return jsonify({"response": f"Exercise Plan for {prediction['Fitness Goal']}: {prediction['Exercises']}"})
    elif "recommendation" in user_query:
        return jsonify({"response": f"Recommendation for {prediction['Fitness Goal']}: {prediction['Recommendation']}"})
    else:
        return jsonify({
            "response": (
                "I can help you with a personalized fitness plan. "
                "What Would you like to know your **Diet Plan**, **Exercise Plan**, or a **Recommendation**?"
            )
        })

if __name__ == '__main__':
    app.run(port=5000)
    

