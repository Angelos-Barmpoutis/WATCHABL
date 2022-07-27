const Categories = ({state, states, getMovies, getTvShows}) => {

    return (
        <div className="categories">
            <button type='button' className={state.category === 'movie' ? 'categories__category active' : 'categories__category'}
            onClick={() => {
                for (let i=0; i<states.length; i++) {
                    getMovies(states[i])
                }
            }}
            >Movies
            </button>
            <button type='button' className={state.category === 'tv' ? 'categories__category active' : 'categories__category'}
            onClick={() => {
                for (let i=0; i<states.length; i++) {
                    getTvShows(states[i])
                }
            }}
            >TV Shows
            </button>
        </div>
    )
}

export default Categories;