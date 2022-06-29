const HeroImage = (props) => {
    if (props.posterPath) {
        return (
            <div className={`hero__images__image ${props.active}`} style={{background:`linear-gradient(30deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(https://image.tmdb.org/t/p/w780${props.posterPath}) center center/cover no-repeat`}}>
                <h2>{props.title}</h2>
            </div>
        )
    } else {
        return null
    }
}

export default HeroImage;