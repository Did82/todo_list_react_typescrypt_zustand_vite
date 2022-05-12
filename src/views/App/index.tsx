import React from "react";

import styles from "./index.module.scss";

import {useTodoStore} from "../../data/stores/useToDoStore";
import {InputPlus} from "./components/InputPlus";
import {InputTask} from "./components/InputTask";

export const App: React.FC = () => {
    const [tasks, createTask, updateTask, removeTask] = useTodoStore(state => [
        state.tasks, state.createTask, state.updateTask, state.removeTask
    ]);

    console.log(tasks);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InputPlus onAdd={createTask} />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleParagraph}>No tasks</p>
                )}
                {tasks.map(task => (
                    <InputTask key={task.id} id={task.id} title={task.title} onEdit={updateTask} onDone={removeTask} onRemove={removeTask} />
                ))}
            </section>
        </article>
    );
}
