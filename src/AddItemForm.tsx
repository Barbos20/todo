import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitile, setNewTaskTitile] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitile(e.currentTarget.value);
  };
  const addTask = () => {
    if (newTaskTitile.trim() !== "") {
      props.addItem(newTaskTitile.trim());
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
  return (
    <div>
      <TextField
        label="Task"
        variant="outlined"
        value={newTaskTitile}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHendler}
        className={error ? "error" : "input"}
      />
      <Fab color="primary" aria-label="add" onClick={addTask}>
        <AddIcon />
      </Fab>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
