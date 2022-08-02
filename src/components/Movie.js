import { motion } from "framer-motion";



// Movie Variants
const movieVariants = {
    hidden: i => ({
            opacity: 0,
            x: -100 * i
        }),
        visible: i => ({
            opacity: 1,
            x:0,
            transition: {
                duration: 0.3,
                type: 'spring',
                stiffness: 100,
                mass: 1,
                damping: 18
            }
        })
    }


const Movie = ({state, id, openModal, index, image, title, releaseDate, genre, rating, overview, getGenre}) => {

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
        onClick = {() => openModal(id, state.category)}
        variants= {movieVariants}
        initial = 'hidden'
        animate = 'visible'
        custom = {i}
        >
            <img
            loading="lazy"  
            src={image ? `https://image.tmdb.org/t/p/w200${image}` : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'}
            alt={title}
            className="movie__image"
            />
            <div className="movie__details">
                <h2 className="movie__details__title">{title} {releaseDate}</h2>
                <h3 className="movie__details__genre">{getGenre(genre.filter((genre, index) => index < 3))}</h3>
                
                <p className={`movie__details__rating rating ${ratingColor(rating)}`}>{rating !== 0 && rating !== 10 ? rating.toFixed(1) : rating}</p>
                <p className="movie__details__overview">{overview}</p>
            </div>
        </motion.div>
    )
}

export default Movie;