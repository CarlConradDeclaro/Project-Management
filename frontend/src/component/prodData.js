
import { useEffect, useState } from 'react';
import {useParams ,useLocation, Link, Navigate, useNavigate} from 'react-router-dom'
import Sidebar  from "./sidebar";
import '../styles/prodData.css'
import axios from 'axios';
 

 


function ProductData(){
  
    const navigate = useNavigate()
    
    const {id,owner} = useParams()
    
    const [prodId,setProdId] = useState(null); // project id 
    
    const [prodOwner,setProdOwner] = useState(null); // project owener id
    const [user,setUser] =useState('') // userId
    const [userName,setUserName] = useState('') // user name
 
  
    const location = useLocation()

    const [taskDetails, setTaskDetails] = useState('');
    const [taskAssign, setTaskAssign] = useState('');
    const [taskStatus, setTaskStatus] = useState('working');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [priority,setPriority] = useState("low");

     const [members,setMembers] = useState([])
    const [task,setTask] =useState([])

    const [project,setProject] = useState([])
  
     useEffect(()=>{
        setProdId(id);
        setProdOwner(owner)
       
        
    })

    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8000')
        .then(res => {
          if (res.data.Status === "Success") {    
            setUser(res.data.id);
            setUserName(res.data.name)
           }  
        })
        .catch(err => console.log(err)); // Add error handling here
    }, []);






     const [create,setCreate] = useState(false)

    const createTask = () => {
       setCreate(true)
           
    };

    const  numTask = task.filter( t =>(t.projId == prodId)).length

    const handleSave = () => {
         const taskData = {
            id: prodId,
            details: taskDetails,
            assign: taskAssign,
            status: taskStatus,
            dueDate: taskDueDate,
            numTask: numTask,
            priority:priority
        };

        axios.post("http://localhost:8000/create-task", taskData)
        .then(res => {        
            console.log(res.data);
        })
        .catch(err => console.log(err));

     
         // Reset form fields
        setTaskDetails('');
         setTaskStatus('working');
        setTaskDueDate('');
        setCreate(false)
        setMembers([])
      };


   

    useEffect(()=>{
        axios.get("http://localhost:8000/project")
        .then(res => 
            setProject(res.data)   
            )
        .catch(err => console.log(err))
    })


    useEffect(()=>{
        axios.get("http://localhost:8000/getTask")
        .then(res => setTask(res.data))
        .catch(err => console.log(err))
    })
  

    function handleKeyDownAssign(e){

        if(e.key !== 'Enter') return
        const val = project.find(u => u.members.includes(e.target.value) )
         if(val || userName == e.target.value){     
                setMembers([...members,e.target.value])
                setTaskAssign(e.target.value)
                console.log('User '+e.target.value + ' Found!');                  
        }else{
          console.log('User '+e.target.value + ' not Found!');
        }   
        e.target.value=''
        
    
       
    }
 
    function removeMem(index){
        setMembers(members.filter((el,i)=> i !== index))     
    }


    function handleDelete (idd){

        const id =idd
        const prodIdd =  prodId
        const numTTask = numTask   
       

            axios.delete(`http://localhost:8000/task/${id}/${numTTask}/${prodIdd}`)
                .then(response => {
                    console.log("Item deleted successfully");
                    // Perform any necessary UI updates
                })
                .catch(error => {
                    console.error("Error deleting item:", error);
                    // Handle error cases, such as displaying an error message
                });
                
    };
    
    const prodDetails = project.filter(project => project.id == prodId);
    const projectTitles = prodDetails.map(project => project.projectTitle);
    let projectDetails = prodDetails.map(project => project.description);

      

    function handleDeleteProj(){
          
        axios.delete(`http://localhost:8000/project-delete/${prodId}`)
        .then(res =>{            
            navigate('/project');
                console.log("Project deleted");
        }).catch(err => console.log(err))

       
    }

    return(
        <div className='prodData-container'>
             <Sidebar   /> 
               <div  className='prodData-content'>
                        

                    <div className='prodData-header'>

                           <div className='prodData-title'>
                                <div className='prodTitle'>
                                        <h1 className='prodData-title'>{projectTitles}  </h1>   
                                        {
                                            prodOwner == user &&
                                        <img src={`http://localhost:8000/images/prodEdit.png`} /> 
                                        }
                                </div>

                                <div className='prod-Delete'>
                                     
                                     {
                                           prodOwner == user ?     <img src={`http://localhost:8000/images/dots.png`} />  : <></>
                                     }
                                        <div class="Proddelete">
                                                <button onClick={handleDeleteProj}>Delete</button>        
                                        </div>
                                </div>

                           </div>

                           <div className='prodData-Details'>
                                    <p>{projectDetails}</p>
                            </div>
                    </div>


                    <div className='prodData-create' >
                        <div className='prodData-create-Controls'>
                               {
                                prodOwner == user &&
                                <div className='add-member'>
                                    <img src={`http://localhost:8000/images/addMember.png`} /> 
                                    <p>add member</p>
                                </div>
                              }

                                <div className='see-member'>
                                   <img src={`http://localhost:8000/images/people.png`} /> 
                                    <p>People</p>
                               </div>

                               <div className='see-stats'>
                                   <img src={`http://localhost:8000/images/stats.png`} /> 
                                    <p>Stats</p>
                               </div>

                               {
                                prodOwner == user &&
                               <div className='mark-a-done'>   
                                     <p>Mark as:</p>
                                     <button>Done</button>
                                     
                               </div>
                                }
                             
                        </div>
                      
                           {
                             prodOwner == user ?  <button onClick={createTask}>+</button> : <></>
                             
                           }   
                            
                           
                    </div>

                    <div className='prodData-Task'>
                   
                    <table  >             
                          <thead>           
                               <tr>
                                    <th>Task  ({numTask})</th>
                                    <th>Assignee</th>   
                                    <th>Status</th>     
                                    <th>Priority</th>      
                                    <th>Due Date</th>
                                    
                                   { prodOwner == user && <th>Controls</th> }   
                                   
                                   
                              </tr>
                         </thead>
                                <tbody>
                                {
                                    create == true ?  
                                    <>
                                            <td className='task-details'>
                                                <textarea    type='text' 
                                                    value={taskDetails}
                                                    onChange={(e) => setTaskDetails(e.target.value)}
                                                    placeholder='255 words only'
                                                />  
                                            </td>                 
                                            <td className='task-Assign'>

                                              {
                                                members.map((tag,index)=>(
                                                    <div className="tag-member" key={index}>
                                                    <span className='text'>{tag}</span>
                                                    <span className='close'onClick={()=> removeMem(index)} >&times;</span>
                                                </div>
                                                ))
                                                }
                                            {
                                               
                                               members.length < 1 && (
                                                <input type='texts' 
                                                className='tags-inputMem'
                                                 placeholder='Type Members'
                                                onKeyDown={ handleKeyDownAssign}
                                                required
                                                /> 
                                              )  
    
                                              }
                                            </td>      
                                            <td className='task-Status'>
                                                <select 
                                                value={taskStatus}
                                                onChange={(e) => setTaskStatus(e.target.value)}
                                                >
                                                    <option value="working">Working</option>
                                                </select>
                                            </td>

                                            <td>
                                                <select 
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    >
                                                        <option value="low">Low</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                </select>
                                            </td>       

                                            <td className='task-DueDate' 
                                            value={taskDueDate}
                                            onChange={(e) => setTaskDueDate(e.target.value)}
                                            > 
                                                   <input type='date'/>
                                            </td>
                                            <td colSpan="2" className='task-Btn' >
                                                <button onClick={handleSave}>Save</button>
                                                <button onClick={e => setCreate(false)}>discard</button>
                                            </td>  
                                   </>
                                    : <></>
                                }   
                                                                             
                                  
                                        {
                                          
                                              task.filter(data => data.projId === parseInt(prodId)).slice().reverse().map((data) => (
                                                <tr key={data.id}  className='task' > 
                                                    <td className="details-cell">{data.details}</td>
                                                    <td  className='assign-user-profile'>
                                                        <div>
                                                            {data.assign}
                                                            <div>
                                                        <img src={`http://localhost:8000/images/nft.jpg`}  alt="Project" />

                                                        </div>
                                                        </div>
                                                       

                                                    </td>
                                                    <td className='prodData-status'><p>{data.status}</p></td>
                                                    <td className={data.priority === "low" ?   'prodData-priority-low' :  data.priority === "medium" ? 'prodData-priority-medium' : 'prodData-priority-high'}><p>{data.priority}</p></td>                                    
                                                    <td><p className='prodData-date'>{data.dueDate.split('T')[0]}</p></td>
                                                   {
                                                    prodOwner == user ? 
                                                    <td colSpan="2" className='task-Btn'>
                                                    <button onClick={e => setCreate(false)}>  Update  </button>
                                                    <button onClick={() => handleDelete(data.id)}>Delete</button>
                                                   </td>  
                                                    : 
                                                //     <td colSpan="2" className='task-Btn'>
                                                //     <button >Suggeestion</button>
                                                   
                                                //    </td> 
                                                <></>
                                              
                                                   }
                                                   
                                                </tr> 
                                            ))
                                            
                                        }
                                      
                        </tbody>
            </table>
                              

                           
                        
                           
                    </div>



               </div>
        </div>
    )
}

export default ProductData;