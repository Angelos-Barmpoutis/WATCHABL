import { motion } from 'framer-motion';
import Hero from './Hero';

const Header = (props) => {
    // Logo Variants
    const logoVariants = {
        hidden:{
            y: -100,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: 1.3,
                type: 'spring',
                stiffness: 200,
                mass: 1,
                dampings:2
            }
        }
    }

    return (
        <header>
            <nav>
                <div className="nav wrapper">
                    <motion.a
                    variants = {logoVariants}
                    initial = 'hidden'
                    animate = 'visible'
                    href='index.html'
                    className="header-logo"
                    >Watch<span>DB</span>
                    </motion.a>
                    <form className="header-form" onSubmit={props.searchFormSubmit}>
                        <input type="text" id="searchInput" name="searchInput" placeholder='Search...' onChange={props.searchInputChange}/>
                        <button type="submit" id="searchButton"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
            </nav>
            <Hero />
        </header>
    )
}

export default Header