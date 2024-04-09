import { useReducer } from "react";
import reducer, { initialState } from "../reducers/reducer";
import { Task } from "../types/types";


export function useTaskList() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAddFiveTasks = () => {
        dispatch({ type: "SET_FIVE_ELEMENTS", payload: 5 });
    }
    const handleAddTask = () => {
        const task: Task = {
            id: state.tasks.length + 1,
            title: `Task ${state.tasks.length + 1}`,
            value: Math.floor(Math.random() * 100) + 1,
        };
        dispatch({ type: "ADD_TASK", payload: task });
    };

    const handleEditTask = (task: Task) => {
        dispatch({ type: "EDIT_TASK", payload: task });
    };

    const handleDeleteTask = (id: number) => {
        dispatch({ type: "DELETE_TASK", payload: id });
    };
    const handleSort = () => {
        dispatch({ type: "SORT", payload: null });
    }
    const handleSetTasks = (task: Task[]) => {
        dispatch({ type: "SET_TASKS", payload: task });
    }
    const handleSetFilter = (filter: string) => {
        dispatch({ type: "SET_FILTER", payload: filter });
    };

    return {
        handleAddTask,
        handleSort,
        handleAddFiveTasks,
        handleEditTask,
        handleSetTasks,
        handleDeleteTask,
        handleSetFilter,
        ...state,
    };
}