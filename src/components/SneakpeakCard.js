const SneakpeakCard = ({id, title, image, releaseDate}) => {
    const releaseYear = (releaseDate) => {
        const date = new Date(releaseDate)
        return date.getFullYear()
    }

    return (
        <div className="sneakpeak__results__card">
            <img src={`https://image.tmdb.org/t/p/w200${image}`} alt="result.title" className="sneakpeak__results__card__image" />
            <h3 className="sneakpeak__results__card__title">{title}</h3>
            <p className="sneakpeak__results__card__release-date">{releaseYear(releaseDate)}</p>
        </div>
    )
}

export default SneakpeakCard;