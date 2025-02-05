"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-cyan-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">PokeDex</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="w-full md:w-auto space-y-2 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center">
          <Link href="/">
            <span className="hover:underline cursor-pointer">Inicio</span>
          </Link>
          <Link href="/about">
            <span className="hover:underline cursor-pointer">Acerca de</span>
          </Link>
          <Link href="/contact">
            <span className="hover:underline cursor-pointer">Contacto</span>
          </Link>
          <Link href="/pokemons">
            <button className="bg-white text-cyan-800 px-4 py-2 rounded hover:bg-gray-200">
              Ver Pokemones
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
