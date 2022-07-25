import { Link } from "react-router-dom"

const Header = ({searchFormSubmit, searchInputChange}) => {
    return (
        <header>
            <nav>
                <div className="nav wrapper">
                    <Link to='/' className="header-logo"
                        ><img src="../images/logo.png" alt="Logo" className='logo'/>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header