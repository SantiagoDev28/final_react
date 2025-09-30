import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TrashIcon } from '@heroicons/react/24/solid';

const LOCAL_KEY = 'tareas';

export default function ToDoItem({ tarea, toggleCompleted, eliminarTarea }) {
  const { user } = useContext(AuthContext);
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');

  // Cargar tareas de localStorage al iniciar
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    setTareas(guardadas);
  }, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tareas));
  }, [tareas]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    const nuevaTarea = {
      id: Date.now(),
      texto,
      autor: user.nombre,
      hora: new Date().toLocaleString()
    };
    setTareas([nuevaTarea, ...tareas]);
    setTexto('');
  };

  return (
    <div className="max-w-lg mx-auto mt-6">
      <form onSubmit={handleAdd} className="flex mb-4">
        <input
          type="text"
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Nueva tarea"
          className="flex-1 p-2 border rounded-l"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 rounded-r"
        >
          Agregar
        </button>
      </form>
      <ul>
        {tareas.map(t => (
          <li key={t.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <span className="font-semibold">{t.texto}</span>
              <span className="ml-2 text-xs text-gray-500">({t.autor} - {t.hora})</span>
            </div>
            <div className="flex items-center gap-3">
              <input className="w-4 h-4" type="checkbox" checked={tarea.completed} onChange={() => toggleCompleted(tarea.id)} />
              <button>
                <TrashIcon className="w-5 h-5 text-red-500" onClick={() => eliminarTarea(tarea.id)} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}