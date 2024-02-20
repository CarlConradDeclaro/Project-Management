 
import { useNavigate ,Link} from "react-router-dom";
import Sidebar  from "./sidebar";
import '../styles/report.css'


const Report= ()=>{
  
    const navigate =useNavigate()

    return(
        <div className="report">
         <Sidebar/>
         <div className="report-content">
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

                       {/* <div className="test">
                                <div className='text'>                                       
                                    <img src={`http://localhost:8000/images/nft.jpg`} />                                                           
                                 </div>
                                 <div className='text'>                                       
                                    <img src={`http://localhost:8000/images/nft.jpg`} />                                                           
                                 </div>
                                  <div className='text'>                                       
                                    <img src={`http://localhost:8000/images/nft.jpg`} />                                                           
                                </div>
                               <div className='text'>                                       
                                    <img src={`http://localhost:8000/images/nft.jpg`} />                                                           
                                 </div>
                                 <div className='text'>                                       
                                    <img src={`http://localhost:8000/images/nft.jpg`} />                                                           
                                </div>
                                <div className='text'>                                       
                                            <p>+5</p>                                                  
                                </div>
                       </div> */}



         </div>
        </div>
    )
}

export default Report