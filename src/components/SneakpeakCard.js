import { motion, AnimatePresence } from "framer-motion";

const SneakpeakCard = ({openModal, state, id, title, image, releaseDate, rating}) => {
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
        <AnimatePresence>
            <motion.div
                initial = {{opacity: 0}}
                animate = {{opacity: 1}}
                transition= {{ duration: 1, type: 'spring'}}
                exit = {{opacity: 0, scale: 0}}
                className="sneakpeak__results__card"
                onClick={() => openModal(id, state.category)}
            >
                <img loading="lazy" src={`https://image.tmdb.org/t/p/w200${image}`} alt={title }className="sneakpeak__results__card__image" />
                <p className={`rating ${ratingColor(rating)}`}>{rating !== 0 && rating !== 10 ? rating.toFixed(1) : rating}</p>
                <h3 className="sneakpeak__results__card__title">{title}</h3>
                <p className="sneakpeak__results__card__release-date">{releaseYear(releaseDate)}</p>
            </motion.div>
        </AnimatePresence>
    )
}

export default SneakpeakCard;