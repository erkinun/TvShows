import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset } from '../redux/detailSlice'

const ShowCard = ({ show: { name, type, image, id } }) => {
  const resetDispatch = useDispatch()
  return (
    <Link to={`/details/${id}`} onClick={() => resetDispatch(reset())} key={id}>
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
