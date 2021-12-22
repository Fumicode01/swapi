import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export const Header = () => {

    const [searchInput, setSearchInput] = useState("")

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
    }
    console.log(searchInput)

    return (
        <header>
            <div className="nav-container">
                <div className="nav-wrapper">

                    <div className="link-container">
                        <Link href="/"><a>Home</a></Link>
                        <Link href="/characters"><a>Characters</a></Link>
                        <Link href="/planets"><a>Planets</a></Link>
                    </div>

                    <div className="logo-container">
                        <img src="./starwars-logo.png" alt="starwars-logo" className="logo"/>
                    </div>

                    <div className="nav-search-container">
                        {/* <form className="nav-search" method='GET'>
                            <input 
                                className="nav-search-input" 
                                type="text" 
                                placeholder='Search Star Wars' 
                                onChange={(e) => searchItems(e.target.value)}
                            />
                        </form>
                        <button className="nav-search-button" id="nav-search-icon" tabIndex={-1}>
                        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                        </button> */}
                    </div>
                </div>
            </div>
        </header>
    )
}
