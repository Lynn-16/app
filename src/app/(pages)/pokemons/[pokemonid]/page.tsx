"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "@/app/types/Pokemons";

export default function PokemonName() {
  const { pokemonid } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>({
    name: "",
    abilities: [],
    image: [],
    types: [],
  });
  //console.log(pokemonid);
  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonid}/`
        );
        console.log(res);

        const info = {
          name: res.data.name,
          abilities: res.data.abilities,
          image: [
            `${res.data.sprites.other.dream_world.front_default}`,
            `${res.data.sprites.other.home.front_default}`,
          ],
          types: res.data.types.map((p) => p.type.name),
        };
        //console.log(info);
        setPokemon(info);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemon();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando pokemones...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold capitalize text-gray-800">
          {pokemon.name}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Imágenes del Pokémon */}
        <div className="flex flex-col items-center gap-4">
          {pokemon.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${pokemon.name} image ${index + 1}`}
              className="w-48 h-48 object-contain border border-gray-200 rounded-lg shadow-sm"
            />
          ))}
        </div>

        {/* Información del Pokémon */}
        <div className="text-left bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Información
          </h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700">Tipos:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {pokemon.types.map((type, index) => (
                <li key={index} className="capitalize">
                  {type}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Habilidades:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {pokemon.abilities.map((abilityObj, index) => (
                <li key={index} className="capitalize">
                  {abilityObj.ability.name}{" "}
                  {abilityObj.is_hidden && (
                    <span className="text-sm text-gray-500">(Oculta)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
