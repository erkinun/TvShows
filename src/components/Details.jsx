import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// TODO fetch cast and season
// TODO handle fav status
// TODO get show by id - just fetch from the api with id
// TODO initial data load

const Details = () => {
  const params = useParams()
  const showId = params.showId
  const showDetails = useSelector((state) =>
    state.search.hits.map((s) => s.show).find((s) => s.id === showId)
  )
  console.log(showDetails)
  return (
    <div>
      <div>
        <Link to='/'>BACK</Link>
      </div>
      Details here for {params.showId}
    </div>
  )
}

export default Details
