import ShowCard from '../ShowCard'
import './Todays.css'

const TodaysTV = ({ todaysShows }) => {
  console.log(todaysShows)
  return (
    <div className='TodaysTVWrapper'>
      <h2>Todays TV</h2>
      <div className='TodaysTV'>
        {todaysShows.map((episode) => (
          <ShowWithEpisode key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  )
}

const ShowWithEpisode = ({ episode }) => {
  return (
    <div className='ShowEpisode'>
      <ShowCard show={episode.show} />
      <div>Today at {episode.airtime}</div>
    </div>
  )
}

export default TodaysTV
