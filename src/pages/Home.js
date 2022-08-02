import Sneakpeak from '../components/Sneakpeak';
import Hero from '../components/Hero';
import Categories from '../components/Categories';

const Home = ({openModal, heroTrending, searchInputValue, search, getMovies, getTvShows, mostPopular, setMostPopular, trending, setTrending, topRated, setTopRated, searchFormSubmit, searchInputChange}) => {
  return (
    <>
    <div className="categories-search-container wrapper">
      <Categories
        state = {mostPopular}
        states = {[setMostPopular, setTopRated, setTrending]}
        getMovies = {getMovies}
        getTvShows = {getTvShows}
      />
      <form className="search-form" onSubmit={searchFormSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="search-input" name="searchInput" placeholder='Search...' value={searchInputValue} autoComplete="off" onChange={searchInputChange}/>
      </form>
    </div>  
      {heroTrending && <Hero
        heroTrending = {heroTrending}
      />}
      <Sneakpeak
        openModal = {openModal}
        state = {mostPopular}
        header = 'Most Popular'
        href = '/mostPopular'
      />
      <Sneakpeak
        openModal = {openModal}
        state = {trending}
        header = "Trending Today"
        href = '/trending'
      />
      <Sneakpeak
        openModal = {openModal} 
        state = {topRated}
        header = "Top Rated"
        href = '/topRated'
      />
    </>
  )
}

export default Home