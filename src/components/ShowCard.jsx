import { Link } from 'react-router-dom'

const ShowCard = ({ show: { name, type, image, id } }) => {
  return (
    <Link to={`/details/${id}`} key={id}>
      <div>
        {
          // TODO maybe replace img with something more performant
        }
        <img src={image?.medium} alt='show' />
        <div>{name}</div>
        <div>{type}</div>
        <div>{''}</div>
      </div>
    </Link>
  )
}

export default ShowCard
