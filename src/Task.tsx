import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { EditableSpan } from "./EditableSpan";
import {
  removeTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from "./state/tasks-reducer";
import { TaskType } from "./Todolist";

type TaskPropsType = {
  todolistId: string;
  task: TaskType;
};

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const onClickHandler = () =>
    dispatch(removeTaskAC(props.task.id, props.todolistId));
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(
      changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId)
    );
  };
  const onTitleChangeHandler = useCallback((newValue: string) => {
    dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
  },[dispatch,props.task.id, props.todolistId]);

  return (
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={props.task.isDone}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
