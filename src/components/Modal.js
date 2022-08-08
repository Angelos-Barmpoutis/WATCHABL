import { motion } from "framer-motion";

const Modal = ({modal, closeModal}) => {
    // Map through genres' list and return a list of genres' names
    const genres = modal.results.genres.map(genre => {
        return genre.name
    })

    // Map through genres' names list from above anf for every name return an h3 
    const genresNames = genres.map((name) => {
        return <p className="modal__details__genres__genre" key={name.toString()}>{name}</p>
    })

    const backgroundImage = modal.results.backdrop_path ? modal.results.backdrop_path : modal.results.poster_path

    return (
        <div className="modal-container">
                <motion.div
                    className="modal-backdrop"
                    onClick={closeModal}
                    initial = {{opacity: 0}}
                    animate = {{opacity: 1}}
                    transition= {{ type: 'spring'}}
                    exit = {{opacity: 0}}
                >
                </motion.div>
                <motion.div
                    className = "modal"
                    initial = {{opacity: 0, scale: 0}}
                    animate = {{opacity: 1, scale: 1}}
                    transition = {{type: 'spring', stiffness: 70}}
                    exit = {{opacity: 0, scale: 0}}
                >
                     <div className="modal__x-button" onClick={closeModal}>
                            <i className="fa-solid fa-x"></i>
                    </div>
                    
                    <section
                        className="modal__hero"
                        style = {{background: `linear-gradient(-150deg, rgba(3, 5, 12, 0.3), rgba(3, 5, 12, 0)),linear-gradient(to bottom, rgba(3, 5, 12, 0), rgb(3, 5, 12)), url(https://image.tmdb.org/t/p/w780${backgroundImage}) no-repeat center center/cover`}}
                        >
                    </section>
                    <section className="modal__details">
                        <div className="modal__details__profile">
                            {modal.results.poster_path !== null &&<img
                                loading="lazy"  
                                src={`https://image.tmdb.org/t/p/w342${modal.results.poster_path}`}
                                alt={modal.results.title}
                                className='modal__details__profile__image'
                            />}
                            <div className="modal__details__profile__title">
                                {modal.results.name && <h2>{modal.results.name}</h2>}
                                {modal.results.title && <h2>{modal.results.title}</h2>}

                                {modal.results.first_air_date && <p>{modal.results.first_air_date}</p>}

                                {modal.results.last_air_date && <p>{modal.results.last_air_date}</p>}

                                {modal.results.release_date && <p>{modal.results.release_date}</p>}

                                {modal.results.episode_run_time && modal.results.episode_run_time !== null && modal.results.episode_run_time.length !== 0 && <p>{modal.results.episode_run_time[0]} minutes</p>}

                                {(modal.results.runtime && modal.results.runtime !== null) && <p>{modal.results.runtime} minutes</p>}
                            </div>
                        </div>

                        {modal.results.tagline
                        && <p className="modal__details__tagline">
                                <i>{modal.results.tagline}</i>
                            </p>}

                        {modal.results.overview
                                && <div className="modal__details__overview">
                                <p>
                                    {modal.results.overview}
                                </p>
                        </div>}

                        <div className="modal__details__genres">
                            {modal.results.genres && genresNames}
                        </div>
                        
                        <div className="modal__details__stats">
                            {modal.results.type
                                && <div className="modal__details__stats__item">
                                        <h3>Type:</h3>
                                        <p>{modal.results.type}</p>
                            </div>}

                            {modal.results.status
                                && <div className="modal__details__stats__item">
                                        <h3>Status:</h3>
                                        <p>{modal.results.status}</p>
                            </div>}


                            {modal.results.original_language
                                && <div className="modal__details__stats__item">
                                        <h3>Original Language:</h3>
                                        <p>{modal.results.original_language}</p>
                            </div>}

                            {modal.results.number_of_seasons
                                && <div className="modal__details__stats__item">
                                        <h3>Seasons:</h3>
                                        <p>{modal.results.number_of_seasons}</p>
                            </div>}
                        
                            {modal.results.number_of_episodes !== 0 && modal.results.number_of_episodes
                                && <div className="modal__details__stats__item">
                                        <h3>Episodes:</h3>
                                        <p>{modal.results.number_of_episodes}</p>
                            </div>}

                            {modal.results.vote_average !== 0
                                && <div className="modal__details__stats__item">
                                        <h3>Average Rating:</h3>
                                        <p>{modal.results.vote_average !== 0 && modal.results.vote_average !== 10 ? modal.results.vote_average.toFixed(1) : modal.results.vote_average}</p>
                            </div>}

                            {modal.results.vote_count !== 0
                                && <div className="modal__details__stats__item">
                                        <h3>Votes:</h3>
                                        <p>{modal.results.vote_count}</p>
                            </div>}
                        </div>

                    </section>
                </motion.div>
        </div>
    )
} 

export default Modal;