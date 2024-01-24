
import Sidebar  from "./sidebar";
 
import '../styles/project.css'
import { Link } from "react-router-dom";



const Project =()=>{
    return(
        <>  
                        <div className="project">

                           <div className="img">
                               <img src="../nft.jpg" alt="picture"/>
                           </div>

                           <div className="prjTitle">
                                    <h2>TItle</h2>
                           </div>

                           <div className="description">
                                    <p>
                                        lloresfjsdfsdfsfdfgggdggffgdgfdfdfsdfsdfdsfdfgdghgjknfgjknfgjkfdgjkfdgdgg   
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
                  
                     

                   

                     <div className="users-project-scrollable ">
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                     </div> 
                 

                    

                    
                   </div>

             </div>            
      </div>
    )

    }


    export default Projects;