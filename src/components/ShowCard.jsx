import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset } from '../redux/detailSlice'

const ShowCard = ({
  show: {
    name,
    genres,
    image,
    id,
    network,
    premiered,
    ended,
    rating: { average } = {},
  },
}) => {
  const resetDispatch = useDispatch()
  const premieredYear = premiered?.slice(0, 4)
  const endYear = ended?.slice(0, 4) || 'running'
  return (
    <Link to={`details/${id}`} onClick={() => resetDispatch(reset())} key={id}>
      <div className='show-card-wrapper'>
        <img className='show-card-img' src={image?.medium} alt='show' />
        <div className='search-show-card'>
          <div className='name'>{name}</div>
          <div className='network'>
            {average} ({network?.name && `${network.name}, `}
            {premieredYear} - {endYear})
          </div>
          <div className='genre'>{genres.join(', ')}</div>
          <div>{''}</div>
        </div>
      </div>
    </Link>
  )
}

export default ShowCard
