const SneakpeakCard = ({id, title, image, releaseDate, rating}) => {
    const releaseYear = (releaseDate) => {
        const date = new Date(releaseDate)
        return date.getFullYear()
    }

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

    return (
        <div className="sneakpeak__results__card">
            <img loading="lazy" src={`https://image.tmdb.org/t/p/w200${image}`} alt={title }className="sneakpeak__results__card__image" />
            <h4 className={`rating ${ratingColor(rating)}`}>{rating !== 0 && rating !== 10 ? rating.toFixed(1) : rating}</h4>
            <h3 className="sneakpeak__results__card__title">{title}</h3>
            <p className="sneakpeak__results__card__release-date">{releaseYear(releaseDate)}</p>
        </div>
    )
}

export default SneakpeakCard;