import React, { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { useDispatch } from "react-redux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { FilterValuesType } from "./AppWithRedux";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );


  const addTask = (title: string) => {
    dispatch(addTaskAC(title, props.id));
  };

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  const onAllClickHandler = () => props.changeFilter(props.id, "all");
  const onActiveClickHandler = () => props.changeFilter(props.id, "active");
  const onCompletedClickHandler = () =>
    props.changeFilter(props.id, "completed");

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
      tasksForTodolist = allTodolistTasks.filter(
        (t) => t.isDone === false
      );
    }
    if (props.filter === "completed") {
      tasksForTodolist = allTodolistTasks.filter(
        (t) => t.isDone === true
      );
    }

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {tasksForTodolist.map((t) => {
          const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));;
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
          };
          const onTitleChangeHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                checked={t.isDone}
                color="primary"
                onChange={onChangeHandler}
              />

              <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
