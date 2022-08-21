import { Link } from "react-router-dom"
import SneakpeakCard from "./SneakpeakCard"
import { motion, AnimatePresence } from "framer-motion";

const Sneakpeak = ({openModal, state, header, href}) => {
    // Render the first 12 results
    const resultsFilter = state.results.filter((result, index) => index < 12)
    const resultsMap = resultsFilter.map(result => {
        return (
        <SneakpeakCard
            openModal = {openModal}
            state = {state}
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
                    <Link to={href} className='sneakpeak-header__view-all'>View All <i className="fa-solid fa-chevron-right"></i></Link>
                </div>
                <AnimatePresence>
                    <motion.div
                        className='sneakpeak__results'
                        initial = {{opacity: 0}}
                        animate = {{opacity: 1}}
                        transition= {{ duration: 1, type: 'spring'}}
                        exit = {{opacity: 0, scale: 0}}
                    >
                        {resultsMap}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Sneakpeak;