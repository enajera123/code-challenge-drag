import { useEffect, useState } from "react";
import { useTaskList } from "./hooks/useTasklist";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
export const App: React.FC = () => {
  const {
    handleSetFilter,
    handleEditTask,
    handleDeleteTask,
    handleAddTask,
    handleAddFiveTasks,
    handleSort,
    handleSetTasks,
    filter,
    tasks,
  } = useTaskList();
  const [drag,setDrag] = useState("")
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTaskValue, setEditTaskValue] = useState<string>("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(()=>{
  setDrag("1")
  },[tasks])

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTaskValue(event.target.value);
  };

  const handleSubmitEdit = () => {
    if (editingTaskId !== null) {
      handleEditTask({ id: editingTaskId, title: editTaskValue, value: Math.random() * 100 });
      setEditingTaskId(null);
      setEditTaskValue("");
    }
  };
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleSetTasks(items);
  };
  const handleSetFiveElements = () => {
    handleAddFiveTasks();
  }

  return (
    <div>
      Filtro: <input type="text" value={filter} onChange={(e) => handleSetFilter(e.target.value)} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* <Droppable droppableId={new Date().toISOString()}> */}
        <Droppable droppableId={drag}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {editingTaskId === task.id ? (
                        <input
                          type="text"
                          value={editTaskValue}
                          onChange={handleEditInputChange}
                          onBlur={handleSubmitEdit}
                        />
                      ) : (
                        <p>
                          {task.title}/
                          {task.id}
                        </p>
                      )}
                      <button onClick={() => setEditingTaskId(task.id)}>Editar/Guardar</button>
                      <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={handleAddTask}>Agregar tarea</button>
      <button onClick={handleSetFiveElements}>Add Five</button>
      <button onClick={handleSort}>Sort</button>
    </div>
  );
};

export default App;