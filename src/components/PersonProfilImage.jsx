function PersonProfilImage({ profilPath }) {
  return (
    <div className="person-img-container">
      <img
        className="person-img"
        src={`https://image.tmdb.org/t/p/w500/${profilPath}`}
        alt={`img-person-${profilPath}`}
      />
    </div>
  );
}

export default PersonProfilImage;
