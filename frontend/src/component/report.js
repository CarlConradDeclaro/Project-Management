 
import { useNavigate ,Link} from "react-router-dom";
import Sidebar  from "./sidebar";
import '../styles/report.css'
import { useUserId, useUsers } from "../projectDatas";


const Report= ()=>{
  
    const navigate =useNavigate()
    const userId =  useUserId()
    const users = useUsers();


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
                                                    {
                                                        users
                                                        .filter(user => user.id === parseInt(userId))
                                                        .map(user => (
                                                            <img
                                                                key={user.id} 
                                                                src={`http://localhost:8000/images/${user.img}`}
                                                                alt="pp"
                                                            />
                                                        ))
                                                    }
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