
import Sidebar  from "./sidebar";
 
import '../styles/project.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

 

const Project =(props)=>{
    return(
        <>  
                        <div className="project">

                           <div className="img">
                           <img src={`http://localhost:8000/images/${props.img}`} alt="Project" />
                           </div>

                           <div className="prjTitle">
                                    <h2>{props.title}</h2>
                           </div>

                           <div className="description">
                                    <p>
                                     {props.description}
                                     </p>
                           </div>

                           <div className="category"> 
                                <div className="cat1">
                                    <p className="selectedCat">website</p>
                                </div>
                                <div className="cat2">
                                    <p className="selectedCat">andriod</p>
                                </div>
                           </div>
                          <div className="people"> 
                              
                           </div>
              </div>
        </>   
    )
};



function Projects() {

    const [projectData,setProjectData] = useState([]);


    useEffect(()=>{
        axios.get("http://localhost:8000/")
        .then(res => setProjectData(res.data))
        .catch(err => console.log(err))
    },[])




    return (
      <div className="projects-sidebar">        
          
          
             <Sidebar   />

            <div className="project-content">
                   
                   <div className="header">
                        <div className="project-search">
                                <input type="text" placeholder="search"></input>
                        </div>


                        <div className="project-profile">
                              
                        </div>
                   </div>
                    
                   <div className="create">
                       <Link to='/project/create' className="create-link"><h2>+</h2></Link> 
                    </div>

                    
                   <div className="users-project">  
                      <div className="users-project-header">
                        <h2>Working   (10)</h2>
                      </div> 

                            <div className="users-project-scrollable">
                                {
                                  projectData.filter(data=> data.status === "working").slice().reverse().map((data)=>(
                                    <Project key={data.id} title={data.projectTitle} description={data.description} img={data.image} />
                                  ))
                                }
                            </div>

                            

                            
                  </div>
             </div>            
      </div>
    )
    }

    export default Projects;