const ShowCard = ({ show: { name, type, image } }) => {
  return (
    <div>
      {
        // TODO maybe replace img with something more performant
      }
      <img src={image?.medium} alt='show' />
      <div>{name}</div>
      <div>{type}</div>
      <div>{''}</div>
    </div>
  )
}

export default ShowCard
