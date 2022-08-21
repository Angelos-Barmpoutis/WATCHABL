import Movies from "../components/Movies";
import Pages from "../components/Pages";
import { motion } from "framer-motion";

const Search = ({searchInputValue, search, state, states, searchFormSubmit, searchInputChange, onePageBack, onePageUp, twoPagesBack, twoPagesUp, getMovies, movies, getTvShows}) => {
  return (
    <motion.div
    initial = {{opacity: 0}}
    animate = {{opacity: 1}}
    transition = {{duration: .8, ease: 'easeInOut'}}
    exit = {{opacity: 0, transition : {ease: 'easeInOut'}}}
    >
        <Movies
          searchInputValue = {searchInputValue}
          search = {search}
          state = {state}
          states = {states}
          getMovies = {getMovies}
          getTvShows = {getTvShows}
          title = {state.title}
          movies = {movies}
          searchFormSubmit = {searchFormSubmit}
          searchInputChange = {searchInputChange}
        />

        {state.results.length === 0 && <p className="no-results">There are no results matching <em>"{search.query}".</em></p>}

        {state.results.length !== 0 && <Pages
          state = {state}
          setState = {states[0]}
          page = {state.page} 
          totalPages = {state.totalPages}
          onePageBack = {onePageBack}
          twoPagesBack = {twoPagesBack}
          onePageUp = {onePageUp}
          twoPagesUp = {twoPagesUp}
        />} 
    </motion.div>
  )
}

export default Search;