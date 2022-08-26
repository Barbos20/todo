import React, { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { filterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: filterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: filterValuesType;
  id: string;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: TodolistPropsType) {
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onComplitedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <button onClick={removeTodolist}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
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
