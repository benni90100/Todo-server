import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { InputTodo } from "./component/InputTodo";
import { ListTodo } from "./component/ListTodo";

function App() {


  return (
    <>
   <div className="flex flex-col justify-center items-center bg-slate-800">
   <InputTodo/>
   <ListTodo/>
   </div>
    </>
  )
}

export default App
