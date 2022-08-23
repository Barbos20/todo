import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type filterValuesType = "all" | "active" | "complited";

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);
  const [filter, setFilter] = useState<filterValuesType>("all");

console.log(tasks)

function addTask(title:string){
  let newTask={
    id: v1(), title: title, isDone: false 
  }
  let newTasks = [newTask,...tasks]
  setTasks(newTasks)
}

  function removeTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function changeFilter(value: filterValuesType) {
    setFilter(value);
  }

  let taskForTodolist = tasks;
  if (filter === "active") {
    taskForTodolist = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "complited") {
    taskForTodolist = tasks.filter((t) => t.isDone === true);
  }

  return (
    <div className="App">
      <Todolist
        title={"What to learn"}
        tasks={taskForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
