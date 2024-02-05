
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Sidebar  from "./sidebar";
import '../styles/prodData.css'

const Task = ()=>{
   return(
       < > 
                   <td className='task-details'><textarea    type='text'  />  </td>                 
                    <td className='tast-Assign'><input /></td>              
                       <td className='task-DueDate'> <input type='date'/></td>
                           
                          
                           <td> <button>Save</button></td>
                            
                                   
        </ >
   )
}


function ProductData(){
  
    const {id} = useParams()

    const [prodId,setProdId] = useState(null);

  
    useEffect(()=>{
        setProdId(id);
    })


    const [rowCount, setRowCount] = useState(0);

    const createTask = () => {
        setRowCount(rowCount + 1);
    };

    return(
        <div className='prodData-container'>
             <Sidebar   />
               <div  className='prodData-content'>
                        

                    <div className='prodData-header'>
                           <div className='prodData-title'>
                               <h1 className='prodData-title'>Project Title</h1>   
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
                                    <tr>
                                        <th>Task</th>
                                        <th>Assign Name</th>                           
                                        <th>Due Date</th>
                                        <th>Controls</th>
                                    </tr>

                             {/* {Array.from({ length: rowCount }).map((_, index) => (
                                <tr key={index}>
                                    <Task />
                                </tr>
                            ))}  */}
                             <tr >
                            <Task />
                        </tr>
                                 
                                   
                                 
                            </table>
                    </div>



               </div>
        </div>
    )
}

export default ProductData;