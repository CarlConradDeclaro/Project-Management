

import Sidebar  from "./sidebar";

import '../styles/profile.css'
import { useState } from "react";

function Profile() {


    const [edit, setEdit] = useState(false)
    const [discard ,setDiscard] = useState(false)

    function handleEditUser(){
        setEdit(true)
        setDiscard(true)
    }
    function handleDiscardUser(){    
        setEdit(false)
        setDiscard(false)
    }




    return (
      <div className="User-profile">   
            
            
            <Sidebar/>  
           <div className="profile-content">
                 
                       <div className="profile-user-details">
                          
                            <div className="profile-picture">                           
                                    <img src="../nft.jpg " alt="profile picture"/>  
                     </div>

                     {
                        discard != false ? 
                                <div className="edit-profile-pic">
                                    <button>Edit</button>
                                 </div> 
                        : <></>
                     }

                       


                        <div className="profile-name">

                        {
                                edit != false ? (
                                    <div className="edit-user-form">
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" placeholder="Carl Conrad Declaro" name="username" />
                                        <label htmlFor="middlename">Middlename:</label>
                                        <input type="text" placeholder=" " name="middlename" />
                                        <label htmlFor="lastname">Lastname:</label>
                                        <input type="text" placeholder="Declaro" name="lastname" />

                                        <div className="profile-controls">
                                            <button onClick={handleDiscardUser}>Submit</button>   
                                        </div>
                                    </div>
                                ) :                            
                                    <div className="user-names">
                                            <div>
                                                <label htmlFor="firstname">First Name:</label>
                                                <h2>Carl Conrad</h2>
                                            </div>
                                            <div>
                                                <label htmlFor="middlename">Middle Name:</label>
                                                <h2>Carl Conrad</h2>
                                            </div>
                                            <div>
                                                <label htmlFor="lastname">Last Name:</label>
                                                <h2>Carl Conrad</h2>
                                           </div>
                                           <div className="profile-controls">
                                                 <button onClick={handleEditUser}>Edit</button>   
                                          </div>
                                   </div>
                            }

                               
                        </div>

                       </div>
                   
            </div> 
            
                  
        </div>
    )
    }


    export default Profile;