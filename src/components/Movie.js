import { motion } from "framer-motion";

const Movie = props => {

    const title = props.movieTitle ? props.movieTitle : props.tvTitle;
    const releaseDate = props.movieReleaseDate ? props.movieReleaseDate : props.tvReleaseDate;

    // Movie Variants
    const movieVariants = {
        hidden: {
            opacity: 0,
            x: -400
        },
        visible: {
            opacity: 1,
             x:0,
             transition: {
                duration: 0.2,
                delay: props.movieAnimationDelay,
                type: 'spring',
                stiffness: 75,
                mass: 0.7,
                damping: 9
             }
        }
    }

    // Image Variants
    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: props.movieAnimationDelay + 0.25,
                type: 'spring',
                stiffness: 400,
                mass: 0.2,
                damping: 9
            }
        }
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

    function openModal() {
        fetch(`https://api.themoviedb.org/3/${props.category}/${props.id}?api_key=6de482bc8c5768aa3648618b9c3cc98a&language=en-US`)
        .then(response => response.json())
        .then(responseData => {
            props.setModal(prevModal => ({
                ...prevModal,
                isOpen: true,
                queryId: props.id,
                response: responseData
            }))
        })
    }

    return (
        <motion.div
        className="movie"
        onClick = {openModal}
        variants= {movieVariants}
        initial = 'hidden'
        animate = 'visible'
        >
            <motion.img
            loading=""  
            src={`https://image.tmdb.org/t/p/w200${props.image}`}
            alt={title}
            className="movie__image"
            variants= {imageVariants}
            />
            <div className="movie__details">
                <h2 className="movie__details__title">{title} <span>{props.getReleaseYear(releaseDate)}</span></h2>
                <h3 className="movie__details__genre">{props.getGenre(props.genre)}</h3>
                <h4 className={`movie__details__rating ${ratingColor(props.rating)}`}>{props.rating !== 0 && props.rating !== 10 ? props.rating.toFixed(1) : props.rating}</h4>
                <p className="movie__details__overview">{props.overview}</p>
            </div>
        </motion.div>
    )
}

export default Movie;