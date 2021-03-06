import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'

import { fetchDetails } from '../redux/detailSlice'
import { addFav, removeFav } from '../redux/favSlice'
import CastSection from './details/Cast'
import SeasonSection from './details/Season'

import './Details.css'

// TODO find a NA image and use where image doesn't exist

const FavButton = ({ isFav, toggleFav }) => {
  return (
    <div className='fav-button'>
      <button onClick={() => toggleFav(!isFav)}>
        {isFav ? 'UnFav Buttton' : 'Fav Button'}
      </button>
    </div>
  )
}

const Details = () => {
  const detailsDispatch = useDispatch()
  const params = useParams()
  const showId = params.showId
  const status = useSelector((state) => state.detail.status)
  const isFavourite = useSelector((state) => state.favs?.favs?.includes(showId))
  const showDetails = useSelector((state) => {
    return state.detail.details || {}
  })

  useEffect(() => {
    if (status === 'idle') {
      detailsDispatch(fetchDetails(showId))
    }
  }, [status, detailsDispatch, showId])

  const {
    genres = [],
    rating: { average } = {},
    network,
    premiered,
    ended,
  } = showDetails?.summary || {}
  const premieredYear = premiered?.slice(0, 4)
  const endYear = ended?.slice(0, 4) || 'running'

  return (
    <div className='details-wrapper'>
      <div className='details-content'>
        <div className='back-link'>
          <Link to='/'>BACK</Link>
        </div>
        <div className='header'>
          <div className='title'>{showDetails.summary?.name}</div>
          <div className='info'>
            {average} ({network?.name && `${network.name}, `}
            {premieredYear} - {endYear})
          </div>
          <img
            className='show-img'
            src={showDetails.summary?.image?.medium}
            alt='show'
          />

          <div className='genres'>
            {genres.map((g) => (
              <div key={g} className='genre'>
                {g}
              </div>
            ))}
          </div>
        </div>

        <div
          className='summary'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(showDetails.summary?.summary),
          }}
        />
        <FavButton
          isFav={isFavourite}
          toggleFav={(nextState) => {
            if (nextState) {
              detailsDispatch(addFav(showId))
            } else {
              detailsDispatch(removeFav(showId))
            }
          }}
        />
        <CastSection casts={showDetails.cast} />
        <SeasonSection seasons={showDetails.seasons} />
      </div>
    </div>
  )
}

export default Details
