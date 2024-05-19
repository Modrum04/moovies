function PersonNoProfilImage({ name }) {
  return (
    <div className="person-img-container">
      <svg width="80" height="80">
        <circle cx="50%" cy="50%" r="50%" fill="#aeaeae" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="white"
          fontSize="2rem"
          fontFamily="Arial"
          dy=".3em"
        >
          {name
            ?.split(" ")
            .map((w) => w.charAt(0))
            .join("")}
        </text>
      </svg>
    </div>
  );
}

export default PersonNoProfilImage;
