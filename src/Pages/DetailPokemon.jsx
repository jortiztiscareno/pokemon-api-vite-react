import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig"; // Importa la configuración de Axios
import { useParams } from "react-router-dom";
import "./DetailPokemon.css"; // Puedes añadir tu propio CSS aquí

export const DetailPokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axiosInstance.get(`pokemon/${id}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del Pokémon...</p>;
  }

  if (!pokemon) {
    return <p>No se encontró el Pokémon.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-2">
          <div className="pokemon-detail-container">
            <div className="pokemon-image">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="img-fluid" // Asegúrate de que la imagen sea responsiva
              />
            </div>
          </div>
        </div>
        <div className="col-sm-10">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="text-capitalize">{pokemon.name}</h1>
              <p>
                <strong>ID:</strong> {pokemon.id}
              </p>
              <p>
                <strong>Altura:</strong> {pokemon.height / 10} m
              </p>

              <h6 className="mt-3">Tipos:</h6>
              <div className="types mb-2">
                {pokemon.types.map((typeInfo, index) => (
                  <span
                    key={index}
                    className={`type-badge bg-${typeInfo.type.name} me-1`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>

              <h6 className="mt-3">Habilidades:</h6>
              <div className="abilities">
                {pokemon.abilities.map((abilityInfo, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill bg-info text-dark me-1"
                  >
                    {abilityInfo.ability.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-sm-6">
              <h6 className="mt-3">Estadísticas:</h6>
              <ul className="list-unstyled">
                {pokemon.stats.map((statInfo, index) => (
                  <li key={index}>
                    <strong>{statInfo.stat.name}:</strong> {statInfo.base_stat}
                  </li>
                ))}
              </ul>

              <h6 className="mt-3">Movimientos:</h6>
              <div className="movements">
                {pokemon.moves.slice(0, 10).map((moveInfo, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill bg-secondary text-white me-1"
                  >
                    {moveInfo.move.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
