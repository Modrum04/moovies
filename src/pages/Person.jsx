import { useParams } from "react-router-dom";
import { fetchData } from "../tools/fetchData";
import { useState } from "react";
import PersonNoProfilImage from "../components/PersonNoProfilImage";
import PersonProfilImage from "../components/PersonProfilImage";
import "./Details.scss";
import Filmo from "../components/Filmo";

function Person() {
  const { personid } = useParams();
  const [showMore, setShowMore] = useState(false);

  const { fetchedData, isLoading } = fetchData("person", {
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
    <div>
      <h1>{fetchedData.name}</h1>
      {fetchedData.also_known_as && fetchedData.also_known_as.length > 0 && (
        <>
          <button onClick={() => setShowMore(!showMore)}>afficher les noms d'emprunt</button>
          {showMore && (
            <ul>
              {fetchedData.also_known_as?.map((alias) => (
                <li>{alias}</li>
              ))}
            </ul>
          )}
        </>
      )}
      {fetchedData.birthday ? (
        <>
          <div>Date de naissance : {fetchedData.birthday?.split("-").reverse().join("-")}</div>
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
      {fetchedData.profile_path ? (
        <PersonProfilImage profilPath={fetchedData.profile_path} />
      ) : (
        <PersonNoProfilImage name={fetchedData.name} />
      )}
      {fetchedData.place_of_birth ? (
        <div>
          {fetchedData.gender === 1 ? "Née" : "Né"} à {fetchedData.place_of_birth}{" "}
        </div>
      ) : (
        <div>"Lieu de naissance inconnu" </div>
      )}
      <div>
        {fetchedData.biography !== "" ? fetchedData.biography : "Biographie non renseignée"}
      </div>
      <div>
        {fetchedData.known_for_departement !== ""
          ? `Principalement ${fetchedData.gender === 1 ? "connue" : "connu"} en tant que ${fetchedData.known_for_department}`
          : "Biographie non renseignée"}
      </div>
      {getNoticeable("cast")?.length > 0 && (
        <div>
          Film notable CAST :{" "}
          {getNoticeable("cast")?.map((obj) => (
            <div>
              {obj.title} {obj.character}
            </div>
          ))}{" "}
        </div>
      )}
      {getNoticeable("crew")?.length > 0 && (
        <div>
          Film notable CREW :{" "}
          {getNoticeable("crew")?.map((obj) => (
            <div>
              {obj.title} {obj.job}
            </div>
          ))}{" "}
        </div>
      )}
      <h2>Filmographie</h2>
      {fetchedData.combined_credits?.cast?.length > 0 && (
        <Filmo datas={fetchedData.combined_credits.cast} type="character" />
      )}{" "}
      {fetchedData.combined_credits?.crew?.length > 0 && (
        <Filmo datas={fetchedData.combined_credits.crew} type="job" />
      )}{" "}
    </div>
  );
}

export default Person;
