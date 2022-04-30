import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset } from '../redux/detailSlice'

const ShowCard = ({ show: { name, genres, image, id } }) => {
  const resetDispatch = useDispatch()
  return (
    <Link to={`details/${id}`} onClick={() => resetDispatch(reset())} key={id}>
      <div className='show-card-wrapper'>
        <img className='show-card-img' src={image?.medium} alt='show' />
        <div className='search-show-card'>
          <div className='name'>{name}</div>
          <div className='genre'>{genres.join(', ')}</div>
          <div>{''}</div>
        </div>
      </div>
    </Link>
  )
}

export default ShowCard
