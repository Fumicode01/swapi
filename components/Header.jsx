import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export const Header = () => {
    return (
        <header>
            <div className="nav-container">
                <div className="nav-wrapper">
                    <div className="logo-container">

                    </div>
                    <div className="nav-search-container">
                        <form className="nav-search" method='GET'>
                            <input className="nav-search-input" type="text" placeholder='Search Star Wars' />
                        </form>
                        <button className="nav-search-button" id="nav-search-icon" tabIndex={-1}>
                        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
