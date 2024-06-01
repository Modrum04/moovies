import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../tools/fetchData";
import PersonCard from "../components/PersonCard";
import "./Details.scss";

function Details() {
  const { filmid } = useParams();
  const [moreCrew, setMoreCrew] = useState(false);
  const [moreCasting, setMoreCasting] = useState(false);
  const noInformations = "Information non disponible";
  const { fetchedData } = fetchData("details", {
    [filmid]: "?",
  });
  useEffect(() => window.scroll(0, 0), []);

  const scalingRate = () => {
    let comment = "";
    switch (true) {
      case fetchedData.popularity < 2:
        comment = "💩 Impopulaire";
        break;
      case fetchedData.popularity < 10:
        comment = "😐 Peu populaire";
        break;
      case fetchedData.popularity < 50:
        comment = "👍 Assez populaire";
        break;
      case fetchedData.popularity < 500:
        comment = "🙂 Populaire";
        break;
      case fetchedData.popularity < 1500:
        comment = "😄 Très populaire";
        break;
      case fetchedData.popularity > 1500:
        comment = "😍 Extremement populaire";
        break;
      default:
        comment = "";
    }
    return comment;
  };

  return (
    <div className="details-container">
      <h1>{fetchedData.original_title}</h1>
      {fetchedData.original_title !== fetchedData.title && <em>{fetchedData.title}</em>}
      <h2>Détails</h2>
      <div className="details-container-fiche">
        <img
          className="cover"
          src={`https://image.tmdb.org/t/p/w500/${fetchedData.poster_path}`}
          alt={`cover-${fetchedData.original_title}`}
        />
        <div className="fiche-informations">
          <ul>
            <li>
              <div>Genre : </div>
              <div>
                {fetchedData.genres?.map((genre, i, arr) =>
                  i === arr.length - 1 ? genre.name : `${genre.name}, `,
                )}
              </div>
            </li>
            <li>
              <div>Durée :</div> <div>{fetchedData.runtime} minutes</div>
            </li>
            <li>
              <div>Version originale : </div>
              <div>
                {fetchedData.spoken_languages?.map((language, i, arr) => {
                  const displayName = new Intl.DisplayNames("fr", {
                    type: "language",
                  }).of([language.iso_639_1]);
                  return i === arr.length - 1 ? displayName : `${displayName}, `;
                })}
              </div>
            </li>
            <li>
              <div>Date de sortie :</div>
              <div>{fetchedData.release_date?.split("-").reverse().join("-")}</div>
            </li>
          </ul>
          <ul>
            <li>
              <div>Note moyenne :</div> <div>{fetchedData.vote_average}/10</div>
            </li>
            <li>
              <div>Nombre de votants :</div>
              <div>{fetchedData.vote_count}</div>
            </li>
            <li>
              <div>Score de popularité : </div>
              <div>
                {fetchedData.popularity} <em>{scalingRate()}</em>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div>Réalisation : </div>{" "}
              <div>
                {fetchedData.credits?.crew?.find((obj) => obj.job === "Director")?.original_name ||
                  noInformations}{" "}
              </div>
            </li>

            <li>
              <div>Société de production : </div>
              <div>
                {fetchedData.production_companies?.map((companie, i, arr) =>
                  i === arr.length - 1 ? companie.name : `${companie.name}, `,
                )}
              </div>
            </li>
            <li>
              <div> Pays d'origine : </div>
              <div>
                {fetchedData.origin_country?.map((country, i, arr) => {
                  const regionName = new Intl.DisplayNames(["fr"], {
                    type: "region",
                  }).of(country);
                  return i === arr.length - 1 ? regionName : `${regionName}, `;
                })}{" "}
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div> Budget : </div>
              {fetchedData.revenue > 0 ? (
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "usd",
                  currencyDisplay: "narrowSymbol",
                }).format(fetchedData.budget)
              ) : (
                <em>{noInformations}</em>
              )}
            </li>
            <li>
              <div> Revenus : </div>
              {fetchedData.revenue > 0 ? (
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "usd",
                  currencyDisplay: "narrowSymbol",
                }).format(fetchedData.revenue)
              ) : (
                <em>{noInformations}</em>
              )}
            </li>
          </ul>
        </div>
        <div className="synopsis">
          <h3>Synopsis</h3>
          <p>{fetchedData.overview || <em>{noInformations}</em>}</p>
        </div>
      </div>
      <div className="crew-casting-container">
        <h3>Casting principal</h3>
        <div className="crew-casting">
          {fetchedData.credits?.cast?.map((acteur, i) =>
            moreCasting ? (
              <PersonCard person={acteur} key={acteur.credit_id} type="movie" />
            ) : (
              i < 4 && <PersonCard person={acteur} key={acteur.credit_id} type="movie" />
            ),
          )}
        </div>
        {fetchedData.credits?.cast?.length > 4 && (
          <button type="button" onClick={() => setMoreCasting(!moreCasting)}>
            {moreCasting ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
      <div className="crew-casting-container">
        <h3>Equipe</h3>
        <div className="crew-casting">
          {fetchedData.credits?.crew.map((crew, i) =>
            moreCrew ? (
              <PersonCard person={crew} key={crew.credit_id} type="movie" />
            ) : (
              i < 4 && <PersonCard person={crew} key={crew.credit_id} type="movie" />
            ),
          )}
        </div>{" "}
        {fetchedData.credits?.crew?.length > 4 && (
          <button type="button" onClick={() => setMoreCrew(!moreCrew)}>
            {moreCrew ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Details;
