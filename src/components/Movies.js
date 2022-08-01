import Categories from "./Categories";

const Movies = ({searchInputValue, search, state, states, getMovies, getTvShows, searchFormSubmit, searchInputChange, title, movies}) => {
    return (
        <section className="wrapper" id='movies'>
            <h1 className='title movies-title'>{title}</h1>
            <form className="search-form movies-form" onSubmit={searchFormSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search-input" name="searchInput" placeholder='Search...' value={searchInputValue} autoComplete="off" onChange={searchInputChange}/>
            </form>
            <div className="categories-search-container movies-categories">
                <h1 className='title movies-mobile-title'>{title}</h1>
                {state.title !== 'Now Playing' && state.title !== 'Airing Today' && <Categories
                state = {state}
                states = {states}
                getMovies = {getMovies}
                getTvShows = {getTvShows}
                />}
                <form className="search-form movies-desktop-form" onSubmit={searchFormSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search-input" name="searchInput" placeholder='Search...' value={searchInputValue} autoComplete="off" onChange={searchInputChange}/>
                </form>
            </div> 
            {movies}
        </section>
    )
}

export default Movies;