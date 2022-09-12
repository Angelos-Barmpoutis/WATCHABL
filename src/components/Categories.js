const Categories = ({state, states, getMovies, getTvShows}) => {

    return (
        <div className="categories">
            <button type='button' className={state.category === 'movie' ? 'categories__category active' : 'categories__category'}
            onClick={() => {
                states.forEach(state => getMovies(state))
            }}
            >Movies
            </button>
            <button type='button' className={state.category === 'tv' ? 'categories__category active' : 'categories__category'}
            onClick={() => {
                states.forEach(state => getTvShows(state))

            }}
            >TV Shows
            </button>
        </div>
    )
}

export default Categories;