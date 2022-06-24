const HeroImage = (props) => {
    
    return (
        <div className={`hero__images__image ${props.active}`} style={{background:`linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url(https://image.tmdb.org/t/p/w780${props.posterPath}) center center/cover no-repeat`}}>
            <h2>{props.title}</h2>
        </div>
    )
}

export default HeroImage;