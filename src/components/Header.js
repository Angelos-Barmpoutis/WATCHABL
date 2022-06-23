import Hero from './Hero';

const Header = (props) => {
    return (
        <header>
            <nav>
                <div className="nav wrapper">
                    <a href='#' className="header-logo" onClick={() => {window.location.reload()}}>Watch<span>DB</span></a>
                    <form className="header-form" onSubmit={props.searchFormSubmit}>
                        <input type="text" id="searchInput" name="searchInput" placeholder='Search for a movie or tv show...' onChange={props.searchInputChange}/>
                        <button type="submit" id="searchButton">Search</button>
                    </form>
                </div>
            </nav>
            <Hero />
        </header>
    )
}

export default Header