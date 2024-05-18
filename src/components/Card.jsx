import { Link } from "react-router-dom";
import "./Card.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { GenreContext } from "../contexts/GenreContext";

function Card({
  originalTitle,
  date,
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
    <div className={`themed-fiche ${theme} card-container`}>
      <div className="header-card-container">
        <div className="title-container">
          <h1 className="title">{originalTitle}</h1>
          {originalTitle !== title ? <em>{title}</em> : <br />}
        </div>
        <div className="year-release"> {date?.split("-")[0]}</div>
        <span>
          {genresName?.map((genre, i, arr) => (i === arr.length - 1 ? genre : `${genre}, `))}
        </span>
      </div>
      <div className="cover-art-desc">
        {poster !== null && <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="" />}
        <div className="info">
          <h3>Synopsis</h3>
          <p className="description">
            {overview
              ?.split(" ")
              .filter((el) => !el.includes("http"))
              .join(" ") || <em>{noInformations}</em>}
          </p>
          <h3>Note des spectateurs</h3>
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

// Card.propTypes = {
//   title: PropTypes.string.isRequired,
//   originalTitle: PropTypes.string.isRequired,
//   poster: PropTypes.string.isRequired,
//   overview: PropTypes.string.isRequired,
//   voteAverage: PropTypes.number.isRequired,
//   filmid: PropTypes.number.isRequired,
// };

export default Card;
