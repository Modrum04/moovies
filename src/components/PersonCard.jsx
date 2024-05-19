import { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./PersonCard.scss";
import PersonProfilImage from "./PersonProfilImage";
import PersonNoProfilImage from "./PersonNoProfilImage";

function PersonCard({ person }) {
  const blabl = 488;
  // 4165
  const { theme } = useContext(ThemeContext);
  const { character, name, job, profile_path, id } = person;
  const noInformations = "Information non disponible";
  return (
    <Link className={`themed-fiche ${theme} person-container`} to={`/person/${id}`}>
      {/* <div className={`themed-fiche ${theme} person-container`}> */}
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
      {/* </div> */}
    </Link>
  );
}
// PersonCard.propTypes = {
//   person: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     job: PropTypes.string,
//     character: PropTypes.string,
//     profile_path: PropTypes.string,
//   }).isRequired,
// };

export default PersonCard;
