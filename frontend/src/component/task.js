
import Sidebar  from "./sidebar";

import '../styles/task.css'

function Task() {
    return (
       <div className="Task">    
             <Sidebar/>  
             <div className="task-content">
                          
                          <div className="task-table">
 
                                  
                                  <div className="user-task-header">
                                            <div className="details">Details</div>
                                            <div className="dueDate">DueDate</div>
                                            <div className="priority">Priority</div>
                                            <div className="controls">Controls</div>
                                  </div>

                                  <div className="user-task">
                                            <div className="details"> dxvv cv  b bcv b b b b bbv bvcvbcb b bbv ccv b bvc bcv vb gbjkfghnkfgh fg fg hfbhngjknbhn gh n n cn bn cv nc n nc nc n nhfg hfh h fgh fhg g fghfg   fg dg gd gfgd gd  hjfg jf hhgjdf</div>
                                            <div className="dueDate">02/15/2024</div>
                                            <div className="priority">Medium</div>
                                            
                                            <div className="controls">
                                                   <input type="checkbox" />
                                                   <span className="checkbox">Done</span>                                     
                                            </div>
                                  </div>

                                  
                             

                          </div>

                        
                          
                           
              </div>          
        </div>
    )
    }


    export default Task;