import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';
import  History from './components/History';
import AddExercise from './components/AddExercise';
import Review from './components/ReviewExercises';
import Calculator from './components/Calculator';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userform' element={<UserForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/history' element={<History />} />
        <Route path='/addexercise' element={<AddExercise />} />
        <Route path='/review' element={<Review />} />
        {/* <Route path='/Calculator' element={<Calculator />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
