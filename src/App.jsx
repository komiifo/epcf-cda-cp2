import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(5);
  const [sortMethode, setSortMethode] = useState("all");

  // Utilisation de l'API pour récupérer les données des Pokémon
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/pokemon");
      const d = await response.json();

      setData(d);
    }

    fetchData();
  }, []);

  // Gestion des changements dans les champs de recherche, de plage et de tri
  const handleChangeInput = (e) => {
    setSearch(e.target.value);
  };
  const handleChangeRange = (e) => {
    setRange(e.target.value);
  };
  const handleChangeSort = (e) => {
    setSortMethode(e.target.value);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Pokedex</h1>
      <div className="flex justify-center">
        <input
          className="border"
          type="text"
          name="search"
          onChange={handleChangeInput}
          placeholder="Search by name"
        />
        <input
          type="range"
          name="number"
          id=""
          min={0}
          max={10}
          onChange={handleChangeRange}
        />
        
        <select onChange={handleChangeSort}>
          <option value="all">-- Sort --</option>
          <option value="a.z">Name {"A->Z"}</option>
          <option value="z.a">Name {"Z->A"}</option>
          <option value="1.9">Height {"^"}</option>
          <option value="9.1">Height {""}</option>
        </select>
      </div>
      <div className="listCard flex text-center">
        {data
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sortMethode == "1.9") {
              return a.height < b.height ? 0 : -1;
            }
            if (sortMethode == "9.1") {
              return a.height > b.height ? 0 : -1;
            }
            if (sortMethode == "z.a") {
              return a.name.localeCompare() + b.name.localeCompare();
            }
            return 0;
          })
          .slice(0, range)
          .map((pokemon, index) => (
            <div className="card flex" key={index}>
              <h2 className="font-bold">{pokemon.name}</h2>
              <img src={pokemon.image} alt={pokemon.name} />
              <span>Type : {pokemon.type}</span>
              <span>Height : {pokemon.height} m</span>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
