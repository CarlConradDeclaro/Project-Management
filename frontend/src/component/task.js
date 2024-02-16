
import Sidebar  from "./sidebar";

import '../styles/task.css'
import { Link , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

 




  
function Task() {

     const [task,setTask] = useState([])
    

     const [userName,setUserName] = useState('') // user name
     

     axios.defaults.withCredentials = true;
     useEffect(() => {
       axios.get('http://localhost:8000')
         .then(res => {
           if (res.data.Status === "Success") {     
             setUserName(res.data.name)
            }  
         })
         .catch(err => console.log(err)); // Add error handling here
     }, []);


     useEffect(()=>{
        axios.get('http://localhost:8000/getTask')
        .then(res=> setTask(res.data))
        .catch(err => console.log(err))
     })


    

   

    const  updateTask = (id)=> {  
      
      axios.put('http://localhost:8000/update-task', {id:id})
        .then(res => console.log(res))
        .catch(err => console.error(err));
      
       
    }
    function updateTaskDone(projId) {
      const taskDone = task.filter(t => (t.projId === projId && t.status === "Done")).length;
        
      axios.put('http://localhost:8000/update-taskDone', { taskid: projId, tskDone:taskDone})
      .then(res => console.log(res))
      .catch(err => console.error(err));   
    }

    function update(id,projId){
      updateTask(id)
      updateTaskDone(projId)
    }



   const navigate = useNavigate()



    return (
      
       <div className="Task">    
           <Sidebar/>  


            
             <div className="task-content">
                         <div className="task-content-header">
                                <div className="task-content-search">
                                        {/* <input type="text" placeholder="search"></input>                 */}
                                </div>


                                <div className="task-content-profile">
                                      
                                          
                                          <div className="profile" onClick={e => navigate('/profile')}>
                                                  <img src="../nft.jpg"  />
                                                  <div class="dropdown"  >
                                                    
                                                      <div class="dropdown-content">
                                                        <Link to="/profile">   Profile </Link>
                                                    
                                                        <Link>   Setting </Link>
                                                      
                                                      </div>
                                                    </div>
                                          </div>                 
                                </div>
                          </div>

                          <div className="task-menus">             
                             <div>
                                    <div className='add-member'>
                                          <img src={`http://localhost:8000/images/addMember.png`} /> 
                                          <p>All task</p>
                                      </div>
                                  

                                      <div className='see-member'>
                                        <img src={`http://localhost:8000/images/people.png`} /> 
                                          <p>Priorities</p>
                                    </div>

                                    <div className='see-stats'>
                                        <img src={`http://localhost:8000/images/stats.png`} /> 
                                          <p>Missed</p>
                                    </div>
          
                                    <div className='mark-a-done'>   
                                          <img src={`http://localhost:8000/images/stats.png`} /> 
                                          <p>Issues</p>           
                                    </div>

                                    <div className='mark-a-done'>   
                                          <img src={`http://localhost:8000/images/stats.png`} /> 
                                          <p>Done</p>           
                                    </div>
                                    </div>
                                    <div className='mark-a-done'>      
                                          <p>13/50</p>           
                                    </div>
                             
                              
                          </div>
                    
                          
                          <div className="task-table">
 
                                <h2>To do: </h2> 
                                        <div className="user-task-header">
                                                  <div className="details">Task</div>
                                                  <div className="dueDate">DueDate</div>
                                                  <div className="priority">Priority</div>
                                                  <div className="controls">Controls</div>
                                        </div>
                                    
                                    <div className="task-user-body">     
                                                                    
                                       {
                                        task.filter(data => data.assign === userName && data.status != "Done").slice().reverse().map((data) => (
                                          <div className="user-task">
                                          <div className={data.priority === "low" ? 'user-task-details-low' : data.priority === 'medium' ? 'user-task-details-medium' : 'user-task-details-high'}>{data.details}</div>
                                          <div className="dueDate">{data.dueDate}</div>
                                          <div className={data.priority === "low" ? 'user-task-priority-low' : data.priority === 'medium' ? 'user-task-priority-medium' : 'user-task-priority-high'}>{data.priority}</div>
                                          <div className="controls">
                                          <button  onClick={() => update(data.id,data.projId)} >Done</button>
                                            <button >Suggestion</button>
                                          </div>
                                        </div>
                                          ))
                                         
                                       }
                                        
                                    </div>                       
                          </div>

                            

                          <div className="task-missed-table">
 
                                <h2>Missed:</h2> 
                                      
                                      
                                    <div className="task-user-body">     
                                                                    
                                       
                                    </div>     

                                      
                          </div>  
     
              </div>
                     
        </div>
    )
    }


    export default Task;