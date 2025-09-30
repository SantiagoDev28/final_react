import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ToDoItem = ({ addTask }) => {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask({
        author: user.nombre,
        text,
        completed: false,
      });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        +
      </button>
    </form>
  );
};

export default ToDoItem;
