import "./Home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { fetchData } from "../tools/fetchData";

function Home() {
  const [popular, setPopular] = useState({});
  const [nanard, setNanard] = useState({});
  const { data: data1, isLoading: isLoading1 } = fetchData({
    sort_by: "popularity.asc",
    "vote_average.lte": 3,
    "vote_count.gte": 20,
  });
  const { data: data2, isLoading: isLoading2 } = fetchData({ sort_by: "popularity.dsc" });
  useEffect(() => {
    if (data1.results && data2.results) {
      const randomMoovie = (test) =>
        test.results[Math.floor(Math.random() * test.results.length - 1)];
      setNanard(randomMoovie(data1));
      setPopular(randomMoovie(data2));
    }
  }, [data1, data2]);

  return isLoading1 && isLoading2 ? (
    <>
      {" "}
      <h3>En chargement</h3>
    </>
  ) : (
    <div className="home-page-container">
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
          <h2 className="title-card">La Pépite</h2>
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
