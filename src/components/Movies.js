const Movies = (props) => {
    return (
        <section className="wrapper" id='movies'>
            {props.method === 'discover' && <h1 className='title'>Explore the Most Popular <span>Movies</span> & <span>TV Shows</span></h1>}
            {props.method === 'search' && <h1 className='title'>Search results for <em>"{props.searchInput}"</em></h1>}
            <div className="categories">
                <button type='button' className={props.category === 'movie' ? 'categories__category active' : 'categories__category'} onClick={props.getMovies}>Movies</button>
                <button type='button' className={props.category === 'tv' ? 'categories__category active' : 'categories__category'} onClick={props.getTvShows}>TV Shows</button>
            </div>
            {(props.method === 'search' && props.responseMovies.length === 0) && <p className="no-results">There are no results matching <em>"{props.searchInput}".</em></p>}
            {props.movies}
        </section>
    )
}

export default Movies;