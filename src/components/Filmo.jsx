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
        .map((obj) => (
          <li>
            {obj.release_date?.split("-")[0] ||
              obj.first_air_date?.split("-")[0] ||
              "Date non renseignée"}{" "}
            - <Link to={`/details/${obj.id}`}>{obj.name || obj.title} </Link> -{" "}
            <em>{obj.media_type}</em>{" "}
            {(obj.job !== "" || obj.character !== "") && (
              <span>
                {" "}
                - {type === "job" ? "Job" : "Role"} : {obj.job || obj.character}
              </span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Filmo;
