import { Link } from "react-router-dom"
import SneakpeakCard from "./SneakpeakCard"

const Sneakpeak = ({getMovies, getTvShows, state, setState, header, results, href}) => {
    // Render the first 12 results
    const resultsFilter = results.filter((result, index) => index < 12)
    const resultsMap = resultsFilter.map(result => {
        return (
        <SneakpeakCard
            key = {result.id}
            id = {result.id}
            title = {result.title ? result.title : result.name}
            image = {result.poster_path}
            releaseDate = {result.release_date ? result.release_date : result.first_air_date}
            rating = {result.vote_average}
        />
        )
    })

    return (
        <section className="sneakpeak">
            <div className="wrapper">
                <div className="sneakpeak-header">
                    <h2 className="sneakpeak-header__title">{header}</h2>
                    <Link to={href} className='sneakpeak-header__view-all' onClick={() => window.scrollTo(0,  0)}>View All <i className="fa-solid fa-chevron-right"></i></Link>
                </div>

                <div className='sneakpeak__results'>
                    {resultsMap}
                </div>
            </div>
        </section>
    )
}

export default Sneakpeak;