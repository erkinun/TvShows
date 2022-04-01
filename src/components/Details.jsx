import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchDetails } from '../redux/detailSlice'
import { addFav, removeFav } from '../redux/favSlice'
import DOMPurify from 'dompurify'

import './Details.css'

// TODO find a NA image and use where image doesn't exist
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

const FavButton = ({ isFav, toggleFav }) => {
  return (
    <div>
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

  return (
    <div className='details-wrapper'>
      <div className='details-content'>
        <div className='back-link'>
          <Link to='/'>BACK</Link>
        </div>
        <div className='header'>
          <img src={showDetails.summary?.image?.medium} alt='show' />
          <div className='title'>{showDetails.summary?.name}</div>
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
        </div>

        <div
          className='summary'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(showDetails.summary?.summary),
          }}
        ></div>
        <CastSection casts={showDetails.cast} />
        <SeasonSection seasons={showDetails.seasons} />
      </div>
    </div>
  )
}

export default Details
