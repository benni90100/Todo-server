import { useEffect, useState } from "react"

export function ListTodo() {
const [data, setdata] = useState(null)
    async function fetchTodoItem() {
        try {
            const req = await fetch("http://localhost:5000/todos/")
        const res = await req.json()
        setdata(res)
        } catch (error) {
            console.error(error.massage);
        }
    }
  
    useEffect(()=>{fetchTodoItem()}, [data])
    return(
        <>
        <ul>
            {data && data.map((todo)=>{
                return(
                    <li className="p-2  m-1 text-red-600 rounded border-cyan-700 " key={todo.todo_id}>  {todo.description} </li>
                )
            })}
        </ul>
        </>
    )
}