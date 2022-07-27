import Categories from "./Categories";

const Movies = ({state, states, getMovies, getTvShows, searchFormSubmit, searchInputChange, title, movies}) => {
    return (
        <section className="wrapper" id='movies'>
            <h1 className='title movies-title'>{title}</h1>
            <form className="search-form movies-form" onSubmit={searchFormSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search-input" name="searchInput" placeholder='Search...' autoComplete="off" onChange={searchInputChange}/>
            </form>
            <div className="categories-search-container movies-categories">
                <h1 className='title movies-mobile-title'>{title}</h1>
                {state.title !== 'Now Playing' && <Categories
                state = {state}
                states = {states}
                getMovies = {getMovies}
                getTvShows = {getTvShows}
                />}
                <form className="search-form movies-desktop-form" onSubmit={searchFormSubmit}>
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