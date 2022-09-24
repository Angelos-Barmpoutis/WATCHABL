import { motion } from "framer-motion";
import styled from 'styled-components';
import {Language} from '@styled-icons/ionicons-solid';
import {Status} from '@styled-icons/fluentui-system-filled';
import {ShowChart} from '@styled-icons/material-rounded';
import {Slideshow} from '@styled-icons/boxicons-regular';
import {Movie} from '@styled-icons/boxicons-regular';
import {Category} from '@styled-icons/boxicons-solid';

const StatusIcon = styled(Status)`
background-color: rgb(56, 148, 60);`

const RatingIcon = styled(ShowChart)`
background-color: rgb(252, 146, 54);`

const EpisodesIcon = styled(Slideshow)`
background-color: rgb(105, 42, 252);`

const SeasonsIcon = styled(Movie)`
background-color: rgb(86, 19, 244);`

const LanguageIcon = styled(Language)`
background-color: rgb(40, 99, 248);`

const TypeIcon = styled(Category)`
background-color: rgb(189, 41, 66);`

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
                    initial = {{opacity: 0, y: '100vh'}}
                    animate = {{opacity: 1, y: 0}}
                    transition = {{duration: .3}}
                    exit = {{opacity: 0, y: '100vh'}}
                >
                     <div className="modal__x-button" onClick={closeModal}>
                            <i className="fa-solid fa-x"></i>
                    </div>
                    
                    <section
                        className="modal__hero"
                        style = {{background: `linear-gradient(to bottom, rgba(3, 5, 12, 0.1) 60%, rgb(3, 5, 12)), url(https://image.tmdb.org/t/p/w780${backgroundImage}) no-repeat center center/cover`}}
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

                                {modal.results.episode_run_time && modal.results.episode_run_time !== null && modal.results.episode_run_time.length !== 0 && <p>{modal.results.episode_run_time[0]} {modal.results.episode_run_time[0] >1 ? 'minutes' : 'minute'}</p>}

                                {modal.results.runtime && modal.results.runtime !== 0 && <p>{modal.results.runtime} minutes</p>}
                            </div>
                        </div>

                        <div className="modal__details__stats">
                            {modal.results.type
                                && <div className="modal__details__stats__item">
                                        <TypeIcon />
                                        <div className="modal__details__stats__item__content">
                                            <h3>Type</h3>
                                            <p>{modal.results.type}</p>
                                        </div>
                            </div>}

                            {modal.results.status
                                && <div className="modal__details__stats__item">
                                        <StatusIcon/>
                                        <div className="modal__details__stats__item__content">
                                            <h3>Status</h3>
                                            <p>{modal.results.status}</p>
                                        </div>
                            </div>}


                            {modal.results.original_language
                                && <div className="modal__details__stats__item">
                                        <LanguageIcon />
                                        <div className="modal__details__stats__item__content">
                                            <h3>Original Language</h3>
                                            <p>{modal.results.original_language}</p>
                                        </div>
                            </div>}

                            {modal.results.number_of_seasons
                                && <div className="modal__details__stats__item">
                                        <SeasonsIcon />
                                        <div className="modal__details__stats__item__content">
                                            <h3>Seasons</h3>
                                            <p>{modal.results.number_of_seasons}</p>
                                        </div>
                            </div>}
                        
                            {modal.results.number_of_episodes !== 0 && modal.results.number_of_episodes
                                && <div className="modal__details__stats__item">
                                        <EpisodesIcon />
                                        <div className="modal__details__stats__item__content">
                                            <h3>Episodes</h3>
                                            <p>{modal.results.number_of_episodes}</p>
                                        </div>
                            </div>}

                            {modal.results.vote_average !== 0
                                && <div className="modal__details__stats__item">
                                        <RatingIcon />
                                        <div className="modal__details__stats__item__content">
                                            <h3>Rating</h3>
                                            <p>{modal.results.vote_average !== 0 && modal.results.vote_average !== 10 ? modal.results.vote_average.toFixed(1) : modal.results.vote_average}</p>
                                        </div>
                            </div>}
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

                    </section>
                </motion.div>
        </div>
    )
} 

export default Modal;