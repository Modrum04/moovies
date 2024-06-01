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
      {console.log(dataNanard)}
      {console.log(nanard)}
      <div className="presentation">
        <h2>Bienvenue sur Moovies</h2>
        <h2>Votre cinémathèque</h2>
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
        <div className="nanar">
          <h2 className="title-card">Le Nanard</h2>

          <Card
            originalTitle={nanard?.original_title}
            date={nanard?.release_date}
            poster={`https://image.tmdb.org/t/p/w500/${nanard?.poster_path}`}
            overview={nanard?.overview}
            voteAverage={nanard?.vote_average}
            filmid={nanard?.id}
            title={nanard?.title}
            genres={nanard?.genre_ids}
          />
        </div>
        <div className="pepite">
          <h2 className="title-card">L'incontournable</h2>
          <Card
            originalTitle={popular?.original_title}
            date={popular?.release_date}
            poster={`https://image.tmdb.org/t/p/w500/${popular?.poster_path}`}
            overview={popular?.overview}
            voteAverage={popular?.vote_average}
            filmid={popular?.id}
            title={popular?.title}
            genres={popular?.genre_ids}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
