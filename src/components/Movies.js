import { motion } from 'framer-motion';
import Movie from './Movie';

const Movies = (props) => {
    let  movieAnimationDelay = .15;

    // Movies Variants
    const moviesVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 1
            }
        }
    }

    // Convert genre IDs from numbers to words
    function getGenre(genreIds) {
        const genreMap = genreIds.map(genreId => {
            for (let i = 0; i < props.genres.length; i++) {
                if (props.genres[i].id === genreId) {
                    return props.genres[i].name;
                }
            }
            return null;
        })
        return genreMap.toString().replaceAll(',', ', ');
    }

    // Convert entire release date to only its year
    function getReleaseYear(releaseDate) {
        if (releaseDate) {
            const releaseYear = new Date(releaseDate).getFullYear()
            return `(${releaseYear})`
        }
    }

    const movies = props.responseMovies.map((movie) => {
        movieAnimationDelay += .25;
        const {title, overview, id, poster_path, vote_average, genre_ids, release_date, name, first_air_date} = movie;
        if (poster_path !== null && overview) {
            return (
                <Movie
                    key = {id}
                    movieTitle = {title}
                    tvTitle = {name}
                    overview = {overview}
                    image = {poster_path}
                    rating = {vote_average}
                    genre = {genre_ids}
                    movieReleaseDate = {release_date}
                    tvReleaseDate = {first_air_date}
                    getGenre = {getGenre}
                    getReleaseYear = {getReleaseYear}
                    movieAnimationDelay = {movieAnimationDelay}
                 />
            );
        }
        return null;
    })

    return (
        <motion.section
        className="wrapper"
        id='movies'
        variants = {moviesVariants}
        initial = 'hidden'
        animate = 'visible'
        >
            {props.method === 'discover' && <h1 className='title'>Explore the Most Popular <span>Movies</span> & <span>TV Shows</span></h1>}
            {props.method === 'search' && <h1 className='title'>Search results for <em>"{props.searchInput}"</em></h1>}
            <div className="movies__categories">
                <button type='button' className={props.category === 'movie' ? 'movies__categories__category active' : 'movies__categories__category'} onClick={props.getMovies}>Movies</button>
                <button type='button' className={props.category === 'tv' ? 'movies__categories__category active' : 'movies__categories__category'} onClick={props.getTvShows}>TV Shows</button>
            </div>
            {movies}
        </motion.section>
    )
}

export default Movies;