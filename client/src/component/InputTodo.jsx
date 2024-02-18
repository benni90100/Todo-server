import { useState } from "react"

export function InputTodo() {
    const [description, setDescription]=useState("")
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const body = {description}
            const response = await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(body)
            })
            console.log(response)
            setDescription("")
        } catch (error) {
            console.error(error.message);
        }
    }
    const handleChange = (e)=>{
        const value= e.target.value
        setDescription(value)
        e.target.value=""
    }
    async function handleDelete() {
        try {
            const body = {description}
            const response = await fetch("http://localhost:5000/todos",{
                method: "DELETE",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(body)
            })
            console.log(response)
            setDescription("")
        } catch (error) {
            console.error(error.message);
        }
    }

     return (
        <>
        <div className="flex justify-center pt-2">
        <h1 className="p-4 bg-green-100 ">input todo</h1>
        <form className="flex justify-center " onSubmit={ handleSubmit}>
            <input type="text" className=" border-2 p-2 ml-2" value={description} onChange={handleChange}/>
            <button className=" bg-amber-700 p-3 rounded m-2">Add</button>
            <button className=" bg-amber-700 p-3 rounded m-2" onClick={handleDelete}>CLEAR</button>
        </form>
        </div>
        </>
        
    )
}