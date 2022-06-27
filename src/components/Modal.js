import { motion } from "framer-motion";

const Modal = (props) => {
    // Modal Variatnts
    const modalVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                type: 'spring'
            }
        }
    }

    // Map through genres' list and return a list of genres' names
    const genres = props.modal.response.genres.map(genre => {
        return genre.name
    })

    // Map through genres' names list from above anf for every name return an h3 
    const genresNames = genres.map((name, index) => {
        return <h3 className="modal__details__genres__genre" key={name.toString()}>{name}</h3>
    })

    // Modal for Movies
    if (props.category === 'movie') {
        return (
            <motion.div
            className="modal"
            variants = {modalVariants}
            initial = 'hidden'
            animate = 'visible'
            >
                <div className="modal__x-button" onClick={props.closeModal}>
                    <i className="fa-solid fa-x"></i>
                </div>
                <div className="modal__wrapper">
                    <h2 className="modal__title">{props.modal.response.title}</h2>
                    {props.modal.response.poster_path !== null &&<img
                        loading="lazy"  
                            src={`https://image.tmdb.org/t/p/w342${props.modal.response.poster_path}`}
                            alt={props.modal.response.title}
                            className='modal__image'
                    />}
                    <div className="modal__details">
                            {props.modal.response.release_date && <h3 className="modal__details__release-date"><em>Release date:</em> {props.modal.response.release_date}</h3>}
                            {props.modal.response.runtime !== null && <h3 className="modal__details__runtime"><em>Runtime:</em> {props.modal.response.runtime} minutes</h3>}
                            <h3 className="modal__details__original-language"><em>Original language:</em> {props.modal.response.original_language}</h3>
                            <div className="modal__details__genres">
                                {genresNames}
                            </div>
                            {props.modal.response.tagline !== null && <p className="modal__details__tagline"><i>{props.modal.response.tagline}</i></p>}
                            {/* {props.modal.response.overview !== null && <p className="modal__details__overview">{props.modal.response.overview}</p>} */}
                    </div>
                    {props.modal.response.overview !== null && <p className="modal__overview">{props.modal.response.overview}</p>}
                </div>
            </motion.div>
        )
    } else {
        // Modal for TV Shows
        return (
            <motion.div
            className = "modal"
            variants = {modalVariants}
            initial = 'hidden'
            animate = 'visible'
            >
                <div className="modal__x-button" onClick={props.closeModal}>
                    <i className="fa-solid fa-x"></i>
                </div>
                <div className="modal__wrapper">
                    <h2 className="modal__title">{props.modal.response.name}</h2>
                    {props.modal.response.poster_path !== null &&<img
                        loading="lazy"  
                        src={`https://image.tmdb.org/t/p/w342${props.modal.response.poster_path}`}
                        alt={props.modal.response.title}
                        className='modal__image'
                    />}
                    <div className="modal__details">
                        {(props.modal.response.first_air_date && props.modal.response.last_air_date) && <h3 className="modal__details__on-air"><em>On air:</em> {props.modal.response.first_air_date} - {props.modal.response.last_air_date}</h3>}
                        {props.modal.response.episode_run_time !== null && <h3 className="modal__details__episode-run-time"><em>Episode runtime:</em> {props.modal.response.episode_run_time[0]} minutes</h3>}
                        {props.modal.response.number_of_seasons && <h3 className="modal__details__number-of-seasons"><em>Seasons:</em> {props.modal.response.number_of_seasons}</h3>}
                        {props.modal.response.number_of_seasons && <h3 className="modal__details__number-of-episodes"><em>Episodes:</em> {props.modal.response.number_of_episodes}</h3>}
                        <h3 className="modal__details__original-language"><em>Original language:</em> {props.modal.response.original_language}</h3>
                        <div className="modal__details__genres">
                            {genresNames}
                        </div>
                        {props.modal.response.tagline !== null && <p className="modal__details__tagline"><i>{props.modal.response.tagline}</i></p>}
                        {props.modal.response.overview !== null && <p className="modal__overview">{props.modal.response.overview}</p>}
                    </div>
                </div>
            </motion.div>
        )
    }
} 

export default Modal;