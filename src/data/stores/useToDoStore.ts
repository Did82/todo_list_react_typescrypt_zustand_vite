import create from "zustand";
import cuid from "cuid";

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface TodoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, title: string) => void;
}

const localStorageUpdate = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export const useTodoStore = create<TodoStore>((set, get) => ({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

    createTask: (title: string) => {
        const newTask: Task = {
            id: cuid(),
            title,
            createdAt: Date.now()
        };

        set(state => ({
                ...state,
                tasks: [newTask, ...state.tasks]
            }
        ));

        localStorageUpdate(get().tasks);

        return newTask;
    },

    removeTask: (id: string) => {
        set(state => ({
                ...state,
                tasks: state.tasks.filter(task => task.id !== id)
            }
        ));
        localStorageUpdate(get().tasks);
    },

    updateTask: (id: string, title: string) => {
        set(state => ({
                ...state,
                tasks: state.tasks.map(task => task.id === id ? {...task, title} : task)
            }
        ));
        localStorageUpdate(get().tasks);
    },

}));
