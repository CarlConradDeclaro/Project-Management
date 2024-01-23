
import Sidebar  from "./sidebar";
 
import '../styles/project.css'


function Projects() {
    return (
      <div className="projects-sidebar">        
          
          
             <Sidebar  />

             
      
            <div className="project-content">
                   
                   <div className="header">
                        <div className="project-search">
                                <input type="text" placeholder="search"></input>
                        </div>


                        <div className="project-profile">
                               
                        </div>
                   </div>

                   <div className="users-project">                      
                        <div className="create">
                                    <h2>+</h2>
                        </div>


                        <div className="project">

                           <div className="img">
                               <img src="./photos/nft.jpg" alt="picture"></img>
                           </div>

                           <div className="prjTitle">
                                    <h2>TItle</h2>
                           </div>

                           <div className="description">

                           </div>

                           <div className="category"> 

                           </div>

                           <div className="people"> 

                           </div>

                           

                        </div>
                   </div>

             </div>

             
      </div>
    )

    }


    export default Projects;