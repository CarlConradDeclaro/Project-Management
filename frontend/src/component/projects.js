import Bar  from "./sidebar";
 
import '../styles/project.css'
import { Link , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
 

const Project =(props)=>{

  const navigate = useNavigate()
const tagsArray = JSON.parse(props.tags);

function handleProjectClick() {
    navigate(`/project/${props.id}/${props.owner}`);
}

   

    return(
        <>  
                        <div className="project" onClick={handleProjectClick}>

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
     

    const [auth,setAuth] = useState(false)
    const [name,setName] =useState("")
    const [userId,setUserId] = useState('')
    const number_working = projectData.filter(data => data.status === "working" && data.owner === userId ||  data.members.includes(name)).length;
    const number_progress = projectData.filter(data => data.status === "inprogress"  && data.owner === userId||  data.members.includes(name)).length;
    const number_completed = projectData.filter(data => data.status === "completed" && data.owner === userId ||  data.members.includes(name)).length;

    
     
     useEffect(()=>{
        axios.get("http://localhost:8000/project")
        .then(res => setProjectData(res.data))
        .catch(err => console.log(err))
      
    },[])

   
    
 
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8000')
        .then(res => {
          if (res.data.Status === "Success") {
            setAuth(true);
            setUserId(res.data.id);
            setName(res.data.name)
            console.log(res.data.id + " from project"); // Log the name from the response data
          } else {
            setAuth(false);
          }
        })
        .catch(err => console.log(err)); // Add error handling here
    }, []);
    
    



  


    return (
      <div className="projects-sidebar">        
          
        {
          auth &&(
          <>
        
        <Bar img={'../dashboard.png'} /> 
             
          <div className="project-content">                
               

                 <div className="header">
                      <div className="project-search">
                              <input type="text" placeholder="search"></input>                
                      </div>


                      <div className="project-profile">
                                 <div className="noti">
                                 <img src="../noti.png"  />
                                 </div>
                                 
                                 <div className="profile">
                                        <img src="../nft.jpg"  />
                                 </div>
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
                                projectData.filter(data=> data.status === "working" && data.owner === userId ||  data.members.includes(name)).slice().reverse().map((data)=>(
                                 
                                  <Project key={data.id} id={data.id} owner={data.owner} title={data.projectTitle} description={data.description} img={data.image}  tags={data.tags}/>
                                  
                                ))
                                
                              }
                            
                          </div>


                          <div className="users-project-progress">
                              <div className="users-project-header-progress">
                                      <h2>In progress   ({number_progress})</h2>
                                  </div> 

                                  {
                                projectData.filter(data=> data.status === "inprogress" && data.owner === userId).slice().reverse().map((data)=>(
                                  <Project key={data.id} title={data.projectTitle} description={data.description} img={data.image}   tags={data.tags}/>
                                ))
                              }
                          </div>

                          <div className="users-project-completed">
                              <div className="users-project-header-completed">
                                      <h2>Completed   ({number_completed})</h2>
                                  </div> 

                                  {
                                projectData.filter(data=> data.status === "completed" && data.owner === userId).slice().reverse().map((data)=>(
                                  <Project key={data.id} title={data.projectTitle} description={data.description} img={data.image}   tags={data.tags}/>
                                  
                                ))
                              }
                          </div>                          
                </div>
                </div>    
                </>
          )           
        }              
      </div>
    )
    }

    export default Projects;