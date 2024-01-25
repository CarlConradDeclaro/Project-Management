import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Create() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const navigate = useNavigate()


  function handlSubmit(event){
   event.preventDefault();
   axios.post("http://localhost:3000/create",{title,description})
   .then(res =>{
    navigate("/project")
   }).catch(err =>console.log(err))
  }


    return (
      <div className="projects">    
             <div>
                  <form  onSubmit={handlSubmit}>
                    <h2> Add Student</h2>
                    <div>
                           <label htmlFor="title">Title:</label>
                           <input type="text" name="title" placeholder="Title" required
                            onChange={e => setTitle(e.target.value)} / >
                           <label htmlFor="desc">Description:</label>
                           <input type="text" name="desc" placeholder="Desciption" required  
                           onChange={e => setDescription(e.target.value)} / >
                    </div>
                    <button >Add</button>
                  </form>
              </div>   
        </div>
      )
    }


    export default Create;