const HeroImage = (props) => {
    if (props.posterPath) {
        return (
            <>
                <img src={`https://image.tmdb.org/t/p/w780${props.posterPath}`} alt={props.title} className={`hero__images__image`} id={`carousel-image-${props.index}`} onClick={() => props.openModal('movie', props.id, props.title)
}/>
            </>
        )
    } else {
        return null
    }
}
export default HeroImage;