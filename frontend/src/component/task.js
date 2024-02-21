
import Sidebar  from "./sidebar";

import '../styles/task.css'
import { Link , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTask, useProject,useUserName, useUserId, useUsers } from "../projectDatas";
 


  
function Task() {

     const navigate = useNavigate()
     const task = useTask()
     const project = useProject()
     const userName = useUserName();
     const userId = useUserId()
     const users = useUsers();
 


    const  updateTask = (id)=> {  
      axios.put('http://localhost:8000/update-task', {id:id})
        .then(res => console.log(res))
        .catch(err => console.error(err));  
    }

    function updateTaskDone(projId) {
        const taskDone = task.filter(t => (t.projId === projId && t.status === "Done")).length;  
        const  taskNum = project.filter(p => p.id == projId).map(t => t.numTask)
        const doneTask = project.filter(p => p.id == projId).map(t => t.taskDone) 

        axios.put('http://localhost:8000/update-taskDone', { taskid: projId, tskDone:taskDone,  numT:taskNum,taskD:doneTask})
        .then(res => console.log(res))
        .catch(err => console.error(err));   
    }

    function update(id,projId){
      updateTask(id,projId)
      updateTaskDone(projId)
    }



 
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
                                               {
                                                        users
                                                        .filter(user => user.id === parseInt(userId))
                                                        .map(user => (
                                                            <img
                                                                key={user.id} 
                                                                src={`http://localhost:8000/images/${user.mg}`}
                                                                alt="pp"
                                                            />
                                                        ))
                                                    }   
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
                                              <div className={data.priority === "low" ? 'user-task-details-low' : data.priority === 'medium' ? 'user-task-details-medium' : 'user-task-details-high'}><p>{data.details}</p></div>
                                              <div className="dueDate">{data.dueDate.split('T')[0]}</div>
                                              <div className={data.priority === "low" ? 'user-task-priority-low' : data.priority === 'medium' ? 'user-task-priority-medium' : 'user-task-priority-high'}><p>{data.priority}</p></div>
                                              <div className="controls">
                                              <button  onClick={() => update(data.id,data.projId)} >Done</button>
                                                <button >Suggestion</button>
                                              </div>
                                        </div>
                                          ))
                                         
                                       }
                                        
                                    </div>                       
                          </div>

                            

                          {/* <div className="task-missed-table">
 
                                <h2>Missed:</h2> 
                                      
                                      
                                    <div className="task-user-body">     
                                                                    
                                       
                                    </div>     

                                      
                          </div>   */}
     
              </div>
                     
        </div>
    )
    }


    export default Task;