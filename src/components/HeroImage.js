const HeroImage = (props) => {
    if (props.posterPath) {
        return (
            <>
                <img src={`https://image.tmdb.org/t/p/w780${props.posterPath}`} alt={props.title} className={`hero__images__image ${props.active}`} />
                {/* <h2>{props.title}</h2> */}
            </>
        )
    } else {
        return null
    }
}
{/* <img src={`https://image.tmdb.org/t/p/w780${props.posterPath}`} className={`hero__images__image ${props.active}`} onClick={() => props.openModal('movie', props.id, props.title)
}> */}
export default HeroImage;