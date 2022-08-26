import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange:(newValue:string)=>void
};

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title)
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      activateViewMode();
    }
  };
  return (
    <>
      {editMode ? (
        <input
          value={title}
          onChange={onChangeTitleHandler}
          onBlur={activateViewMode}
          onKeyPress={onKeyPressHendler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
      )}
    </>
  );
}
