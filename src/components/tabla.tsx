import { FC } from react
import Receta from ./receta.tsx;
import {TablaProps} from "../../Types";

const Tabla: FC<TablaProps> = ({
  receta,
  onEliminarReceta,
  onToggleReceta,
  onEditarReceta,
}) => {
  return (
    <ul className="mt-4">
      {receta.map((receta) => (
        <Receta
          key={receta.id}
          receta={receta}
          onToggle={() => onToggleReceta(receta.id)}
          onEliminar={() => onEliminarReceta(receta.id)}
          onEditar={() => onEditarReceta(receta.id)}
        />
      ))}
    </ul>
  );
};

export default Tabla;
