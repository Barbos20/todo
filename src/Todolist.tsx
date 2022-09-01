import { Button, ButtonGroup, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { filterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
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
            <div key={task.id} className={task.isDone ? "is-done" : ""}>
              <Checkbox
                checked={task.isDone}
                onChange={onChangeStatusHandler}
                size="small"
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </ul>
      <div>
        <ButtonGroup  aria-label="outlined button group">
          <Button
          variant={props.filter === "all" ? "contained" : "text"}
            onClick={onAllClickHandler}
          >
            ALL
          </Button>
          <Button
            variant={props.filter === "active" ? "contained" : "text"}
            onClick={onActiveClickHandler}
          >
            ACTIVE
          </Button>
          <Button
            variant={props.filter === "completed" ? "contained" : "text"}
            onClick={onComplitedClickHandler}
          >
            COMPLITED
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
