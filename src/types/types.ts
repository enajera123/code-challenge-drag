export interface AddTaskAction {
  type: "ADD_TASK";
  payload: Task;
}

export interface EditTaskAction {
  type: "EDIT_TASK";
  payload: Task;
}

export interface DeleteTaskAction {
  type: "DELETE_TASK";
  payload: number;
}

export interface SetFilterAction {
  type: "SET_FILTER";
  payload: string;
}
export interface Sort {
  type: "SORT";
  payload: null;
}
export interface SetTasks {
  type: "SET_TASKS";
  payload: Task[];
}

export interface SetFiveElements {
  type: "SET_FIVE_ELEMENTS";
  payload: number;
}
export interface Task {
  id: number;
  title: string;
  value: number;
}

export type Action = Sort | SetTasks | SetFiveElements | AddTaskAction | EditTaskAction | DeleteTaskAction | SetFilterAction;