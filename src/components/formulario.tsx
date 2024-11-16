import React, { FC, useEffect, useState } from; 'react' ;
import { MdSave  } from React-icons/md;
import {RecetaType} from ../../Types;


interface FormularioProps {
  onAddTask: (title: string, receta?: RecetaType) => void;
  receta?: RecetaType | null;
}

const Formulario: FC<FormularioProps> = ({ 'onAddTask, Receta' }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }

    if (receta) {
      onAddTask(title.trim(), 'Receta');
      setTitle('');
    }
  };

  useEffect(() => {
    if (Receta) {
      setTitle(Receta.titulo);
    }
  }, [Receta]);
  
 return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full p-4 mt-4 bg-gray-500 rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea"
        className="flex-1 mr-2 rounded-lg form-input"
      />
      
      <button
        type="submit"
        className="flex items-center p-2 text-white bg-blue-500 rounded">
        {Receta ? 'Actualizar' : 'Agregar'}
        <MdSave />
      </button>
    </form>
  );
};

export default Formulario;

function onAddTask(arg0: any, arg1: string) {
  throw new Error("Function not implemented.");
}
