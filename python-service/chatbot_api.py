# from flask import Flask, request, jsonify
# import pickle
# import pandas as pd
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # To allow requests from your React frontend

# # Load the trained model
# with open('./fitness_multioutput_model.pkl', 'rb') as f:
#     model = pickle.load(f)

# @app.route('/predict', methods=['POST'])
# def predict():
#     print("Hit the predict endpoint")
#     input_data = request.json
#     print(f"Received data: {input_data}")  # Log the received data
#     # result = model.predict(input_data)
#     # print(f"Prediction result: {result}")  # Log the prediction result
#     return jsonify({"response": input_data})


# if __name__ == '__main__':
#     app.run(port=5000)
    
from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
from train import predict_full_recommendation  # Import the utility function

app = Flask(__name__)
CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict():
#     input_data = request.json
#     print(f"Received input data: {input_data}")  # Log the input data
#     user_query = input_data.get("query", "").lower()
#     user_metrics = input_data.get("metrics", {})
    
#     prediction = predict_full_recommendation(user_metrics)

#     if "diet" in user_query:
#         return jsonify({"response": f"Diet Plan for {prediction['Fitness Goal']}: {prediction['Diet']}"})
#     elif "exercise" in user_query or "workout" in user_query:
#         return jsonify({"response": f"Exercise Plan for {prediction['Fitness Goal']}: {prediction['Exercises']}"})
#     elif "recommendation" in user_query:
#         return jsonify({"response": f"Recommendation for {prediction['Fitness Goal']}: {prediction['Recommendation']}"})
#     else:
#         return jsonify({"response": prediction})  # Full output

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
                "Would you like to know your **Diet Plan**, **Exercise Plan**, or a **Recommendation**?"
            )
        })

if __name__ == '__main__':
    app.run(port=5000)
    

