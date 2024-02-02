import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";



function Login() {

  const [account,getAccount] = useState([]);

  const [userAcc,setAcc] = useState("")
  const [userPass,setUserPass] = useState("")

  const navigate = useNavigate()

   


    useEffect(()=>{
        axios.get("http://localhost:8000/login")
        .then(res => getAccount(res.data))
        .catch(err => console.log(err))
    },[])


    

    function handleLogIn(e){
        e.preventDefault();
         const aunthenticationUser = account.find(account => account.name === userAcc && account.password === userPass)
        if(aunthenticationUser){
        navigate("/project", { state: { userAcc, userPass } });
        console.log("Login Succesfully");
        }else
        console.log("Invalid username or password");
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


    export default Login;