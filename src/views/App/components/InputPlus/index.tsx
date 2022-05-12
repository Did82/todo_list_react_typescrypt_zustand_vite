import styles from "./index.module.scss";
import React from "react";
import {Plus} from "tabler-icons-react";

interface InputPlusProps {
    onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({onAdd}) => {
    const [title, setTitle] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        title && onAdd(title);
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={title}
                placeholder={"Some task"}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit}
                className={styles.formInput}/>
            <button type="submit" className={styles.formButton}>
                <Plus size={24} color={'aliceblue'} />
            </button>
        </form>
    )
}
