import { Link } from "react-router-dom";

function Filmo({ datas, type }) {
  return (
    <ul>
      <h3>{type === "job" ? "Dans l'équipe de :" : "Dans le casting de :"}</h3>
      {datas
        ?.sort((a, b) => {
          return (
            (a.release_date?.split("-")[0] || a.first_air_date?.split("-")[0]) -
            (b.release_date?.split("-")[0] || b.first_air_date?.split("-")[0])
          );
        })
        .filter((el) =>
          el.genre_ids
            ? !el.genre_ids?.includes(10764) &&
              !el.genre_ids?.includes(10763) &&
              el.genre_ids.length > 0 &&
              el.character !== "Self"
            : el,
        )
        .map((obj, i) => (
          <li key={`${obj.id}-${obj.media_type}-${i}`}>
            <Link to={`/details/${obj.id}`}>
              {" "}
              {obj.release_date?.split("-")[0] ||
                obj.first_air_date?.split("-")[0] ||
                "Date non renseignée"}{" "}
              - <span>{obj.name || obj.title} </span> - <em>{obj.media_type}</em>{" "}
              {(obj.job !== "" || obj.character !== "") && (
                <>
                  {" "}
                  - {type === "job" ? "Job" : "Role"} : {obj.job || obj.character}
                </>
              )}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default Filmo;
