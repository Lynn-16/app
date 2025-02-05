"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosPokemons } from "@/lib/axiosPokemon";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PokemonGrid = () => {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page") || 1);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //const [first, setFirst] = useState<string>("Hola");
  //console.log(first);

  //setInterval(() => {
  //  setFirst("adios");
  //}, 3000);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();

  useEffect(() => {
    // const fetchPokemons = async () => {
    //   try {
    //     setPokemons([]);
    //     const response = await axios.get(
    //       `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
    //     );

    //     response.data.results.map(async (pokemon, i: number) => {
    //       const res = await axios.get(pokemon.url);
    //       console.log(res.data);

    //       const poke = {
    //         name: res.data.name,
    //         image: res.data.sprites.other.dream_world.front_default,
    //         id: res.data.id,
    //       };
    //       console.log(poke);
    //       setPokemons((prevPokemons) => [...prevPokemons, poke]);
    //     });

    //     //console.log(response.data.results);
    //     //setPokemons(response.data.results);

    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching pokemons:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchPokemons();
    axiosPokemons(setPokemons, setLoading, page);
  }, [page]);

  if (loading) {
    return <p className="text-center">Cargando pokemones...</p>;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Pokemones</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemons.map((pokemon, index) => (
            <Link href={`pokemons/${pokemon.id}`} key={index}>
              <div
                key={index}
                className="border rounded-lg  p-4 shadow hover:shadow-lg transition transform hover:scale-105"
              >
                <h2 className="text-lg font-bold capitalize text-center mb-4">
                  {pokemon.name}
                </h2>
                <div>
                  <Image
                    src={pokemon.image || "/neko.gif"}
                    alt={pokemon.name}
                    width={500}
                    height={500}
                    className="mx-auto max-h-64"
                  ></Image>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Pagination className="mt-4">
        <PaginationContent className="space-x-2 flex items-center justify-center">
          {/* Botón Anterior */}
          <PaginationItem>
            <PaginationPrevious
              className={`border rounded px-3 py-1 cursor-pointer ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => page > 1 && handlePageChange(page - 1)}
            />
          </PaginationItem>

          {/* Primera Página */}
          <PaginationItem>
            <PaginationLink
              className={`px-3 py-1 border rounded cursor-pointer ${
                page === 1 ? "bg-cyan-800 text-white" : ""
              }`}
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Puntos suspensivos antes de la página actual si necesario */}
          {page > 4 && (
            <PaginationItem>
              <span className="px-3 py-1">...</span>
            </PaginationItem>
          )}

          {/* Páginas cercanas a la actual */}
          {Array.from({ length: 5 }, (_, i) => page - 2 + i)
            .filter((p) => p > 1 && p < 66) // Evita incluir la primera y última página
            .map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  className={`px-3 py-1 border rounded cursor-pointer ${
                    p === page ? "bg-cyan-800 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Puntos suspensivos después de la página actual si necesario */}
          {page < 63 && (
            <PaginationItem>
              <span className="px-3 py-1">...</span>
            </PaginationItem>
          )}

          {/* Última Página */}
          <PaginationItem>
            <PaginationLink
              className={`px-3 py-1 border rounded cursor-pointer ${
                page === 66 ? "bg-cyan-800 text-white" : ""
              }`}
              onClick={() => handlePageChange(66)}
            >
              66
            </PaginationLink>
          </PaginationItem>

          {/* Botón Siguiente */}
          <PaginationItem>
            <PaginationNext
              className={`border rounded px-3 py-1 cursor-pointer ${
                page === 66 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => page < 66 && handlePageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PokemonGrid;
