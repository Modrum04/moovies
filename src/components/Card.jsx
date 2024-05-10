import { Link } from "react-router-dom";
import "./Card.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { GenreContext } from "../contexts/GenreContext";

function Card({
  originalTitle,
  poster,
  overview,
  voteAverage,
  title,
  filmid,
  genres,
  resultNumber,
}) {
  const { theme } = useContext(ThemeContext);
  const { fetchedGenre } = useContext(GenreContext);
  const noInformations = "Information non disponible";

  function getGenreName(arrayOfId) {
    return fetchedGenre?.filter((el) => arrayOfId?.includes(el.id)).map((el) => el.name);
  }
  const genresName = getGenreName(genres);

  function convertToStars(average) {
    const roundedValue = Math.round(average);
    const stars = "⭐".repeat(roundedValue);
    return stars;
  }

  const starsString = convertToStars(voteAverage);

  return (
    <div className={`themed-fiche ${theme} card`}>
      <div className="title-container">
        <h1 className="title">{originalTitle}</h1>
        {originalTitle !== title ? <em>{title}</em> : <br />}

        <span>
          {genresName?.map((genre, i, arr) => (i === arr.length - 1 ? genre : `${genre}, `))}
        </span>
      </div>
      <div className="container-card">
        <img src={poster} alt="" className="images" />
        <div className="info">
          <h3>Synopsis</h3>
          <p className="description">{overview || <em className="noinfo">{noInformations}</em>}</p>
          <h3 className="vote">Note des spectateurs</h3>
          <p className="stars">{starsString}</p>
          <div className="details-btn">
            <Link to={`/details/${filmid}`}>
              <button type="button" className={`themed-button-in-card ${theme}`}>
                Détails
              </button>
            </Link>
          </div>
        </div>
      </div>{" "}
      <em>{resultNumber}</em>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  originalTitle: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  filmid: PropTypes.number.isRequired,
};

export default Card;
