import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import { useRef } from "react";
import ToDoItem from "../components/ToDoItem";
import SearchInput from "../components/SearchInput";
import api from "../api/axios";
import { toast } from "react-toastify";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const editInputRef = useRef();
  // Borrar tarea
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success("Tarea borrada");
    } catch (err) {
      toast.error("Error al borrar tarea");
    }
  };

  // Iniciar edición
  const startEditTask = (task) => {
    setEditingTask(task);
  };

  // Guardar edición
  const saveEditTask = async () => {
    if (!editingTask) return;
    const newText = editInputRef.current.value.trim();
    if (!newText) return;
    try {
      const updated = { ...editingTask, text: newText };
      const res = await api.put(`/tasks/${editingTask.id}`, updated);
      setTasks(tasks.map((t) => (t.id === editingTask.id ? res.data : t)));
      setEditingTask(null);
      toast.success("Tarea editada");
    } catch (err) {
      toast.error("Error al editar tarea");
    }
  };

  // Cancelar edición
  const cancelEditTask = () => {
    setEditingTask(null);
  };
  const { logout, user } = useAuth();

  useEffect(() => {
    // Obtener tareas desde la API
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        toast.error("Error al cargar tareas");
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);
      setTasks([res.data, ...tasks]);
      toast.success("Tarea agregada");
    } catch (err) {
      toast.error("Error al agregar tarea");
    }
  };

  const toggleTask = async (id) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (!taskToUpdate) return;
    try {
      const updated = { ...taskToUpdate, completed: !taskToUpdate.completed };
      const res = await api.put(`/tasks/${id}`, updated);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      toast.error("Error al actualizar tarea");
    }
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.text.toLowerCase().includes(search.toLowerCase()) ||
      t.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-700">Team To-Do</h1>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-700 text-base font-semibold px-4 py-2 rounded-full border border-red-200 bg-red-50"
          >
            Cerrar sesión
          </button>
        </div>

        <p className="mb-4 text-base text-gray-700 w-full text-center">
          Bienvenido, <span className="font-semibold text-blue-600">{user?.nombre}</span>
        </p>

        <div className="w-full mb-4">
          <ToDoItem addTask={addTask} />
        </div>
        <div className="w-full mb-4">
          <SearchInput search={search} setSearch={setSearch} />
        </div>

        {/* Edición de tarea */}
        {editingTask && (
          <div className="mb-4 w-full p-3 border-2 border-yellow-300 rounded-xl bg-yellow-50 flex gap-2 items-center shadow">
            <input
              ref={editInputRef}
              defaultValue={editingTask.text}
              className="flex-grow p-2 border rounded-lg"
              type="text"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-semibold"
              onClick={saveEditTask}
            >
              Guardar
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 font-semibold"
              onClick={cancelEditTask}
            >
              Cancelar
            </button>
          </div>
        )}

        <div className="w-full">
          <TaskList
            tasks={filteredTasks}
            toggleTask={toggleTask}
            onEdit={startEditTask}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
