

import Sidebar  from "./sidebar";

import '../styles/profile.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserId, useUsers } from "../projectDatas";

function Profile() {


    const userId = useUserId()
  
    const [edit, setEdit] = useState(false)
    const [discard ,setDiscard] = useState(false)
    const [file,setFile] = useState()
    const [imagePreview, setImagePreview] = useState();
    const users = useUsers()

    const [username ,setUsername] = useState('')


    function handleEditUser(){
        setEdit(true)
        setDiscard(true)
    }
   


    function handleDiscardUser(event) {
       
    
        const formData = new FormData();
        formData.append('file', file); // Use 'file' instead of 'proFilefile'
        formData.append('username', username);
        formData.append('id', userId);
    
        axios.put("http://localhost:8000/editProfile", formData)
            .then(res => {
                setEdit(false);
                setDiscard(false);
            })
            .catch(err => console.log(err));
    }
    


    function Preview(event){
        const pic = event.target.files[0];
        setFile(pic);
  
        const reader = new FileReader()
  
        reader.onloadend=()=>{
        setImagePreview(reader.result)
        }  
        reader.readAsDataURL(pic)
     }
     
     

  
        const img = users.filter(u => u.id == userId).map(img => img.img)
          
    
    
    



    return (
      <div className="User-profile">   
            
            
            <Sidebar/>  
           <div className="profile-content">
             
                    
            
                       <div className="profile-user-details">
                          
                            <div className="profile-picture">                             
                        {
                              edit == true  ? <img src={Preview}  />   :  <img src={`http://localhost:8000/images/${img}`}  />
                        }

                               
                                    
                     {
                        discard != false ? 
                                 <div className="edit-profile-pic">
                                     <input type="file" onChange={Preview} />
                                 </div> 
                        : <></>
                     }
                                
                             </div>


                       


                        <div className="profile-name">

                        {
                                edit != false ? (
                                    <div className="edit-user-form">
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" placeholder="Carl Conrad Declaro" name="username" 
                                         onChange={e => setUsername(e.target.value)}
                                        />
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