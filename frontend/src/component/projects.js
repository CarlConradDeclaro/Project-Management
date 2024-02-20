import Sidebar  from "./sidebar";
 
import '../styles/project.css'
import { Link , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' 
import { useProject } from "../projectDatas";
 
const Project = (props) => {
      const navigate = useNavigate();
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
      }, []);

      const tagsArray = JSON.parse(props.tags);

      function handleProjectClick() {
        navigate(`/project/${props.id}/${props.owner}`);
      }

      const desc = props.description;
      const projectDetailsTrim = desc.length > 100 ? desc.substring(0, 100) + "..." : desc;

      

  return (
    <>
    {
      loading ?         
            <ProductLoading/>   
              : 
              <div className="project" onClick={handleProjectClick}>
              <div className="img">
                <img src={`http://localhost:8000/images/${props.img}`} alt="Project" />
              </div>

              <div className="prjTitle">
                <h2> {props.title || <Skeleton />}</h2>
              </div>

              <div className="description">
                <p>
                  {projectDetailsTrim}
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
                {/* Render people related information here */}
              </div>
            </div>
      }
    </>
  );
};

const ProductLoading=()=>{
  return(
          <div className="project-inLoading"  >
          <div className="img-inLoading">
          <Skeleton height={110}/>
          </div>

          <div className="prjTitle-inLoading">
                  
          </div>

          <div className="description-inLoading">
                    <p> </p>
                    <p> </p>
                    <p> </p>
          </div>

          <div className="project-tags-inLoading"> 

                <div  className="tag">
                  
                </div>     
                <div  className="tag">
                
                </div>                  
          </div>
          <div className="people"> 
              
          </div>
      </div>
  )
}





function Projects() {

    const navigate = useNavigate()
    const projectData = useProject() 
    const [auth,setAuth] = useState(false)
    const [name,setName] =useState("")
    const [userId,setUserId] = useState('')

 
    const number_working = projectData.filter(data => (data.status === "working") && (data.owner === userId || data.members.includes(name))).length;
    const number_progress = projectData.filter(data=> (data.status === "inprogress") && (data.owner === userId || data.members.includes(name))).length
    const number_completed = projectData.filter(data=> (data.status === "completed") && (data.owner === userId || data.members.includes(name))).length

    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8000')
        .then(res => {
          if (res.data.Status === "Success") {
            setAuth(true);
            setUserId(res.data.id);
            setName(res.data.name)
            console.log(res.data.id + " from project");  
          } else {
            setAuth(false);
          }
        })
        .catch(err => console.log(err));  
    });
    
    function handleProfile(){
      navigate('/profile')
    }

    return (
      <div className="projects-sidebar">        
          
        {
          auth == true  ?
          <>
          <Sidebar   />
            
             
          <div className="project-content">                
               

                 <div className="header">
                      <div className="project-search">
                              <input type="text" placeholder="search"></input>                
                      </div>


                      <div className="project-profile">
                             
                                 
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
                  



                 <div className="create">
                     <Link to='/project/create' className="create-link"><h2>+</h2></Link> 
                  </div>
 
                   
                            <div className="users-project">  
                                  <div className="users-project-working">
              
                                              <div className="users-project-header-working">
                                              
                                      <div className="x">
                                      <h2>Working   ({number_working} )</h2>
                                      </div>
                                                
                                              </div> 
                                            {
                                              projectData.filter(data=> (data.status === "working") && (data.owner === userId || (data.members.includes(name)))).slice().reverse().map((data)=>(
                                                
                                                <Project key={data.id} id={data.id} owner={data.owner} title={data.projectTitle} description={data.description} img={data.image}  tags={data.tags}/>
                                                
                                              ))
                                              
                                            }
                                          
                                  </div>
        
        
                                  <div className="users-project-progress">
                                      <div className="users-project-header-progress">
                                              <h2>In progress   ({number_progress})</h2>
                                          </div> 
        
                                          {
                                        projectData.filter(data=> (data.status === "inprogress") && (data.owner === userId || (data.members.includes(name)))).slice().reverse().map((data)=>(
                                          <Project key={data.id} id={data.id} owner={data.owner} title={data.projectTitle} description={data.description} img={data.image}   tags={data.tags}/>
                                        ))
                                      }
                                  </div>


                                    <div className="users-project-completed">
                                      <div className="users-project-header-completed">
                                              <h2>Completed   ({number_completed})</h2>
                                          </div> 
        
                                          {
                                        projectData.filter(data=> (data.status === "completed") && (data.owner === userId || (data.members.includes(name)))).slice().reverse().map((data)=>(
                                          <Project key={data.id} id={data.id} owner={data.owner} title={data.projectTitle} description={data.description} img={data.image}   tags={data.tags}/>
                                        ))
                                      }
                                  </div>

        
                                                      
                        </div>
               

                
                </div>    
                </>
          :<></>          
        }              
      </div>
    )
    }

    export default Projects;