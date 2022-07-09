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

    const backgroundImage = props.modal.response.backdrop_path ? props.modal.response.backdrop_path : props.modal.response.poster_path

    return (
        <div className="modal-container">
                <motion.div
                    className="modal-backdrop"
                    onClick={props.closeModal}
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
                     <div className="modal__x-button" onClick={props.closeModal}>
                            <i className="fa-solid fa-x"></i>
                    </div>
                    
                    <section
                        className="modal__hero"
                        style = {{background: `linear-gradient(-150deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/w780${backgroundImage}) no-repeat center center/cover`}}
                        >
                    </section>
                    <section className="modal__details">
                        <div className="modal__details__profile">
                            {props.modal.response.poster_path !== null &&<img
                                loading="lazy"  
                                src={`https://image.tmdb.org/t/p/w342${props.modal.response.poster_path}`}
                                alt={props.modal.response.title}
                                className='modal__details__profile__image'
                            />}
                            {props.modal.response.name
                            && <h2 className="modal__details__profile__title">
                                {props.modal.response.name}
                            </h2>}

                            {props.modal.response.title
                            && <h2 className="modal__details__profile__title">
                                {props.modal.response.title}
                            </h2>}
                        </div>

                        {props.modal.response.tagline
                        && <p className="modal__details__tagline">
                                <i>{props.modal.response.tagline}</i>
                            </p>}

                        <div className="modal__details__genres">
                            {props.modal.response.genres && genresNames}
                        </div>
                        
                        <div className="modal__details__stats">
                            {props.modal.response.status
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-regular fa-circle"></i>Status:</h3>
                                        <p>{props.modal.response.status}</p>
                            </div>}

                            {props.modal.response.release_date
                            && <div className="modal__details__stats__item">
                                    <h3><i class="fa-regular fa-calendar"></i>Release Date:</h3>
                                    <p>{props.modal.response.release_date}</p>
                            </div>}

                            {props.modal.response.first_air_date && <div className="modal__details__stats__item">
                                
                                    <h3><i class="fa-regular fa-calendar"></i>First Air Date:</h3>
                                    <p>{props.modal.response.first_air_date}</p>
                            </div>}
                            
                            {props.modal.response.first_air_date && <div className="modal__details__stats__item">
                                    <h3><i class="fa-regular fa-calendar"></i>Last Air Date:</h3>
                                    <p>{props.modal.response.last_air_date}</p>
                            </div>}

                            {props.modal.response.episode_run_time
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-regular fa-clock"></i>Episode Runtime:</h3>
                                        <p>{props.modal.response.episode_run_time[0]} minutes</p>
                            </div>}

                            {(props.modal.response.runtime && props.modal.response.runtime !== null)
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-regular fa-clock"></i>Runtime:</h3>
                                        <p>{props.modal.response.runtime} minutes</p>
                            </div>}

                            {props.modal.response.number_of_seasons
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-solid fa-clapperboard"></i>Seasons:</h3>
                                        <p>{props.modal.response.number_of_seasons}</p>
                            </div>}
                        
                            {props.modal.response.number_of_episodes
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-solid fa-film"></i>Episodes:</h3>
                                        <p>{props.modal.response.number_of_episodes}</p>
                            </div>}

                            {props.modal.response.original_language
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-solid fa-language"></i>Original Language:</h3>
                                        <p>{props.modal.response.original_language}</p>
                            </div>}

                            {props.modal.response.type
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-solid fa-tape"></i>Type:</h3>
                                        <p>{props.modal.response.type}</p>
                            </div>}

                            {props.modal.response.vote_average !== 0
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-regular fa-star"></i>Average Rating:</h3>
                                        <p>{props.modal.response.vote_average}</p>
                            </div>}


                            {props.modal.response.vote_count !== 0
                                && <div className="modal__details__stats__item">
                                        <h3><i class="fa-solid fa-person"></i>Rate Count:</h3>
                                        <p>{props.modal.response.vote_count}</p>
                            </div>}
                        </div>

                        {props.modal.response.overview
                                && <div className="modal__details__overview">
                                <h3><i class="fa-solid fa-info"></i>Overview:</h3>
                                <p>
                                    {props.modal.response.overview}
                                </p>
                        </div>}
                    </section>
                </motion.div>
        </div>
    )
} 

export default Modal;