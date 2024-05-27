import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./PersonCard.scss";
import PersonProfilImage from "./PersonProfilImage";
import PersonNoProfilImage from "./PersonNoProfilImage";

function PersonCard({ person }) {
  const { theme } = useContext(ThemeContext);
  const { character, name, job, profile_path, id } = person;
  const noInformations = "Information non disponible";

  return (
    <Link className={`themed-fiche ${theme} person-card-container`} to={`/person/${id}`}>
      <div className="person-description">
        <p>
          {job ? `Job : ` : `Role : `}
          {job ? <span>{job}</span> : <span>{character || <em>{noInformations}</em>}</span>}
        </p>
        <p>
          Nom : <span>{name}</span>{" "}
        </p>
      </div>
      {profile_path ? (
        <PersonProfilImage profilPath={profile_path} />
      ) : (
        <PersonNoProfilImage name={name} />
      )}
    </Link>
  );
}

export default PersonCard;
