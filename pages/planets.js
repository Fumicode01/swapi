import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Planets = () => {

    const [planets, setPlanets] = useState([]);
    const [planetInfo, setPlanetInfo] = useState([])
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [searchInput, setSearchInput] = useState("")
    const [filteredResults, setFilteredResults] = useState([])

    useEffect( async () => {
        setPageLoading(true)
        await fetchPlanets()
        setPageLoading(false)
    }, [])

    useEffect(()=> {
        searchItems(searchInput)
    },[searchInput])

    async function fetchPlanets(){
        const response= await fetch(`https://www.swapi.tech/api/planets?page=${page}&limit=10`)
        const json = await response.json()
        setMaxPage(json.total_pages)
        await setPlanets(json.results)
        await setFilteredResults(json.results)
    }

    async function loadNextPlanets(){
        setPageLoading(true)
        setPage(page +1)
        await fetchPlanets()
        setPageLoading(false)
    }

    async function loadPreviousPlanets(){
        setPageLoading(true)
        setPage(page-1)
        await fetchPlanets()
        setPageLoading(false)
    }

    async function showTooltip(uid){
        setLoading(true)
        const response= await fetch(`https://www.swapi.tech/api/planets/${uid}`)
            .then(res => res.json())
            console.log(response)

        await setPlanetInfo(response.result.properties)
        setLoading(false)
    }
    console.log(planetInfo)

    function hideTooltip(){
        setPlanetInfo([])
        console.log("mouseleave")
    }

    function searchItems(searchValue){
        setSearchInput(searchValue)
        if (searchInput !== ''){
            const filteredData = planets.filter((planet) => {
                return Object.values([planet.name]).join('').toLowerCase().includes(searchValue)
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(planets)
        }
    }

    return (
        <div className='character-container'>
            <div className="nav-search-container">
                <form className="nav-search" method='GET'>
                    <input 
                        className="nav-search-input" 
                        type="text" 
                        placeholder='Search Star Wars' 
                        onChange={(e) => searchItems(e.target.value)}
                    />
                </form>
                <button className="nav-search-button" id="nav-search-icon" tabIndex={-1} type="button">
                <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                </button>
            </div>
            {!pageLoading ? filteredResults.map((planet) => (
                <div 
                    key={planet.uid}
                    onMouseEnter={() => showTooltip(planet.uid)}
                    onMouseLeave={() => hideTooltip()}
                    data-tip
                    data-for={planet.uid}
                    className='planet-card'
                    >
                    {planet.name}

                    <ReactTooltip id={planet.uid} place="right">
                        {!loading ? (
                        <div>
                            <ul>
                                <li>Name: {planetInfo.name}</li>
                                
                            </ul>
                        </div>
                        ) : <Loading />}
                    </ReactTooltip> 
                    </div>
            )): <Loading className="page-loading"/>}
            { page > 1 ? <button onClick={() => loadPreviousCharacters()}>previous</button> : "" }
            {page == maxPage ? "" : <button onClick={() => loadNextCharacters()}>Next</button>}   
            
        </div>
    )
}

export default Planets
