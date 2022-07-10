const HeroImage = (props) => {
    if (props.posterPath) {
        return (
            <div className={`hero__images__image ${props.active}`} style={{background:`linear-gradient(30deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/w780${props.posterPath}) center center/cover no-repeat`}} onClick={() => {
                props.openModal('movie', props.id, props.title)
            }}>
                <h2>{props.title}</h2>
            </div>
        )
    } else {
        return null
    }
}

export default HeroImage;