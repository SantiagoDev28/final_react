const TaskCard = ({ task, toggleTask, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-2">
      <div>
        <p className="font-semibold">{task.author}</p>
        <p
          className={`${
            task.completed === true ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed === true}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5"
        />
        <button
          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
          onClick={() => onEdit(task)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(task.id)}
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
