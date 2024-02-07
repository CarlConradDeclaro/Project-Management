
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'
import axios from 'axios';
import { useLocation , useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';



function Sidebar() {
     
const location  = useLocation()
const navigate = useNavigate()


const [usename,setUserName] = useState('');





     const handleDelete=()=>{
        axios.get('http://localhost:8000/logout')
        .then(res =>{        
           navigate('/login')
        }).catch(err => console.log(err))
     }



     axios.defaults.withCredentials= true;
     useEffect(()=>{
          axios.get('http://localhost:8000')
          .then(res=>{
                    setUserName(res.data.name)
          }).catch(err => console.log(err))
     },[])

  return (
    <div className="sidebar">   

    

            <div className='sidebar-username'>

               <div className='User'>
                    <h2>{usename}</h2> 
               </div>

            </div>


            <div className='sidebar-oparation'> 

                    <Link to='/create' className='dashboard-link'>
                        <div className='dashboard'>                                       
                          
                              <h2>Dashboard</h2>                     
                          
                         </div>
                    </Link> 

                    <Link to='/project' className='project-link'> 
                    <div className='prroject'>
                        
                              <h2>Project</h2>
                         </div>
                    </Link>
                    
                    <Link to='/task' className='task-link'>
                         <div className='task'>
                         
                              <h2>Task</h2>
                         </div>
                    </Link>
               
                    <Link to='/reports' className='reports-link'>
                         <div className='reports'>
                          
                              <h2>Reports</h2>
                         </div>
                    </Link>
                    <Link to='/settings' className='settings-link'>
                         <div className='settings'>
                         
                              <h2>Settings</h2>
                         </div>
                    </Link>
                    <div className='logOut'>
                         <button onClick={handleDelete}>Logout</button>
                    </div>

            </div>
            
            
            
    </div>
  );
}

export default Sidebar;
