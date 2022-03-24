import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Details = () => {
  const params = useParams()
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
