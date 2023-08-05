const SeasonSection = ({ seasons = [] }) => {
  console.log({ seasons });
  return (
    <div className="season">
      <h2>Seasons</h2>
      <div className="list">
        {seasons.map((s) => {
          return (
            <a href={s.url} className="each" key={s.id}>
              {s.image?.medium && <img src={s.image?.medium} alt="season" />}
              <div className="info">
                Season {s.number} - {s.episodeOrder || "N/A"} episodes
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonSection;
