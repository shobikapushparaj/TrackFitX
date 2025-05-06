const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number },
    height: { type: Number },
    age: { type: Number },
    sex: { type: String },
    goal: { type: String },
    hypertension: { type: String }, // Add this
    diabetes: { type: String },     // Add this
  });  
const UserModel = mongoose.model('Signup_details', UserSchema);
const exerciseSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Signup_details', 
        required: true 
    },
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    count: { type: Number },
    duration: { type: String },
    type: { 
        type: String, 
        enum: ['todo', 'done', 'missing'], 
        default: 'todo' 
    }
}, {
    timestamps: true
});


const ExerciseModel = mongoose.model('Exercise', exerciseSchema);

module.exports = {
    UserModel,
    ExerciseModel
};

