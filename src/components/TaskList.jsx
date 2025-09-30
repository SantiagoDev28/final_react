import TaskCard from "./TaskCard";

const TaskList = ({ tasks, toggleTask, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No hay tareas</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
