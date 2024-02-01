
import Sidebar  from "./sidebar";
 
import '../styles/project.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
 
 

const Project =(props)=>{
 

 
  const tagsArray = JSON.parse(props.tags);

// tagsArray.forEach(tagString => {
//     const individualTags = tagString.split(','); // Assuming each element is comma-separated
//     individualTags.forEach(tag => {
//         console.log(tag);
//     });
// });

 
 
   
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

                           <div className="project-tags"> 
                               
                               

                           {tagsArray.map((tag, index) => (
                                <div key={index} className="tag">
                                    <p className="selectedCat">{tag}</p>
                                </div>
                            ))}

                                      
                           </div>
                          <div className="people"> 
                              
                           </div>
              </div>
        </>   
    )
};



function Projects() {

    const [projectData,setProjectData] = useState([]);
     

    
    const number_working = projectData.filter(data => data.status === "working").length;
    const number_progress = projectData.filter(data => data.status === "inprogress").length;
    const number_completed = projectData.filter(data => data.status === "completed").length;

    


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
                    

                            <div className="users-project-working">

                                  <div className="users-project-header-working">
                                 

                                     <h2>Working   ({number_working} )</h2>
                                 </div> 
                                {
                                  projectData.filter(data=> data.status === "working").slice().reverse().map((data)=>(
                                   
                                    <Project key={data.id} title={data.projectTitle} description={data.description} img={data.image}  tags={data.tags}/>
                                    
                                  ))
                                  
                                }
                              
                            </div>


                            <div className="users-project-progress">
                                <div className="users-project-header-progress">
                                        <h2>In progress   ({number_progress})</h2>
                                    </div> 

                                    {
                                  projectData.filter(data=> data.status === "inprogress").slice().reverse().map((data)=>(
                                    <Project key={data.id} title={data.projectTitle} description={data.description} img={data.image}   tags={data.tags}/>
                                  ))
                                }
                            </div>

                            <div className="users-project-completed">
                                <div className="users-project-header-completed">
                                        <h2>Completed   ({number_completed})</h2>
                                    </div> 

                                    {
                                  projectData.filter(data=> data.status === "completed").slice().reverse().map((data)=>(
                                    <Project key={data.id} title={data.projectTitle} description={data.description} img={data.image}   tags={data.tags}/>
                                    
                                  ))
                                }
                            </div>                          
                  </div>
             </div>            
      </div>
    )
    }

    export default Projects;