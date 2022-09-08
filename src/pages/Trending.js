import Movies from "../components/Movies";
import Pages from "../components/Pages";
import { motion } from "framer-motion";

const Trending = ({searchInputValue, search, state, states, searchFormSubmit, searchInputChange, onePageBack, onePageUp, twoPagesBack, twoPagesUp, getMovies, movies, getTvShows}) => {

  document.title = `WATCHABL | ${state.title}`;

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
        <Pages
          state = {state}
          setState = {states[0]}
          page = {state.page} 
          totalPages = {state.totalPages}
          onePageBack = {onePageBack}
          twoPagesBack = {twoPagesBack}
          onePageUp = {onePageUp}
          twoPagesUp = {twoPagesUp}
        /> 
    </motion.div>
  )
}

export default Trending;