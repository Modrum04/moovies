import { useParams } from "react-router-dom";
import { fetchData } from "../tools/fetchData";
import { useState, useEffect } from "react";
import PersonCard from "../components/PersonCard";
import PersonNoProfilImage from "../components/PersonNoProfilImage";
import PersonProfilImage from "../components/PersonProfilImage";
import "./Details.scss";

function Person() {
  const { personid } = useParams();
  const [showMore, setShowMore] = useState(false);

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

  const { fetchedData, isLoading } = fetchData("person", {
    [personid]: "?",
  });

  return (
    <div>
      {console.log(fetchedData)}
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
    </div>
  );
}

export default Person;
