import { Link, useParams } from "react-router-dom";
import { fetchData } from "../tools/fetchData";
import { useState } from "react";
import PersonNoProfilImage from "../components/PersonNoProfilImage";
import PersonProfilImage from "../components/PersonProfilImage";
import "./Person.scss";
import Filmo from "../components/Filmo";

function Person() {
  const { personid } = useParams();
  const [showMore, setShowMore] = useState(false);
  const [showFilmo, setShowFilmo] = useState(false);

  const { fetchedData } = fetchData("person", {
    [personid]: "?",
  });

  const { fetchedData: fetchedMostPopular } = fetchData("discover", {
    sort_by: "popularity.dsc",
    with_people: personid,
  });

  const getAge = (deathday, birthday) => {
    const endDay = deathday ? new Date(deathday) : new Date();
    const startingDay = new Date(birthday);
    let age = endDay.getFullYear() - startingDay.getFullYear();
    const months = endDay.getMonth() - startingDay.getMonth();
    if (months < 0 || (months === 0 && startingDay.getDate() < endDay.getDate())) {
      age--;
    }
    return age;
  };

  const getNoticeable = (arrayCastOrCrew) => {
    const threeBestMovies = fetchedMostPopular.results?.filter((obj, i) => i < 3);
    return fetchedData.combined_credits?.[arrayCastOrCrew].filter((movie) =>
      threeBestMovies?.find((obj) => obj.id === movie.id),
    );
  };

  return (
    <div className="person-container">
      <h1>{fetchedData.name}</h1>
      {console.log(fetchedData)}
      <div className="person-description-container">
        <div className="person-description">
          <p className="name-alias">
            <span>Nom : </span> {fetchedData.name}{" "}
            {fetchedData.also_known_as && fetchedData.also_known_as.length > 0 && (
              <>
                <br />
                Egalment {fetchedData.gender === 1 ? "connue" : "connu"} sous le nom de :{" "}
                {!showMore
                  ? fetchedData.also_known_as?.map(
                      (alias, i, arr) =>
                        i < 2 && (
                          <em key={`${fetchedData.id}-aka-${i}`}>
                            {alias}
                            {i < arr.length - 1 && ", "}
                          </em>
                        ),
                    )
                  : fetchedData.also_known_as?.map((alias, i, arr) => (
                      <em key={`${fetchedData.id}-aka-${i}`}>
                        {alias}
                        {i < arr.length - 1 && ", "}
                      </em>
                    ))}
                {fetchedData.also_known_as?.length > 2 && (
                  <button onClick={() => setShowMore(!showMore)}> . . . </button>
                )}
              </>
            )}{" "}
          </p>

          {fetchedData.birthday ? (
            <>
              <div>
                <span>Date de naissance : </span>
                {fetchedData.birthday?.split("-").reverse().join("-")}
              </div>
              <div>
                {fetchedData.deathday ? (
                  <>Date de décès : {fetchedData.deathday?.split("-").reverse().join("-")} </>
                ) : (
                  <>En vie</>
                )}
                <em> ({getAge(fetchedData.deathday, fetchedData.birthday)} ans)</em>
              </div>
            </>
          ) : (
            <div>Date de naissance inconnue</div>
          )}

          {fetchedData.place_of_birth ? (
            <div>
              {fetchedData.gender === 1 ? "Née" : "Né"} à {fetchedData.place_of_birth}{" "}
            </div>
          ) : (
            <div>"Lieu de naissance inconnu" </div>
          )}
          <p className="biography">
            {fetchedData.biography !== "" ? (
              <>
                <span>Biographie : </span>
                {fetchedData.biography}
              </>
            ) : (
              "Biographie non renseignée"
            )}
          </p>
          <div>
            {fetchedData.known_for_departement !== "" &&
              `Principalement ${fetchedData.gender === 1 ? "connue" : "connu"} en tant que ${fetchedData.known_for_department}`}
          </div>
          {getNoticeable("cast")?.length > 0 && (
            <ul>
              <span>
                {" "}
                Film notable (<em>dans un casting</em>){" "}
              </span>
              :{" "}
              {getNoticeable("cast")?.map((obj) => (
                <li key={`${obj.id}`}>
                  <Link to={`/details/${obj.id}`}>
                    {obj.title} - Rôle : {obj.character}
                  </Link>
                </li>
              ))}{" "}
            </ul>
          )}
          {getNoticeable("crew")?.length > 0 && (
            <ul>
              <span>
                Film notable (<em>dans une équipe de tournage</em>){" "}
              </span>
              :{" "}
              {getNoticeable("crew")?.map((obj) => (
                <li key={`${obj.id}`}>
                  <Link to={`/details/${obj.id}`}>
                    {obj.title} - Job : {obj.job}
                  </Link>
                </li>
              ))}{" "}
            </ul>
          )}
        </div>
        {fetchedData.profile_path ? (
          <PersonProfilImage profilPath={fetchedData.profile_path} />
        ) : (
          <PersonNoProfilImage name={fetchedData.name} />
        )}
      </div>
      <div className="filmography">
        {!showFilmo && (
          <button onClick={() => setShowFilmo(!showFilmo)}>Afficher la filmographie</button>
        )}
        {showFilmo && (
          <>
            <h2>Filmographie</h2>
            {fetchedData.combined_credits?.cast?.length > 0 && (
              <Filmo datas={fetchedData.combined_credits.cast} type="character" />
            )}{" "}
            {fetchedData.combined_credits?.crew?.length > 0 && (
              <Filmo datas={fetchedData.combined_credits.crew} type="job" />
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default Person;
