const SeasonSection = ({ seasons = [] }) => {
  return (
    <div className='season'>
      <h2>Seasons</h2>
      <div className='list'>
        {seasons.map((s) => {
          return (
            <div className='each' key={s.id}>
              <img src={s.image?.medium} alt='season' />
              <div className='info'>
                Season {s.number} - {s.episodeOrder} episodes
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeasonSection
