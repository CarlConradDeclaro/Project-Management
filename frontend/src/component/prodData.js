
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Sidebar  from "./sidebar";
import '../styles/prodData.css'
import axios from 'axios';


 


function ProductData(){
  
    const {id} = useParams()
    const [prodId,setProdId] = useState(null);
    const [taskDetails, setTaskDetails] = useState('');
    const [taskAssign, setTaskAssign] = useState('');
    const [taskStatus, setTaskStatus] = useState('working');
    const [taskDueDate, setTaskDueDate] = useState('');

    const [users,setUsers] = useState([])
    const [members,setMembers] = useState([])
    const [task,setTask] =useState([])
 
     useEffect(()=>{
        setProdId(id);
    })


     const [create,setCreate] = useState(false)

    const createTask = () => {
             setCreate(true)
    };

    const handleSave = () => {
         const taskData = {
            id: prodId,
            details: taskDetails,
            assign: taskAssign,
            status: taskStatus,
            dueDate: taskDueDate
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
        axios.get("http://localhost:8000/create/users")
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    })

    useEffect(()=>{
        axios.get("http://localhost:8000/getTask")
        .then(res => setTask(res.data))
        .catch(err => console.log(err))
    })
  

    function handleKeyDownAssign(e){
        if(e.key !== 'Enter') return
        const val = users.find(u => u.name === e.target.value)
        if(val  ){
              if(!members.includes(val.name)){
                setMembers([...members,val.name])
                setTaskAssign(val.name)
                console.log('User '+e.target.value + ' Found!');
              }else
              console.log('User '+e.target.value + ' already added!');
                     
        }else{
          console.log('User '+e.target.value + ' not Found!');
        }   
        e.target.value=''
    }
 
    function removeMem(index){
        setMembers(members.filter((el,i)=> i !== index))     
    }
     
    return(
        <div className='prodData-container'>
             <Sidebar   />
               <div  className='prodData-content'>
                        

                    <div className='prodData-header'>
                           <div className='prodData-title'>
                               <h1 className='prodData-title'>Project Title {prodId}</h1>   
                           </div>

                           <div className='prodData-Details'>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum eligendi, laudantium omnis nemo ratione est velit vitae optio earum eos eum! A dolores minus autem aperiam eveniet. Placeat, voluptatibus? ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum eligendi, laudantium omnis nemo ratione est velit vitae optio earum eos eum!ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum eligendi, laudantium omnis nemo ratione est velit vitae optio earum eos eum! A dolores minus autem aperiam eveniet. Placeat, voluptatibus? A dolores minus autem aperiam eveniet. Placeat, voluptatibus?</p>          
                           </div>
                    </div>


                    <div className='prodData-create' onClick={createTask}>
                            <button>+</button>
                    </div>

                    <div className='prodData-Task'>
                   
                    <table>             
                          <thead>           
                               <tr>
                                    <th>Task</th>
                                    <th>Assign Name</th>   
                                    <th>Status</th>         
                                    <th>Due Date</th>
                                    <th>Controls</th>
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
                                                <tr key={data.id}> 
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
                                                    <td>{data.dueDate.split('T')[0]}</td>
                                                    <td colSpan="2" className='task-Btn'>
                                                        <button onClick={e => setCreate(false)}>Edit</button>
                                                        <button onClick={e => setCreate(false)}>Delete</button>
                                                    </td>  
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