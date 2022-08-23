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
};

export function Todolist(props: TodolistPropsType) {
  const [newTaskTitile, setNewTaskTitile] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitile(e.currentTarget.value);
  };
  const addTask = () => {
    props.addTask(newTaskTitile);
    setNewTaskTitile("");
  };
  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask();
    }
  };
  const onAllClickHandler = () => {
    props.changeFilter("active");
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
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id);
          };
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onComplitedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
