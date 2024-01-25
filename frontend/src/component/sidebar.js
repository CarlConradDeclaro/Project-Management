
 import { Link } from 'react-router-dom';
import '../styles/sidebar.css'


//  import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Sidebar() {
  return (
    <div className="sidebar">      
            
             <div className='dashboard'>
                 <Link to='/create' className='dashboard-link'><h2>Dashboard</h2></Link>              
             </div>
            
             <div className='project'>
                  <h2><Link to='/project' className='project-link'>Projects</Link></h2>
            </div>

            <div className='task'>
                  <h2><Link to='/task' className='task-link'>Task</Link></h2>
            </div>

            <div className='reports'>
                 <h2><Link to='/reports' className='reports-link'>Reports</Link></h2>
            </div>

            <div className='settings'>
                 <h2><Link to='/settings' className='settings-link'>Settings</Link></h2>
            </div>
            
    </div>
  );
}

export default Sidebar;
