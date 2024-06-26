import "./Home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { fetchData } from "../tools/fetchData";

function Home() {
  const [popular, setPopular] = useState({});
  const [nanard, setNanard] = useState({});
  const [randomPage, setRandomPage] = useState(1);

  const { fetchedData: dataNanard, isLoading: isLoading1 } = fetchData("discover", {
    sort_by: "popularity.asc",
    "vote_average.lte": 3,
    "vote_count.gte": 20,
    page: randomPage,
  });

  const { fetchedData: dataPopular, isLoading: isLoading2 } = fetchData("discover", {
    sort_by: "popularity.dsc",
    page: randomPage,
  });

  const defineRandomIndex = (data) => Math.floor(Math.random() * data.results.length - 1);
  const defineRandomPageNumber = () => Math.ceil(Math.random() * 10);

  useEffect(() => {
    setRandomPage(defineRandomPageNumber());
    if (dataNanard.results && dataPopular.results) {
      const randomNanardIndex = defineRandomIndex(dataNanard);
      const randomPopularIndex = defineRandomIndex(dataPopular);
      setNanard(dataNanard.results[randomNanardIndex]);
      setPopular(dataPopular.results[randomPopularIndex]);
    }
  }, [isLoading1, isLoading2]);

  return isLoading1 && isLoading2 ? (
    <>
      <h3>En chargement</h3>
    </>
  ) : (
    <div className="home-page-container">
      <div className="presentation">
        <Link to="/search-area/search">Films - Acteurs - Staff </Link>
        <h2>Bienvenue sur Moovies</h2>

        <p className="description-site">
          Découvrez Moovies, un moteur de recherche sur le cinéma exploitant toute la richesse de
          The Movie Data Base.
        </p>
      </div>

      <div className="direction">
        <Link to="/search-area/search">
          <button type="button">Entrer</button>
        </Link>
      </div>
      <h2 className="selection">La pioche</h2>
      <div className="container-cards">
        {" "}
        <div className="pepite">
          <h3 className="title-card">L'incontournable</h3>
          <Card movie={popular} />
        </div>
        <div className="nanar">
          <h3 className="title-card">Le Nanar</h3>
          <Card movie={nanard} />
        </div>
      </div>
    </div>
  );
}

// originalTitle={nanard?.original_title}
// date={nanard?.release_date}
// poster={`https://image.tmdb.org/t/p/w500/${nanard?.poster_path}`}
// overview={nanard?.overview}
// voteAverage={nanard?.vote_average}
// filmid={nanard?.id}
// title={nanard?.title}
// genres={nanard?.genre_ids}

export default Home;
