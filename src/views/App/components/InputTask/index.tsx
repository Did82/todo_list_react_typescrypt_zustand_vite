import styles from "./index.module.scss";
import React from "react";
import {Check, Edit, Trash} from "tabler-icons-react";

interface InputTaskProps {
    id: string;
    title: string;
    onEdit: (id: string, title: string) => void;
    onDone: (id: string) => void;
    onRemove: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({id, title, onEdit, onDone, onRemove}) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const [value, setValue] = React.useState(title);

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    onChange={() => {
                        setTimeout(() => {
                            onDone(id);
                        }, 200);
                    }}
                    className={styles.inputTaskLabelCheckbox}
                    disabled={isEdit}
                />
                {!isEdit
                    ? <h3 className={styles.inputTaskLabelTitle}>{title}</h3>
                    : <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={styles.inputTaskLabelInput}
                        autoFocus={true}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onEdit(id, value);
                                setIsEdit(!isEdit);
                            }
                        }
                        }
                    />}
            </label>
            <button className={styles.inputTaskButton} onClick={() => {
                setIsEdit(!isEdit);
                onEdit(id, value);
            }}>
                {!isEdit
                    ? <Edit color={'#3F72AF'}/>
                    : <Check color={'green'}/>}
            </button>
            <button className={styles.inputTaskButton} onClick={() => onRemove(id)}>
                <Trash color={'red'}/>
            </button>
        </div>
    )
}
