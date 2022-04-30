const CastSection = ({ casts = [] }) => {
  return (
    <div className='cast'>
      <h2>Cast</h2>
      <div className='list'>
        {casts.map((c) => {
          return (
            <div className='each' key={c.person?.id}>
              <img src={c.person?.image?.medium} alt='cast-person' />
              <div>{c.person.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CastSection
