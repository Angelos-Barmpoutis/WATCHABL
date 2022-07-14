import SneakpeakCard from "./SneakpeakCard"

const Sneakpeak = ({getMovies, getTvShows, state, setState, header, results}) => {
    // Keep the first 13 results
    const resultsFilter = results.filter((result, index) => index < 13)
    const resultsMap = resultsFilter.map(result => {

        return (
        <SneakpeakCard
            key = {result.id}
            id = {result.id}
            title = {result.title ? result.title : result.name}
            image = {result.poster_path}
            releaseDate = {result.release_date ? result.release_date : result.first_air_date}
        />
        )
    })

    return (
        <section className="sneakpeak">
            <div className="wrapper">
                <div className="sneakpeak-header">
                    <h2 className="sneakpeak-header__title">{header}</h2>
                    <div className="categories">
                        <button type='button' className={state.category === 'movie' ? 'categories__category active' : 'categories__category'} onClick={() => getMovies(setState)}>Movies</button>
                        <button type='button' className={state.category === 'tv' ? 'categories__category active' : 'categories__category'} onClick={() => getTvShows(setState)}>TV Shows</button>
                    </div>
                </div>

                <div className="sneakpeak__results">
                    {resultsMap}
                </div>
            </div>
        </section>
    )
}

export default Sneakpeak;