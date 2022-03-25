import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchDetails } from '../redux/detailSlice'

// TODO fetch cast and season
// TODO handle fav status
// TODO get show by id - just fetch from the api with id
// TODO initial data load

// TODO either cut it to 5, or horizontally have a slider thing
const CastSection = ({ casts = [] }) => {
  return (
    <div>
      {casts.map((c) => {
        return (
          <div id={c.person.id}>
            <img src={c.person.image.medium} alt='person' />
            <div>{c.person.name}</div>
          </div>
        )
      })}
    </div>
  )
}

const Details = () => {
  const detailsDispatch = useDispatch()
  const params = useParams()
  const showId = params.showId
  const status = useSelector((state) => state.detail.status)
  const showDetails = useSelector((state) => {
    return state.detail.details || {}
  })
  console.log(showDetails)
  // TODO do we need to check for state?
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
        <div>
          <button>Fav Button</button>
        </div>
      </div>
      <div className='summary'>{showDetails.summary?.summary}</div>
      <div></div>
      <CastSection casts={showDetails.cast} />
    </div>
  )
}

export default Details
