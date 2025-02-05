import axios from "axios";

export const axiosPokemons = async (
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  page: number
) => {
  try {
    setPokemons([]);
    setLoading(true);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
    );

    response.data.results.map(async (pokemon, i: number) => {
      const res = await axios.get(pokemon.url);
      console.log(res.data);

      const poke = {
        name: res.data.name,
        image: res.data.sprites.other.dream_world.front_default,
        id: res.data.id,
      };
      console.log(poke);
      setPokemons((prevPokemons) => [...prevPokemons, poke]);
    });

    //console.log(response.data.results);
    //setPokemons(response.data.results);

    setLoading(false);
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  } finally {
    setLoading(false);
  }
};
