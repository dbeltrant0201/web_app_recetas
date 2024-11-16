import { FC } from 'react';
import { MdEdit, MdDelete  } from "react-icons/md";
import {RecetaType} from "../Types";

interface RecetaProps {
  receta: RecetaType;
  onToggle: () => void;
  onEliminar: () => void;
  onEditar: () => void;
}

const Receta: FC<RecetaProps> = ({ receta, onEliminar, onToggle, onEditar }) => {
  return (
    <li className="relative flex items-center justify-between p-2 border-b border-gray-300 hover:bg-gray-400">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={receta.completado}
          onChange={onToggle}
          className="mr-2 form-checkbox"
        />
        <span className={receta.completado ? 'line-through' : ''}>
          {receta.titulo}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onEditar}
          className="px-3 py-1 text-gray-200 rounded-lg bg-amber-600 ">
          <MdEdit />
        </button>
        <button
          onClick={onEliminar}
          className="px-3 py-1 text-gray-200 rounded-lg bg-rose-600 ">
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default Receta;
