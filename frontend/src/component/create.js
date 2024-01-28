import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/create.css'


function Create() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const navigate = useNavigate()


  function handlSubmit(event){
   event.preventDefault();
   axios.post("http://localhost:8000/create",{title,description})
   .then(res =>{
    navigate("/project")
   }).catch(err =>console.log(err))
  }


    return (
      <div className="create-projects">    
              
              <h2> Create a new Product</h2>
                  <form  onSubmit={handlSubmit}>
                  
                    <div className='project-datas'>


                   

                    <div className='inputsFields1'>
                           <label htmlFor="title">Title:</label>
                           <input type="text" name="title" placeholder="Title" required
                            onChange={e => setTitle(e.target.value)} / >
                           <label htmlFor="desc">Description:</label>
                           <textarea className='desc' name="desc" placeholder="Description" required
                           onChange={e => setDescription(e.target.value)}  
                           ></textarea>
                           
                    </div>

                    <div  className='inputsFields2'>
                           <label htmlFor="title">Title:</label>
                           <input type="text" name="title" placeholder="Title"  
                            onChange={e => setTitle(e.target.value)} / >
                           <label htmlFor="desc">Description:</label>
                           <input type="text" name="desc" placeholder="Desciption"    
                           onChange={e => setDescription(e.target.value)} / >
                    </div>

                    </div>
                    
                    <button >Add</button>

                  </form>
         </div>
      )
    }


    export default Create;