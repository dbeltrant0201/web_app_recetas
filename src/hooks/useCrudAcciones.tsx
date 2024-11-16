import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {RecetaType} from "../Types";

const API_URL = 'http://localhost:3000/recetas';

const useCrudAcciones = () => {
    const [recetas, setRecetas] = useState<RecetaType[]>([]);
    const [receta, setReceta] = useState<RecetaType| null>(null);

    useEffect(() => {
        cargarRecetas();
    }, []);

    const getMaxId = () => {
        return recetas.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1;
    };

    const cargarRecetas = async () => {
        const response = await axios.get(API_URL);
        setRecetas(response.data);
    };

    const agregarRecetas = async (titulo: string, receta?:  RecetaType) => {
        if (receta) {
            await axios.put(`${API_URL}/${receta.id}`, { ...receta, titulo });
            setRecetas(
                recetas.map((t) => (t.id === receta.id ? { ...t, titulo } : t))
            );
            setReceta(null);

            //Mostrar una alerta de éxito sencilla
            alerta('Receta actualizada');

            return;
        }

        await axios.post(API_URL, { titulo, completado: false });
        setRecetas([...recetas, { id: getMaxId(), titulo, completado: false }]);

        //Mostrar una alerta de éxito sencilla
        alerta('Receta agregada');
    };

    const editarReceta = (id: number) => {
        const receta = recetas.find((t) => t.id === id);
        if (receta) {
            setReceta(receta);
        }
    };

    const toggleReceta = async (id: number) => {
        const receta = recetas.find((r) => r.id === id);
        if (receta) {
            const estado = !receta.completado;
            await axios.put(`${API_URL}/${id}`, { ...receta, completado: estado });
            setRecetas(
                recetas.map((r) => (r.id === id ? { ...r, completado: estado } : r))
            );
        }
    };

    const eliminarReceta = async (id: number) => {
        // Obtenemos la tarea a eliminar
        const receta = recetas.find((r) => r.id === id);
        // Usamos sweetalert2 para confirmar la eliminación
        const result = await Swal.fire({
            title: receta?.titulo,
            text: '¿Estás seguro de eliminar esta receta?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#f56565',
            cancelButtonColor: '#718096'
        });

        if (!result.isConfirmed) {
            return;
        }
        await axios.delete(`${API_URL}/${id}`);
        setRecetas(recetas.filter((r) => r.id !== id));
    };

    const alerta = (title: string) => {
        Swal.fire({
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500,
            position: 'top-end',
        });
    }

    return {
        recetas,
        receta,
        agregarRecetas,
        editarReceta,
        toggleReceta,
        eliminarReceta
    };
};

export default useCrudAcciones;