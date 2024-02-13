
import Sidebar  from "./sidebar";

import '../styles/task.css'
import { Link , useNavigate} from "react-router-dom";



const TaskComp = ()=>{
  return(
    <div className="user-task">         
        <div className="details"> dxvv cv  b bcv b b b b bbv bvcvbcb b bbv ccv b bvc bcv vb gbjkfghnkfgh fg fg hfbhngjknbhn gh n n cn bn cv nc n nc nc n nhfg hfh h fgh fhg g fghfg   fg dg gd gfgd gd  hjfg jf hhgjdf</div>
        <div className="dueDate">02/15/2024</div>
        <div className="priority">Medium</div>
        
         <div className="controls">
              <input type="checkbox" />
              <span className="checkbox">Done</span>                                     
        </div>
  </div>
  )
}


function Task() {

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
                                                                    
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                    </div>                       
                          </div>

                            

                          <div className="task-missed-table">
 
                                <h2>Missed:</h2> 
                                      
                                      
                                    <div className="task-user-body">     
                                                                    
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                          <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                          <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                        <TaskComp/>
                                    </div>     

                                      
                          </div>  
     
              </div>
                     
        </div>
    )
    }


    export default Task;