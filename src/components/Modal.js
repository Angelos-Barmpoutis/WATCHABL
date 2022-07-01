import { motion } from "framer-motion";

const Modal = (props) => {
    // Map through genres' list and return a list of genres' names
    const genres = props.modal.response.genres.map(genre => {
        return genre.name
    })

    // Map through genres' names list from above anf for every name return an h3 
    const genresNames = genres.map((name) => {
        return <h3 className="modal__details__genres__genre" key={name.toString()}>{name}</h3>
    })

    return (
        <div className="modal-container">
                <motion.div
                    className="modal-backdrop"
                    onClick={props.closeModal}
                    initial = {{opacity: 0}}
                    animate = {{opacity: 1}}
                    transition= {{ duration: 0.7, type: 'spring'}}
                    exit = {{opacity: 0}}
                >
                </motion.div>
                <motion.div
                    className = "modal"
                    initial = {{opacity: 0, scale: 0}}
                    animate = {{opacity: 1, scale: 1}}
                    transition = {{duration: .7, type: 'spring'}}
                    exit = {{opacity: 0, scale: 0}}
                >
                <div className="modal__x-button" onClick={props.closeModal}>
                    <i className="fa-solid fa-x"></i>
                </div>

                    {props.modal.response.name
                    && <h2 className="modal__title">
                        {props.modal.response.name}
                    </h2>}

                    {props.modal.response.title
                    && <h2 className="modal__title">
                        {props.modal.response.title}
                    </h2>}

                    {props.modal.response.poster_path !== null &&<motion.img
                        loading="lazy"  
                        src={`https://image.tmdb.org/t/p/w342${props.modal.response.poster_path}`}
                        alt={props.modal.response.title}
                        className='modal__image'
                        initial = {{opacity: 0}}
                        animate = {{opacity: 1}}
                        transition= {{ duration: 0.7, type: 'spring'}}
                        exit = {{opacity: 0}}
                    />}

                    <div className="modal__details">
                        {props.modal.response.release_date
                        && <div className="modal__details__container">
                                <h3 className="label">Release date:</h3>
                                <p className="details">{props.modal.response.release_date}</p>
                            </div>}

                        {(props.modal.response.first_air_date && props.modal.response.last_air_date)
                        && <div className="modal__details__container">
                                <h3 className="label">On air:</h3>
                                <p className="details">{props.modal.response.first_air_date} - {props.modal.response.last_air_date}</p>
                            </div>}

                        {props.modal.response.episode_run_time
                        && <div className="modal__details__container">
                                <h3 className="label">Episode runtime:</h3>
                                <p className="details">{props.modal.response.episode_run_time[0]} minutes</p>
                            </div>}

                        {(props.modal.response.runtime && props.modal.response.runtime !== null)
                        && <div className="modal__details__container">
                                <h3 className="label">Runtime:</h3>
                                <p className="details">{props.modal.response.runtime} minutes</p>
                            </div>}

                        {props.modal.response.number_of_seasons
                        && <div className="modal__details__container">
                                <h3 className="label">Seasons:</h3>
                                <p className="details">{props.modal.response.number_of_seasons}</p>
                            </div>}
                        
                        {props.modal.response.number_of_episodes
                        && <div className="modal__details__container">
                                <h3 className="label">Episodes:</h3>
                                <p className="details">{props.modal.response.number_of_episodes}</p>
                            </div>}

                        {props.modal.response.original_language
                        && <div className="modal__details__container">
                                <h3 className="label">Original language:</h3>
                                <p className="details">{props.modal.response.original_language}</p>
                            </div>}

                        {props.modal.response.genres && 
                            <div className="modal__details__genres">
                                {genresNames}
                            </div>}

                        {props.modal.response.tagline
                        && <p className="modal__details__tagline">
                                <i>{props.modal.response.tagline}</i>
                            </p>}

                        {props.modal.response.overview
                        && <p className="modal__overview">
                                {props.modal.response.overview}
                            </p>}
                    </div>
                </motion.div>
        </div>
    )
} 

export default Modal;