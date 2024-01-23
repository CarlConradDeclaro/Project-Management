
import Projects from "./component/projects";
import Sidebar  from "./component/sidebar";
import Task from "./component/task";
import './styles/app.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'




function App() {
  return (
    <div className="App">
       <BrowserRouter>
            <Routes>
               <Route path='/' element={<Sidebar />} />  
               <Route path='/project' element={<Projects />} />  
               <Route path='/task' element={<Task />} /> 
            </Routes>         
        </BrowserRouter>      
    </div>
  );
}

export default App;
