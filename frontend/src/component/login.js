import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";



function Login() {

  //const [account,getAccount] = useState([]);

  const [name,setAcc] = useState("")
  const [password,setUserPass] = useState("")
  


  const navigate = useNavigate()
  
  


    // useEffect(()=>{
    //     axios.get("http://localhost:8000/login")
    //     .then(res => getAccount(res.data))
    //     .catch(err => console.log(err))
    // },[])


    
    axios.defaults.withCredentials = true;
    function handleLogIn(e){
        e.preventDefault();
        //  const aunthenticationUser = account.find(account => account.name === userAcc && account.password === userPass)
        // if(aunthenticationUser){
        // navigate("/project");
        // console.log("Login Succesfully");
        // }else
        // console.log("Invalid username or password");

        axios.post("http://localhost:8000/login",{ name: name, password: password })
        .then(res=>{
            if(res.data.Status === "Success"){
                const userId = res.data.id; // Access the user ID from the response data
                navigate('/project');
                console.log("User ID:", userId);
                }else{
                    alert("Error")
                }
        }).then(err => console.log(err))
      
    }

    

    return (
      <div className="projects">    
                     <div className="Log-in">    
              <form onSubmit={handleLogIn}>

                <label htmlFor="username">Username: </label>
                <input type="text" placeholder="name" name="username"  required 
                 onChange={e => setAcc(e.target.value)}
                />

                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="password" name="password" required
                 onChange={e => setUserPass(e.target.value)}
                />
                
                <button>Login</button>
              </form>   
              <Link to="/"><p>Don't have an account?</p></Link>  
              
        </div>
        </div>
    )
    }
 
    export default Login ;