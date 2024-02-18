const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Per consentire l'uso del corpo della richiesta come JSON

// recupero tutti gli elementi del database
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});
// recuper un singolo elemento del database
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//inserisco un todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//cancello un elemento dal database
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo eliminato");
  } catch (err) {
    console.error(err.message);
  }
});
app.delete("/todos/", async (req, res) => {
  try {
    const deleteAllTodo = await pool.query("DELETE FROM todo ",);
    res.json("tutti i Todo eliminati");
  } catch (err) {
    console.error(err.message);
  }
});
//aggiorno un dato del database
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description =$1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("oggetto aggiornato");
  } catch (err) {
    console.error(err.message);
  }
});

// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Il server è in esecuzione sulla porta ${PORT}.`);
});
