import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.multioutput import MultiOutputClassifier
from sklearn.ensemble import RandomForestClassifier
import pickle

# -----------------------
# 1. Load Dataset
# -----------------------
df = pd.read_excel('gym recommendation (1).xlsx', sheet_name='Sheet1')

# -----------------------
# 2. Encode Categorical Columns
# -----------------------
label_encoders = {}
for col in ['Sex', 'Hypertension', 'Diabetes', 'Level', 'Fitness Goal', 'Recommendation', 'Diet', 'Exercises']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# -----------------------
# 3. Define Features (X) and Targets (Y)
# -----------------------
X = df[['Sex', 'Age', 'Height', 'Weight', 'Hypertension', 'Diabetes', 'BMI', 'Level']]
y = df[['Fitness Goal', 'Recommendation', 'Diet', 'Exercises']]

# -----------------------
# 4. Train/Test Split
# -----------------------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# -----------------------
# 5. Build and Train Multi-Output Model
# -----------------------
base_model = RandomForestClassifier(n_estimators=100, random_state=42)
model = MultiOutputClassifier(base_model)
model.fit(X_train, y_train)

# -----------------------
# 6. Save Model and Encoders
# -----------------------
with open('fitness_multioutput_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('label_encoders_multi.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)

print("✅ Model and Encoders saved successfully!")

# -----------------------
# 7. Define Utility Functions
# -----------------------

def calculate_bmi(weight, height):
    return weight / (height ** 2)

def determine_level(bmi):
    if bmi < 18.5:
        return 'Underweight'
    elif 18.5 <= bmi < 25:
        return 'Normal'
    elif 25 <= bmi < 30:
        return 'Overweight'
    else:
        return 'Obese'

# def predict_full_recommendation(user_input):
#     # Load model and encoders
#     with open('fitness_multioutput_model.pkl', 'rb') as f:
#         model = pickle.load(f)
    
#     with open('label_encoders_multi.pkl', 'rb') as f:
#         label_encoders = pickle.load(f)
    
#     # Calculate BMI and Level
#     height = user_input['Height']
#     weight = user_input['Weight']
#     bmi = calculate_bmi(weight, height)
#     level = determine_level(bmi)

#     # Prepare input DataFrame
#     data = {
#         'Sex': user_input['Sex'],
#         'Age': user_input['Age'],
#         'Height': height,
#         'Weight': weight,
#         'Hypertension': user_input['Hypertension'],
#         'Diabetes': user_input['Diabetes'],
#         'BMI': bmi,
#         'Level': level
#     }
    
#     input_df = pd.DataFrame([data])

#     # Encode categorical columns
#     for col in ['Sex', 'Hypertension', 'Diabetes', 'Level']:
#         input_df[col] = label_encoders[col].transform(input_df[col])

#     # Predict
#     prediction = model.predict(input_df)
#     prediction = prediction[0]

#     # Decode predictions
#     fitness_goal = label_encoders['Fitness Goal'].inverse_transform([prediction[0]])[0]
#     recommendation = label_encoders['Recommendation'].inverse_transform([prediction[1]])[0]
#     diet = label_encoders['Diet'].inverse_transform([prediction[2]])[0]
#     exercises = label_encoders['Exercises'].inverse_transform([prediction[3]])[0]

#     # Build final response
#     response = {
#         'Fitness Goal': fitness_goal,
#         'Recommendation': recommendation,
#         'Diet': diet,
#         'Exercises': exercises
#     }

#     return response


def predict_full_recommendation(user_input):
    # Load model and encoders
    with open('fitness_multioutput_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    with open('label_encoders_multi.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
    
    # Calculate BMI and Level
    height = user_input['Height']
    weight = user_input['Weight']
    bmi = calculate_bmi(weight, height)
    level = determine_level(bmi)

    # Prepare input DataFrame
    data = {
    'Sex': user_input['sex'],  # Match the original dataframe's column name
    'Age': user_input['Age'],
    'Height': height,
    'Weight': weight,
    'Hypertension': user_input['Hypertension'],
    'Diabetes': user_input['Diabetes'],
    'BMI': bmi,
    'Level': level
    }
    
    input_df = pd.DataFrame([data])

    # Encode categorical columns
    for col in ['Sex', 'Hypertension', 'Diabetes', 'Level']:
        input_df[col] = label_encoders[col].transform(input_df[col])

    # Predict
    prediction = model.predict(input_df)
    prediction = prediction[0]

    # Decode predictions
    fitness_goal = label_encoders['Fitness Goal'].inverse_transform([prediction[0]])[0]
    recommendation = label_encoders['Recommendation'].inverse_transform([prediction[1]])[0]
    diet = label_encoders['Diet'].inverse_transform([prediction[2]])[0]
    exercises = label_encoders['Exercises'].inverse_transform([prediction[3]])[0]

    # Build final response
    response = {
        'Fitness Goal': fitness_goal,
        'Recommendation': recommendation,
        'Diet': diet,
        'Exercises': exercises
    }

    return response

# -----------------------
# 8. TEST THE MODEL
# -----------------------

# Example Test Input
test_user_input = {
    'sex': 'Male',
    'Age': 30,
    'Height': 1.75,   # meters
    'Weight': 85,     # kg
    'Hypertension': 'No',
    'Diabetes': 'No'
}

# Predict and Show Result
result = predict_full_recommendation(test_user_input)
print("\n🎯 Test Prediction Output:")
print(result)
