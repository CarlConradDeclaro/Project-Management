
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'
import axios from 'axios';
import { useLocation , useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserId, useUserName, useUsers } from '../projectDatas';


const SidebarComp = (props)=>{


     const navigate = useNavigate()

     const getUserId = useUserId();
     const getUserName  = useUsers()

     //const  usename  = getUserName.filter(n => n.id == getUserId).map(name => name.name.toUpperCase())
     const  usename = ''
         

        


     const handleDelete=()=>{
          axios.get('http://localhost:8000/logout')
          .then(res =>{        
             navigate('/login')
          }).catch(err => console.log(err))
       }


     return(
          <div className="sidebar">   
               <div className='sidebar-username'>
               <div className='User'>
                    <h2>{usename}</h2> 
               </div>

               </div>


     <div className='sidebar-oparation'> 

             <Link to='/dashboard' className='dashboard-link' >
                 <div className='dashboard'>                                       
                 <img src={`http://localhost:8000/images/dashboard.png`} /> 
                       <h2>Dashboard</h2>                     
                   
                  </div>
             </Link> 

             <Link to='/project' className='project-link'> 
             <div className='prroject'>
                     <img src={`http://localhost:8000/images/project.png`} /> 
                       <h2>Project</h2>
                       
                  </div>
             </Link>
             
             <Link to='/task' className='task-link' >
                  <div className='task'>
                  <img src={`http://localhost:8000/images/task.png`} /> 
                       <h2>Task</h2>
                  </div>
             </Link>
        
             <Link to='/report' className='reports-link'>
                  <div className='reports'>
                  <img src={props.dashboard}/>
                       <h2>Reports</h2>
                  </div>
             </Link>
             <Link to='/settings' className='settings-link'>
                  <div className='settings'>
                  <img src={props.dashboard}/>
                       <h2>Settings</h2>
                  </div>
             </Link>
             <div className='logOut'>
                  <button onClick={handleDelete}>Logout</button>
             </div>
     </div>    
</div>
     )
}
function Sidebar() {
     


  return (
      <SidebarComp  /> 
  );
}

export default Sidebar;
