import axios from "axios";
import { useEffect, useId, useState } from "react";

export const useTask = () => {
    const [task, setTask] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/getTask')
            .then(res => setTask(res.data))
            .catch(err => console.log(err));        
    });

    return task;
};

export const useProject = () => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/project")
            .then(res => setProject(res.data))
            .catch(err => console.log(err));
    });

    return project;
};




export const useUserName = ()=>{
    const [userName,setUserName] = useState('') // user name
     axios.defaults.withCredentials = true;
     useEffect(() => {
       axios.get('http://localhost:8000')
         .then(res => {
           if (res.data.Status === "Success") {     
             setUserName(res.data.name)
            }  
         })
         .catch(err => console.log(err)); // Add error handling here
     });
   return userName;
}

export const useUserId = ()=>{
    const [userId,setuserId] = useState('') // user name
     axios.defaults.withCredentials = true;
     useEffect(() => {
       axios.get('http://localhost:8000')
         .then(res => {
           if (res.data.Status === "Success") {     
            setuserId(res.data.id);
            }  
         })
         .catch(err => console.log(err)); // Add error handling here
     });
   return userId;
}


export const useUsers = () =>{
  const [users,setUsers] = useState([])
    useEffect(() =>{
      axios.get('http://localhost:8000/create/users')
      .then(res => {         
            setUsers(res.data)
       
      })
      .catch(err => console.log(err)); // Add error handling here
  
    })
    console.log('w');
    return users
}