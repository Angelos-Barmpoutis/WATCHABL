import { motion } from "framer-motion";



// Movie Variants
const movieVariants = {
    hidden: {
            opacity: 0,
            x: -400
        },
        visible: i => ({
            opacity: 1,
            x:0,
            transition: {
                delay: i * 0.3,
                duration: 0.3,
                type: 'spring',
                stiffness: 100,
                mass: 1,
                damping: 15
            }
        })
    }

// Image Variants
const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0
        },
        visible: i => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: (i * 0.3) + 0.3,
                duration: 0.3,
                type: 'spring',
                stiffness: 100,
                mass: 1,
                damping: 15
            }
        })
}

const Movie = ({index, image, title, releaseDate, genre, rating, overview, getGenre}) => {

    const i = index;

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
        <motion.div
        className="movie"
        // onClick = {() => props.openModal(props.category, props.id, title)}
        variants= {movieVariants}
        initial = 'hidden'
        animate = 'visible'
        custom = {i}
        >
            <motion.img
            loading="lazy"  
            src={`https://image.tmdb.org/t/p/w200${image}`}
            alt={title}
            className="movie__image"
            variants= {imageVariants}
            initial = 'hidden'
            animate = 'visible'
            custom = {i}
            />
            <div className="movie__details">
                <h2 className="movie__details__title">{title} {releaseDate}</h2>
                {/* <h3 className="movie__details__release">{props.releaseDate}</h3> */}
                <h3 className="movie__details__genre">{getGenre(genre.filter((genre, index) => index < 3))}</h3>
                
                <h4 className={`movie__details__rating rating ${ratingColor(rating)}`}>{rating !== 0 && rating !== 10 ? rating.toFixed(1) : rating}</h4>
                <p className="movie__details__overview">{overview}</p>
            </div>
        </motion.div>
    )
}

export default Movie;