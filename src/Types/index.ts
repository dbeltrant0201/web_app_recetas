export interface RecetaType {
    id: number;
    titulo: string;
    completado: boolean;
}

export interface TablaProps {
    receta: RecetaType[];
    onToggleReceta: (id: number) => void;
    onEliminarReceta: (id: number) => void;
    onEditarReceta: (id: number) => void;
}
