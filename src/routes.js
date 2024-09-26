import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Eror404 } from './Pages/Eror404';
import { DetailPokemon } from './Pages/DetailPokemon';
import { Pokemons } from './Pages/Pokemons';
// Definir y exportar las rutas
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pokemons/>} />
      <Route path="/detalle/:id" element={<DetailPokemon/>} />
      <Route path="*" element={<Eror404/>} />
    </Routes>
  );
};

export default AppRoutes;
