import Movies from "./Movies";
import Pages from "./Pages";

const Trending = ({state, states, searchFormSubmit, searchInputChange, onePageBack, onePageUp, twoPagesBack, twoPagesUp, getMovies, movies, getTvShows, title}) => {
  return (
    <>
        <Movies
          state = {state}
          states = {states}
          getMovies = {getMovies}
          getTvShows = {getTvShows}
          title = {title}
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
    </>
  )
}

export default Trending;