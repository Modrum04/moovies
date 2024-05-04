import "./Home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { fetchData } from "../tools/fetchData";

function Home() {
  const [popular, setPopular] = useState({});
  const [nanard, setNanard] = useState({});
  const randomPage = Math.ceil(Math.random() * 10);

  const { data: dataNanard, isLoading: isLoading1 } = fetchData("discover", {
    sort_by: "popularity.asc",
    "vote_average.lte": 3,
    "vote_count.gte": 20,
    page: randomPage,
  });

  const { data: dataPopular, isLoading: isLoading2 } = fetchData("discover", {
    sort_by: "popularity.dsc",
    page: randomPage,
  });

  const randomMoovie = (data) => data.results[Math.floor(Math.random() * data.results.length - 1)];

  useEffect(() => {
    if (!isLoading1 && !isLoading2) {
      setNanard(randomMoovie(dataNanard));
      setPopular(randomMoovie(dataPopular));
    }
  }, [dataNanard, dataPopular]);

  return isLoading1 || isLoading2 ? (
    <>
      {" "}
      <h3>En chargement</h3>
    </>
  ) : (
    <div className="home-page-container">
      {console.log(popular)}
      <div className="presentation">
        <h2>Bienvenue sur Moovies Lib</h2>
        <h2>Votre cinémathèque</h2>
        <p className="description-site">
          Découvrez Moovies Lib, la plateforme pour les amateurs de films, conçue pour explorer en
          profondeur vos œuvres cinématographiques préférées, et en découvrir de nouvelles grace à
          la richesse de The Movie Data Base.
        </p>
      </div>

      <div className="direction">
        <Link to="/search">
          <button type="button">Je sais ce que je veux !</button>
        </Link>
        <Link to="/filter">
          <button type="button">Guide moi</button>
        </Link>
      </div>
      <h2 className="selection">Sélection du jour!</h2>
      <div className="container-cards">
        <div className="nanar">
          <h2 className="title-card">Le Nanard</h2>
          <Card
            originalTitle={nanard?.original_title}
            poster={`https://image.tmdb.org/t/p/w500/${nanard?.poster_path}`}
            overview={nanard?.overview}
            voteAverage={nanard?.vote_average}
            filmid={nanard?.id}
            title={nanard?.title}
          />
        </div>
        <div className="pepite">
          <h2 className="title-card">L'incontournable</h2>
          <Card
            originalTitle={popular?.original_title}
            poster={`https://image.tmdb.org/t/p/w500/${popular?.poster_path}`}
            overview={popular?.overview}
            voteAverage={popular?.vote_average}
            filmid={popular?.id}
            title={popular?.title}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
