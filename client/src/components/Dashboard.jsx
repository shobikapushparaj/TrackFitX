// import React from 'react';
// import NavBar from './NavBar'; // Import NavBar component
// import dashImage from '../images/dash.jpg'; 
// function Dashboard() {
//   const backgroundStyle = {
//     backgroundImage: 'url("/images/dash.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     minHeight: '100vh',
//   };

//   return (
//     <div style={backgroundStyle}>
//       <NavBar/>  {/* Add Navbar here */}
//       <h1 style={{ color: 'white' }}>Dashboard</h1>
//     </div>
//   );
// }

// export default Dashboard;


import React from 'react';
import NavBar from './NavBar';
import dashImage from '../images/dash.jpg'; // ✅ import image

function Dashboard() {
  
  const backgroundStyle = {
    backgroundImage: `url(${dashImage})`, // ✅ use imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };


  return (
    <div style={backgroundStyle}>
      <NavBar />
     </div>
    
  );
}

export default Dashboard;
