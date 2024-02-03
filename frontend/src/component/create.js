import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/create.css'


function Create() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [file,setFile] = useState()
  const [imagePreview, setImagePreview] = useState();
  const [status,setStatus]=useState("");
  const navigate = useNavigate()

  const [tags,setTags] = useState([])
 
  const [id,setId] = useState("")


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        if (res.data.Status === "Success") { 
          setId(res.data.id);
          console.log(res.data.id + " from create"); // Log the name from the response data
        }
      })
      .catch(err => console.log(err)); // Add error handling here
  }, []); 

  function handlSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('status',status)
    formData.append('file', file);
    formData.append('tags', JSON.stringify(tags));


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

   function handleKeyDwon(e){
          if(e.key !== 'Enter') return
          const val = e.target.value
          if(!val.trim()) return
          setTags([...tags,val])
          e.target.value=''
   }
   function removeTag(index){
     setTags(tags.filter((el,i)=> i !== index))
     
   }
   
  
     const numtags = tags.length

    return (
      <div className="create-projects">    
              <Link  to='/project' ><h3>Back</h3></Link>
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

                           <select onChange={e => setStatus(e.target.value)} className='status' required>
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

                              <h3>Enter some tags ({numtags}/2) </h3>
                              <div className='tags'>
                                    
                                    {
                                      tags.map((tag,index)=>(
                                        <div className="tag-item" key={index}>
                                          <span className='text'>{tag}</span>
                                          <span className='close'onClick={()=> removeTag(index)} >&times;</span>
                                       </div>
                                      ))
                                    }
                                    {
                                      tags.length<2 &&(
                                      <input type='texts' 
                                      className='tags-input'
                                       placeholder='Type something'
                                      onKeyDown={handleKeyDwon}
                                      required
                                      /> 
                                      )}
                              </div>
                    </div>

                    </div>
                    
                    <button >Add</button>

                  </form>
         </div>
      )
    }


    export default Create;