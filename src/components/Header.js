import Hero from './Hero';

const Header = (props) => {
    return (
        <header>
            <nav>
                <div className="nav wrapper">
                    <a href='index.html' className="header-logo"
                        >Watch<span>DB</span>
                    </a>
                    <form className="header-form" onSubmit={props.searchFormSubmit}>
                        <input type="text" id="searchInput" name="searchInput" placeholder='Search...' onChange={props.searchInputChange}/>
                        <button aria-label='Search button' type="submit" id="searchButton"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
            </nav>
            <Hero />
        </header>
    )
}

export default Header