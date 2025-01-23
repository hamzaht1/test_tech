import './style/navbar.css';
import { FaHome, FaCar, FaMapMarkerAlt, FaHistory, FaWrench, FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <h1 className='titre'> E-TRACK</h1>
        <li><a className='a'><FaHome /><Link to="/">Home</Link></a></li>
        <li><a className='b'><FaCar /> <Link>Fleet and device</Link></a></li>
        <li><a className='b'><FaMapMarkerAlt /><Link to="/fleet-tracking">Fleet Tracking</Link></a></li>
        <li><a className='b'><FaHistory /><Link> History</Link></a></li>
        <li><a className='b'><FaWrench /> <Link> Maintenance</Link></a></li>
        <li><a className='b'><FaUser /><Link> Personal </Link></a></li>
        <li><a className='b'><FaLock /><Link> Access Management </Link></a></li>
        <li><a className='b'><FaSignOutAlt /><Link>Log out</Link> </a></li>
      </ul>
    </div>
  );
};

export default Navbar;
