import { Link } from "react-router-dom"

const Header = ({searchFormSubmit, searchInputChange}) => {
    return (
        <header>
            <nav>
                <div className="nav wrapper">
                <h3><Link to='/'>WATCHABL</Link></h3>
                </div>
            </nav>
        </header>
    )
}

export default Header