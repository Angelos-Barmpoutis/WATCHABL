import Movies from "./Movies"
// import Pages from "./Pages"

const MostPopular = ({state, states, searchFormSubmit, searchInputChange, onePageBack, onePageUp, twoPagesBack, twoPagesUp, getMovies, movies, getTvShows, title}) => {
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
        {/* {response.results.length !== 0 && <Pages 
          onePageBack = {onePageBack}
          twoPagesBack = {twoPagesBack}
          onePageUp = {onePageUp}
          twoPagesUp = {twoPagesUp}
        /> } */}
    </>
  )
}

export default MostPopular