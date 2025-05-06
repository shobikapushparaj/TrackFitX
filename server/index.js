require('dotenv').config();
const bcrypt = require('bcrypt');
const { UserModel,ExerciseModel } = require('./models/schema');

console.log("UserModel:", UserModel); // Debugging line

const express=require('express')
const mongoose=require('mongoose') 
const cors=require('cors')
const app = express()
app.use(express.json())
app.use(cors())
async function connectdb(){
try{
await mongoose.connect("mongodb://localhost:27017/TrackFitx");
console.log("db connnection success")
         const x= 4000;
         app.listen(x,function(){
             console.log(`starting port ${x}...`)
         })
     }
     catch(err){
        console.log("db not connected: "+err);
    }
}
connectdb();


//login
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    console.log(`Login attempt: name=${name}, password=${password}`);
    try {
      const user = await UserModel.findOne({ name });
      console.log('User found:', user);
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ id: user._id, name: user.name, email: user.email });
      } else {
        res.status(401).json({ message: 'Incorrect username or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     console.log("Received Signup Data:", req.body); // Debugging line

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
//         if (existingUser) {
//             if (existingUser.email === email) {
//                 return res.status(400).json({ message: 'Email already exists' });
//             } else {
//                 return res.status(400).json({ message: 'Username already exists' });
//             }
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new UserModel({ name, email, password: hashedPassword });

//         await user.save();
//         res.status(201).json({ message: 'User created successfully', userId: user._id });
//     } catch (err) {
//         console.error("Error during registration:", err);
//         res.status(500).json({ message: err.message });
//     }
// });
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received Signup Data:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      } else {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: err.message });
  }
});


app.get('/getuser/:id', async (req, res) => {
  // console.log("Hit the userdetails")
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    // console.log(user)
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.put("/user-details/:id", async (req, res) => {
//   const { weight, height, age, gender, goal } = req.body;
//   const { id } = req.params;  // Get the ID from the URL parameter

//   try {
//     // Find the user by ID and update the details
//     const existingUser = await UserModel.findById(id);

//     if (existingUser) {
//       existingUser.weight = weight;
//       existingUser.height = height;
//       existingUser.age = age;
//       existingUser.gender = gender;
//       existingUser.goal = goal;

//       await existingUser.save();  // Save the updated user data
//       res.status(200).json({ message: "User details updated successfully!" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in /user-details:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.put("/user-details/:id", async (req, res) => {
//   const { weight, height, age, sex, goal } = req.body;
//   const { id } = req.params;  // Get the ID from the URL parameter

//   try {
//     const existingUser = await UserModel.findById(id);

//     if (existingUser) {
//       existingUser.weight = weight;
//       existingUser.height = height;
//       existingUser.age = age;
//       existingUser.sex = sex;
//       existingUser.goal = goal;

//       await existingUser.save();  // Save the updated user data
//       res.status(200).json({ message: "User details updated successfully!" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in /user-details:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.put("/user-details/:id", async (req, res) => {
  const { weight, height, age, sex, goal, hypertension, diabetes } = req.body;  // Include all fields
  const { id } = req.params;

  try {
    const existingUser = await UserModel.findById(id);

    if (existingUser) {
      existingUser.weight = weight;
      existingUser.height = height;
      existingUser.age = age;
      existingUser.sex = sex;
      existingUser.goal = goal;
      existingUser.hypertension = hypertension;
      existingUser.diabetes = diabetes;

      await existingUser.save();
      res.status(200).json({ message: "User details updated successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in /user-details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//update user in profile
app.put('/updateuser/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    // Find if there is any other user with the new username or email
    const existingUser = await UserModel.findOne({ 
      $or: [{ name }, { email }],
      _id: { $ne: userId }  // Exclude the current user
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      } else if (existingUser.name === name) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // Update the user details
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/add-exercise', async (req, res) => {
    try {
        const exercise = new ExerciseModel(req.body);
        await exercise.save();
        res.status(201).json({ message: "Exercise added successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error adding exercise", error: err.message });
    }
});


app.get('/exercises/:userId', async (req, res) => {
    const { type } = req.query;
    try {
        const exercises = await ExerciseModel.find({ 
            userId: req.params.userId, 
            ...(type && { type }) 
        });
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: "Error fetching exercises", error: err.message });
    }
});



app.delete('/delete-exercise/:id', async (req, res) => {
  try {
    await ExerciseModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/completed/:userId', async (req, res) => {
  try {
    const completed = await ExerciseModel.find({ userId: req.params.userId, completed: true });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//
app.put('/exercise/:id', async (req, res) => {
    try {
        const updatedExercise = await ExerciseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExercise);
    } catch (err) {
        res.status(500).json({ message: "Error updating exercise", error: err.message });
    }
});

app.put('/exercise/:id/complete', async (req, res) => {
    try {
        const exercise = await ExerciseModel.findByIdAndUpdate(
            req.params.id, 
            { type: 'done' }, 
            { new: true }
        );
        res.json(exercise);
    } catch (err) {
        res.status(500).json({ message: "Error marking as complete", error: err.message });
    }
});

app.patch('/check-missing/:userId', async (req, res) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);
        await ExerciseModel.updateMany({
            userId: req.params.userId,
            type: 'todo',
            date: { $lt: currentDate }
        }, {
            type: 'missing'
        });
        res.json({ message: "Old exercises moved to missing" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
