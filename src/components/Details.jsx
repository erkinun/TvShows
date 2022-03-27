import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchDetails } from '../redux/detailSlice'
import { addFav, removeFav } from '../redux/favSlice'

// TODO initial data load

// TODO either cut it to 5, or horizontally have a slider thing
const CastSection = ({ casts = [] }) => {
  return (
    <div>
      <h2>Cast</h2>
      {casts.map((c) => {
        return (
          <div key={c.person?.id}>
            <img src={c.person?.image?.medium} alt='person' />
            <div>{c.person.name}</div>
          </div>
        )
      })}
    </div>
  )
}

// TODO either cut it to 5, or horizontally have a slider thing
const SeasonSection = ({ seasons = [] }) => {
  return (
    <div>
      <h2>Seasons</h2>
      {seasons.map((s) => {
        return (
          <div key={s.id}>
            <img src={s.image?.medium} alt='person' />
            <div>
              Season {s.number} - {s.episodeOrder} episodes
            </div>
          </div>
        )
      })}
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
  const isFavourite = useSelector((state) => state.favs.favs.includes(showId))
  const showDetails = useSelector((state) => {
    return state.detail.details || {}
  })

  useEffect(() => {
    if (status === 'idle') {
      detailsDispatch(fetchDetails(showId))
    }
  }, [status, detailsDispatch, showId])

  // TODO maybe use the loading state for some animation
  // TODO remove html from summary text
  return (
    <div>
      <div>
        <Link to='/'>BACK</Link>
      </div>
      <div className='header'>
        <img src={showDetails.summary?.image?.medium} alt='show' />
        <div>{showDetails.summary?.name}</div>
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
        dangerouslySetInnerHTML={{ __html: showDetails.summary?.summary }}
      ></div>
      <div></div>
      <CastSection casts={showDetails.cast} />
      <SeasonSection seasons={showDetails.seasons} />
    </div>
  )
}

export default Details
