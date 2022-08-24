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
  removeTask: (id: string) => void;
  changeFilter: (value: filterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: filterValuesType;
};

export function Todolist(props: TodolistPropsType) {
  const [newTaskTitile, setNewTaskTitile] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitile(e.currentTarget.value);
  };
  const addTask = () => {
    if (newTaskTitile.trim() !== "") {
      props.addTask(newTaskTitile.trim());
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
    props.changeFilter("all");
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active");
  };
  const onComplitedClickHandler = () => {
    props.changeFilter("complited");
  };
  return (
    <div>
      <h3>{props.title}</h3>
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
            props.removeTask(task.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked);
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
          className={props.filter === "complited" ? "active-filter" : ""}
          onClick={onComplitedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
