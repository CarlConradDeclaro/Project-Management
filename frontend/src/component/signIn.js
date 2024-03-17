import axios from "axios";
import {useState } from "react";
import {Link ,useNavigate} from "react-router-dom";


function SignIn() {

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()
    function handleSignIn(e) {
        e.preventDefault();
        
        const formData = {
            name: name,
            password: password
        };
        axios.post("http://localhost:8000/SignIn", formData)
            .then(res => {
                setName('');
                setPassword('');
                if(res.data.success === true){
                navigate('/login')
                }
            })
            .catch(err => console.log(err));
    }

    return(
        <div className="Sign-in">    
                <form onSubmit={handleSignIn}>

                    <label htmlFor="username">Username: </label>
                    <input type="text" placeholder="name" name="username"  required 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />

                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="password" name="password" required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    
                    <button>SignIn</button>
                </form>   
                <Link to="/login"><p>Already have an account?</p></Link>     
       </div>
    )
    }


    export default SignIn;