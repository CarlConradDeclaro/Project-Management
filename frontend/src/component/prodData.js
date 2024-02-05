
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Sidebar  from "./sidebar";
import '../styles/prodData.css'


 


function ProductData(){
  
    const {id} = useParams()
    const [prodId,setProdId] = useState(null);
    const [taskDetails, setTaskDetails] = useState('');
    const [taskAssign, setTaskAssign] = useState('');
    const [taskStatus, setTaskStatus] = useState('working');
    const [taskDueDate, setTaskDueDate] = useState('');

  
    useEffect(()=>{
        setProdId(id);
    })


    const [rowCount, setRowCount] = useState(0);
    const [create,setCreate] = useState(false)

    const createTask = () => {
             setCreate(true)
    };

    const handleSave = () => {
        // Prepare the task data object
        const taskData = {
            details: taskDetails,
            assign: taskAssign,
            status: taskStatus,
            dueDate: taskDueDate
        };

       console.log(taskData.details);
         // Reset form fields
        setTaskDetails('');
        setTaskAssign('');
        setTaskStatus('working');
        setTaskDueDate('');
        setCreate(false)
    };

 
     
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
                                                />  
                                            </td>                 
                                            <td className='task-Assign'>
                                                <input 
                                                    value={taskAssign}
                                                    onChange={(e) => setTaskAssign(e.target.value)}
                                                />
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
                                    <tr>
                                        <td>sda</td>
                                        <td>sda</td>
                                        <td>sda</td>
                                        <td>sda</td>
                                        <td colSpan="2" className='task-Btn' >
                                            <button onClick={e => setCreate(false)}>Edit</button>
                                            <button onClick={e => setCreate(false)}>Delete</button>
                                        </td>  
                                    </tr> 
                        </tbody>
            </table>
                              

                           
                        
                           
                    </div>



               </div>
        </div>
    )
}

export default ProductData;