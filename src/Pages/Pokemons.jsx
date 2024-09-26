import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig"; // Importa la configuración de Axios
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import '../Pages/Pokemons.css';

export const Pokemons = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10); // Cambia esto según cuántos Pokémon deseas mostrar por página

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Paso 1: Obtener los primeros 40 Pokémon (nombres y URLs)
        const response = await axiosInstance.get("pokemon?limit=40&offset=0");
        const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);

        // Paso 2: Hacer múltiples solicitudes simultáneas para obtener los detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
          pokemonUrls.map((url) => axiosInstance.get(url))
        );

        // Paso 3: Guardar los datos detallados de cada Pokémon
        setPokemonData(pokemonDetails.map((p) => p.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Lógica para la paginación
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(pokemonData.length / pokemonsPerPage);

  return (
    <div className="container">
      {loading ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <div>
          <div className="row">
            {currentPokemons.map((pokemon, ind) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={ind}>
                  <Link to={`/Detalle/${pokemon.id}`} className="text-decoration-none">
                    <div className="card text-center">
                      <img
                        src={pokemon.sprites.front_default}
                        className="card-img-top img-fluid p-4"
                        alt={pokemon.name}
                        style={{ height: "150px", objectFit: "contain" }} // Asegura que la imagen mantenga su relación de aspecto
                      />
                      <div className="card-body">
                        <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
