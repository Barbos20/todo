import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { filterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string,todolistId:string) => void;
  changeFilter: (value: filterValuesType, todolistId:string) => void;
  addTask: (title: string,todolistId:string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean,todolistId:string) => void;
  filter: filterValuesType;
  id:string
  removeTodolist:(todolistId:string)=> void
};

export function Todolist(props: TodolistPropsType) {
  const [newTaskTitile, setNewTaskTitile] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitile(e.currentTarget.value);
  };
  const addTask = () => {
    if (newTaskTitile.trim() !== "") {
      props.addTask(newTaskTitile.trim(), props.id);
      setNewTaskTitile("");
    } else {
      setError("Title is required");
    }
  };
  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active",props.id);
  };
  const onComplitedClickHandler = () => {
    props.changeFilter("completed",props.id);
  };
const removeTodolist=()=>{
  props.removeTodolist(props.id)
}

  return (
    <div>
      <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
      <div>
        <input
          value={newTaskTitile}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHendler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onComplitedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
