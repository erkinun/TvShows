const CastSection = ({ casts = [] }) => {
  return casts.length > 0 ? (
    <div className="cast">
      <h2>Cast</h2>
      <div className="list">
        {casts.map(({ person = {}, character = {} }) => {
          return (
            <div className="each" key={person.id}>
              <img src={person.image?.medium} alt="cast-person" />
              <div className="name">{person.name}</div>
              <div className="character">{character.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="cast">
      <h2>No cast information available</h2>
    </div>
  );
};

export default CastSection;
