const Movies = (props) => {
    return (
        <section className="wrapper" id='movies'>
            {props.method === 'discover' && <h1 className='title'>Explore the Most Popular <span>Movies</span> & <span>TV Shows</span></h1>}
            {props.method === 'search' && <h1 className='title'>Search results for <em>"{props.searchInput}"</em></h1>}
            <div className="movies__categories">
                <button type='button' className={props.category === 'movie' ? 'movies__categories__category active' : 'movies__categories__category'} onClick={props.getMovies}>Movies</button>
                <button type='button' className={props.category === 'tv' ? 'movies__categories__category active' : 'movies__categories__category'} onClick={props.getTvShows}>TV Shows</button>
            </div>
            {props.movies}
        </section>
    )
}

export default Movies;