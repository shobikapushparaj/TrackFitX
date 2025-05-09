// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../index.css';
// import axios from 'axios';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     if (!name || !email || !password) {
//       alert('Please fill all the fields.');
//       return;
//     }
    
//     axios.post('http://localhost:4000/register', { name, email, password })
//   .then(result => {
//     console.log(result);
//     if (result.data.message === "Email already exists") {
//       window.alert("Email already exists. Please use another email.");
//     } else if (result.data.message === "Username already exists") {
//       window.alert("Username already exists. Please use another username.");
//     } else if (result.data.message === "User created successfully") {
//       sessionStorage.setItem('userId', result.data.userId);
//       console.log( result.data.userId);
//       navigate('/userform', { state: { userId: result.data.userId } });
//     //   navigate('/dashboard');
//     }
//   })
//   .catch(error => {
//     console.error(error);
//     if (error.response && error.response.data && error.response.data.message) {
//       window.alert(error.response.data.message);
//     } else {
//       window.alert("Something went wrong. Please try again later.");
//     }
//   });
//   };

//   return (
//     <div className='signupContainer'>
//       <div className='signupLeft'>
//         <h1 className='gradient-signup-text1' style={{ fontSize: '50px', marginLeft: '200px', marginBottom: '10px' , fontWeight:'bold',lineHeight:'1.5'}}>REGISTER</h1>  <form onSubmit={handleSubmit} style={{marginLeft:'100px'}}>
//           <div className="form-group">
//             <label htmlFor="email" style={{ marginLeft: '100px', fontWeight:'bold' ,fontSize:'35px'}} className='my-text-style-signup'>Email</label>
//             <input type="email" id="email" name="email" style={{ marginLeft: '131px',height:'58px'  }}
//               onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="username" style={{ marginLeft: '100px', fontSize:'35px',fontWeight:'bold' }} className='my-text-style'>Username</label>
//             <input type="text" id="username" name="username" style={{ marginLeft: '55px',height:'58px' }}
//               onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password" style={{ marginLeft: '100px' , fontSize:'35px',fontWeight:'bold'}} className='my-text-style'>Password</label>
//             <input type="password" id="password" name="password" style={{ marginLeft: '60px' ,height:'58px' }}
//               onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <button type="submit" className='signupbt' style={{ fontWeight:'bold'}}>SignUp</button>
//         </form>
//       </div>
//       <div className='signupRight'>
//         {/* <img src={signup} alt="Signup Image" /> */}
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState(''); // changed 'name' to 'username' for consistency
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!username || !email || !password) {
      alert('Please fill all the fields.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    axios.post('http://localhost:4000/register', { username, email, password })
      .then(result => {
        console.log(result);
        if (result.data.message === "Email already exists") {
          window.alert("Email already exists. Please use another email.");
        } else if (result.data.message === "Username already exists") {
          window.alert("Username already exists. Please use another username.");
        } else if (result.data.message === "User created successfully") {
          sessionStorage.setItem('userId', result.data.userId);
          console.log(result.data.userId);
          navigate('/userform', { state: { userId: result.data.userId } });
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          window.alert(error.response.data.message);
        } else {
          window.alert("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <div className='signupContainer'>
      <div className='signupLeft'>
        <h1 className='gradient-signup-text1' style={{ fontSize: '50px', marginLeft: '120px', marginBottom: '10px' , fontWeight:'bold', lineHeight:'1.5' }}>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ marginLeft: '100px', fontWeight:'bold', fontSize:'35px' }} className='my-text-style-signup'>Email</label>
            <input type="email" id="email" name="email" style={{ marginLeft: '131px', height:'58px' }}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="username" style={{ marginLeft: '100px', fontSize:'35px', fontWeight:'bold' }} className='my-text-style'>Username</label>
            <input type="text" id="username" name="username" style={{ marginLeft: '55px', height:'58px' }}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ marginLeft: '100px', fontSize:'35px', fontWeight:'bold' }} className='my-text-style'>Password</label>
            <input type="password" id="password" name="password" style={{ marginLeft: '60px', height:'58px' }}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className='signupbt' style={{ fontWeight:'bold' }}>Signup</button>
        </form>
      </div>
      <div className='signupRight'>
        {/* <img src={signup} alt="Signup Image" /> */}
      </div>
    </div>
  );
};

export default Signup;
