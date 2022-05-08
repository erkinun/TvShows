const CastSection = ({ casts = [] }) => {
  return (
    <div className='cast'>
      <h2>Cast</h2>
      <div className='list'>
        {casts.map(({ person = {}, character = {} }) => {
          return (
            <div className='each' key={person.id}>
              <img src={person.image?.medium} alt='cast-person' />
              <div>{person.name}</div>
              <div className='character'>{character.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CastSection
