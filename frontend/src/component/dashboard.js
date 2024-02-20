import Sidebar  from "./sidebar";

import '../styles/dashboard.css'
import { Link , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useTask, useProject, useUsers } from "../projectDatas";

function Dashboard(){

    const navigate = useNavigate()
    const project = useProject();


    const users = useUsers();

 
    function getAssignee(id){
       const name =  users.filter(u => u.id == id).map(name => name.name) 
       return name;
    }
   

    return(

        <div className="Dashboard">

                <Sidebar / >

            <div className="dashboard-content"> 
                        <div className="dashboard-content-header">
                                            <div className="dashboard-content-search">
                                                    {/* <input type="text" placeholder="search"></input>                 */}
                                            </div>


                                            <div className="dashboard-content-profile">
                                                
                                                    
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

                         <h1 className="project-summary-title">Project summary</h1>
                         <div className="project-summary">
                                      
                                            <div className="number-projects">
                                                    <h2>Number of Projects</h2>
                                                    <p>23</p>
                                                    <div className="project-data">
                                                       <div   className="number-projects-percentage">
                                                                <p></p>
                                                       </div>
                                                            <p>90%</p>
                                                    </div>
                                                   
                                            </div>

                                            <div className="completed-projects">
                                                    <h2>Completed Projects</h2>
                                                    <p>10</p>
                                                    <div className="project-data">
                                                        <div   className="completed-projects-percentage">
                                                                <p></p>
                                                       </div>
                                                            <p>40%</p>
                                                    </div>
                                            </div>

                                            <div className="project-developers">

                                           </div>

                         </div>


                         <h1 className="project-title">Projects</h1>
                         <div className="dashboard-project">

                              <div className="dashboard-project-controls">
                                          <div className="dpc-controls"> 
                                          <p>All</p>
                                            <p>High</p>
                                            <p>medium</p>
                                            <p>Low</p>
                                          </div>
                              </div>

                              <div className="dashboard-project-header">                                           
                                         <div><p>No</p> </div>
                                         <div><p>Project Name</p> </div>
                                         <div><p>Assigned by</p></div>
                                         <div><p>Team Member</p></div>
                                         <div><p>Assigned Date</p></div>
                                         <div><p>Due Date</p></div>
                                         <div><p>Priority</p></div>
                                         <div><p>Action</p></div>
                              </div>

                            <div className="project-display">
                              {                               
                                project.slice().reverse().map((data,i) => (
                                    <div className="dashboard-projects-datas" key={i}>
                                    <div className="project-No"> <p>{++i}</p></div>
                                    <div className="project-name"><p>{data.projectTitle}</p></div>
                                    <div className="project-assignedBy"><p>{getAssignee(data.owner)}</p></div>
                                    <div className="project-Teams-member">
                                        <img src={`http://localhost:8000/images/nft.jpg`} />
                                        <img src={`http://localhost:8000/images/nft.jpg`} />
                                        <img src={`http://localhost:8000/images/nft.jpg`} />
                                        <img src={`http://localhost:8000/images/nft.jpg`} />
                                        <img src={`http://localhost:8000/images/nft.jpg`} />
                                         <p className='text' >+5</p>            
                                    </div>
                                    <div className="project-Assigned-Date"><p>{data.assignedDate.split('T')[0]}</p></div>
                                    <div className="project-DueDate"><p>{data.duedate.split('T')[0]}</p></div>
                                    <div className="project-Priority"><p>{data.priority}</p> </div>
                                    <div className="project-Action"> <p>View</p></div>
                                    </div>
                                ))       
                              }

                          </div> 

                           

                         </div>
                </div>
        </div>
    )
}
export default Dashboard;