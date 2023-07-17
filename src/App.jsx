import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Movie from "./Movie";
import Filter from "./Filter";

import "./App.css";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=d0ac894b57f11ed8d72849e3033c7527&language=en-US&page=1"
    );

    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
