import Movies from "../components/Movies";
import Pages from "../components/Pages";

const Trending = ({searchInputValue, search, state, states, searchFormSubmit, searchInputChange, onePageBack, onePageUp, twoPagesBack, twoPagesUp, getMovies, movies, getTvShows}) => {
  return (
    <>
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
    </>
  )
}

export default Trending;