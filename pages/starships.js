import React,{ useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const StarShips = () => {

    const [starShips, setStarShips] = useState([]);
    const [starShipInfo, setStarShipInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [searchInput, setSearchInput] = useState("")
    const [filteredResults, setFilteredResults] = useState([])
    

    useEffect( async () => {
        setPageLoading(true)
        await fetchStarShips()
        setPageLoading(false)
    }, [])

    useEffect(()=> {
        searchItems(searchInput)
    },[searchInput])

    async function fetchStarShips(){
        const response= await fetch(`https://www.swapi.tech/api/starships?page=${page}&limit=10`)
        const json = await response.json()
        console.log(json)
        setMaxPage(json.total_pages)
        await setStarShips(json.results)
        await setFilteredResults(json.results)
    }
    console.log(starShips)
    console.log(filteredResults)

    async function loadNextStarShips(){
        setPageLoading(true)
        setPage(page +1)
        await fetchStarShips()
        setPageLoading(false)
    }

    async function loadPreviousStarShips(){
        setPageLoading(true)
        setPage(page-1)
        await fetchStarShips()
        setPageLoading(false)
    }

    async function showTooltip(uid){
        setLoading(true)
        const response= await fetch(`https://www.swapi.tech/api/starships/${uid}`)
            .then(res => res.json())
            console.log(response)

        await setStarShipInfo(response.result.properties)
        setLoading(false)
    }

    function hideTooltip(){
        setStarShipInfo([])
        console.log("mouseleave")
    }

    function searchItems(searchValue){
        setSearchInput(searchValue)
        if (searchInput !== ''){
            const filteredData = starShips.filter((starShip) => {
                return Object.values([starShip.name, starShip.model]).join('').toLowerCase().includes(searchValue)
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(starShips)
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        setPageLoading(true)
        await searchItems(searchInput)
        console.log(filteredResults)
        setPageLoading(false)
    }
    
    return (
        <div className='character-container'>
            <div className="nav-search-container">
                <form className="nav-search" method='GET' >
                    <input 
                        className="nav-search-input" 
                        type="text" 
                        placeholder='Search Star Wars' 
                        onChange={(e) => searchItems(e.target.value)}
                        // onSubmit={(event) => handleSubmit(event)}
                    />
                </form>
                <button className="nav-search-button" id="nav-search-icon" tabIndex={-1} type="button">
                <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                </button>
            </div>
            {!pageLoading ? filteredResults.map((starShip) => (
                <div 
                    key={starShip.uid}
                    onMouseEnter={() => showTooltip(starShip.uid)}
                    onMouseLeave={() => hideTooltip()}
                    data-tip
                    data-for={starShip.uid}
                    className='character-card'
                    >
                    {starShip.name}

                    <ReactTooltip id={starShip.uid} place="right">
                        {!loading ? (
                        <div>
                            <ul>
                                <li>Name: {starShipInfo.name}</li>
                               
                            </ul>
                        </div>
                        ) : <Loading />}
                    </ReactTooltip> 
                    </div>
            )): <Loading className="page-loading"/>}
            { page > 1 ? <button onClick={() => loadPreviousStarShips()}>previous</button> : "" }
            {page == maxPage ? "" : <button onClick={() => loadNextStarShips()}>Next</button>}   
            
        </div>
    )
}

export default StarShips
