import Categories from "./Categories";

const Movies = ({state, states, getMovies, getTvShows, searchFormSubmit, searchInputChange, title, movies}) => {
    return (
        <section className="wrapper" id='movies'>
            <h1 className='title'>Explore {title} <span>Movies</span> & <span>Tv Shows</span></h1>
            <div className="categories-search-container movies-categories">
                <Categories
                state = {state}
                states = {states}
                getMovies = {getMovies}
                getTvShows = {getTvShows}
                />
                <form className="search-form" onSubmit={searchFormSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search-input" name="searchInput" placeholder='Search...' autoComplete="off" onChange={searchInputChange}/>
                </form>
            </div> 
            {/* {props.method === 'search' && <h1 className='title'>Search results for <em>"{props.searchInput}"</em></h1>} */}
            {/* {(props.method === 'search' && props.responseMovies.length === 0) && <p className="no-results">There are no results matching <em>"{props.searchInput}".</em></p>} */}
            {movies}
        </section>
    )
}

export default Movies;