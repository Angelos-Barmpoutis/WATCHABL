const Movie = props => {
    const ratingColor = (rating) => {
        if (rating >= 7) {
            return 'green'
        } else if (rating >= 6) {
            return 'orange'
        } else {
            return 'red'
        }
    }

    const title = props.movieTitle ? props.movieTitle : props.tvTitle;
    const releaseDate = props.movieReleaseDate ? props.movieReleaseDate : props.tvReleaseDate;

    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w200${props.image}`} alt={props.title}  className="movie__image"/>
            <div className="movie__details">
                <h2 className="movie__details__title">{title} <span>{props.getReleaseYear(releaseDate)}</span></h2>
                <h3 className="movie__details__genre">{props.getGenre(props.genre)}</h3>
                <h4 className={`movie__details__rating ${ratingColor(props.rating)}`}>{props.rating !== 0 && props.rating !== 10 ? props.rating.toFixed(1) : props.rating}</h4>
                <p className="movie__details__overview">{props.overview}</p>
            </div>
        </div>
    )
}

export default Movie;