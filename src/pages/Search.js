import Movies from "../components/Movies";
import Pages from "../components/Pages";

const Search = ({searchInputValue, search, state, states, searchFormSubmit, searchInputChange, onePageBack, onePageUp, twoPagesBack, twoPagesUp, getMovies, movies, getTvShows}) => {
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
    </>
  )
}

export default Search;