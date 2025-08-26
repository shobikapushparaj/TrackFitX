import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import dashImage from '../images/dash.jpg';
import '../styles/Dashboard.css'; 

function Dashboard() {
  const backgroundStyle = {
    backgroundImage: `url(${dashImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle} className="dashboard-container">
      <NavBar />
      <div className="slogan-left-container">
        <h1 className="slogan-heading">
          Every move and meal you track,<br />
          Brings your fitness journey back on track
        </h1>
        <p className="slogan-subtext">
          Start tracking now and see your transformation unfold.
        </p>
        <Link to='/addexercise' className="slogan-button">Add Exercise</Link>
      </div>
    </div>
  );
}

export default Dashboard;
