
import Create from "./component/create";
import Login from "./component/login";
import Projects from "./component/projects";
import Sidebar  from "./component/sidebar";
import SignIn from "./component/signIn";
import Task from "./component/task";
import './styles/app.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'




function App() {
  return (
    <div className="App">
       <BrowserRouter>
            <Routes>
               <Route path='/' element={<SignIn />} />
               <Route path='/login' element={<Login />} />
               <Route path='/project' element={<Projects />} />  
               <Route path='/task' element={<Task />} />            
               <Route path='/project/create' element={<Create />} /> 
                
            </Routes>         
        </BrowserRouter>      
    </div>
  );
}

export default App;
