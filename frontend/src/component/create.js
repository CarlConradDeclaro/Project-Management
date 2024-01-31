import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/create.css'


function Create() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [file,setFile] = useState()
  const [imagePreview, setImagePreview] = useState();
  const [status,setStatus]=useState("");
  const navigate = useNavigate()


  function handlSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('status',status)
    formData.append('file', file);


    axios.post("http://localhost:8000/create", formData)
        .then(res => {
            console.log(res.data);
            navigate("/project");
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

                           <select onChange={e => setStatus(e.target.value)}>
                              <option value="">Select a Status</option>
                              <option value="working">Working</option>
                              <option value="inprogress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select> 
                    </div>

                    <div  className='inputsFields2'>
                           <input type="file"  onChange={Preview}   / >

                            <div className='project-photo'> 
                            <img src={imagePreview}  />
                            </div>
                    </div>

                    </div>
                    
                    <button >Add</button>

                  </form>
         </div>
      )
    }


    export default Create;