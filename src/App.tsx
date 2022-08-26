import React, { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type filterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string;
  title: string;
  filter: filterValuesType;
};
type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let task = tasks[todolistId];
    let newTasks = [newTask, ...task];
    tasks[todolistId] = newTasks;
    setTasks({ ...tasks });
  }

  function removeTask(id: string, todolistId: string) {
    let task = tasks[todolistId];
    const filteredTasks = task.filter((task) => task.id !== id);
    tasks[todolistId] = filteredTasks;
    setTasks({ ...tasks });
  }

  function changeFilter(value: filterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  }

  function changeTaskStatus(
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) {
    let task = tasks[todolistId];
    let newTask = task.find((t) => t.id === taskId);
    if (newTask) {
      newTask.isDone = isDone;
    }
    setTasks({ ...tasks });
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let task = tasks[todolistId];
    let newTask = task.find((t) => t.id === taskId);
    if (newTask) {
      newTask.title = newTitle;
    }
    setTasks({ ...tasks });
  }

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "what to buy", filter: "all" },
    { id: todolistId2, title: "what to learn", filter: "all" },
  ]);

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasks[todolistId];
    setTasks(tasks);
  };
  const changeTodolistTitle = (id: string, newTitle: string) => {
    const todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  };

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "cheese", isDone: false },
    ],
  });

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasks,
      [todolist.id]: [],
    });
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {
        let taskForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
          taskForTodolist = taskForTodolist.filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          taskForTodolist = taskForTodolist.filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={taskForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
