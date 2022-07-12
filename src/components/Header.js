import Hero from './Hero';

const Header = (props) => {
    return (
        <header>
            <nav>
                <div className="nav wrapper">
                    <a href='index.html' className="header-logo"
                        ><img src="../images/logo.png" alt="Logo" className='logo'/>
                    </a>
                    <form className="header-form" onSubmit={props.searchFormSubmit}><i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="searchInput" name="searchInput" placeholder='Search...' onChange={props.searchInputChange}/>
                    </form>
                </div>
            </nav>
            <Hero
                openModal = {props.openModal}
            />
        </header>
    )
}

export default Header