import { Link } from "react-router-dom";

const Widget = ({state, openModal, href, getGenre, genres}) => {

    // Return rating's color based on the rating
    const ratingColor = (rating) => {
      if (rating >= 7) {
          return 'green'
      } else if (rating >= 6) {
          return 'orange'
      } else {
          return 'red'
      }
    }

  const resultsFilter = state.results.filter((result, index) => result.vote_average !== 0)
  const resultsMap = resultsFilter.filter((filteredResult, index) => index < 3).map((result) => {
    return (
    <div className="movie" key={result.id} onClick={() => {openModal(result.id, state.category)}}
    >
        <img
        loading="lazy"  
        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
        alt={result.title ? result.title : result.name}
        className="movie__image"
        />
        <div className="movie__details">
            <h3 className="movie__details__title">{result.title ? result.title : result.name}</h3>
            {genres && <h4 className="movie__details__genre">{getGenre(result.genre_ids.filter((item, index) => index < 2))}</h4>}
            <h4 className={`rating ${ratingColor(result.vote_average)}`}>{result.vote_average !== 0 && result.vote_average !== 10 ? result.vote_average.toFixed(1) : result.vote_average}</h4>
        </div>
    </div>)
  })

  return (
    <div className="widget">
      <h2 className="widget__title">{state.title}</h2>
      {state.results && resultsMap}
      <Link className="widget__view-more btn" to={href}>View More</Link>
    </div>
  )
}


export default Widget