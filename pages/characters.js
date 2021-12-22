import React,{ useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [characterInfo, setCharacterInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [searchInput, setSearchInput] = useState("")
    const [filteredResults, setFilteredResults] = useState([])
    

    useEffect( async () => {
        setPageLoading(true)
        await fetchCharacters()
        setPageLoading(false)
    }, [])

    async function fetchCharacters(){
        const response= await fetch(`https://www.swapi.tech/api/people?page=${page}&limit=10`)
        const json = await response.json()
        console.log(json)
        setMaxPage(json.total_pages)
        await setCharacters(json.results)
        await setFilteredResults(json.results)
    }
    console.log(characters)
    console.log(filteredResults)

    async function loadNextCharacters(){
        setPageLoading(true)
        setPage(page +1)
        await fetchCharacters()
        setPageLoading(false)
    }

    async function loadPreviousCharacters(){
        setPageLoading(true)
        setPage(page-1)
        await fetchCharacters()
        setPageLoading(false)
    }

    async function showTooltip(uid){
        setLoading(true)
        const response= await fetch(`https://www.swapi.tech/api/people/${uid}`)
            .then(res => res.json())
            console.log(response)

        await setCharacterInfo(response.result.properties)
        setLoading(false)
    }

    function hideTooltip(){
        setCharacterInfo([])
        console.log("mouseleave")
    }

    async function searchItems(){
        // setSearchInput(searchValue)
        // console.log(searchValue)
        if (searchInput !== ''){
            const filteredDatas = await fetch(`https://www.swapi.tech/api/people/?name=${searchInput}`)
            .then(res => res.json())
            console.log(filteredDatas)
            const filteredData = filteredDatas.result.map(data => {
                let uid = data.uid
                let name = data.properties.name
                let sortedData = {
                    uid:uid,
                    name:name
                }
                return sortedData
            })
            console.log(filteredData)
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(characters)
        }
    }

    function handleChange(searchValue){
        setSearchInput(searchValue)
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
            <div className="search-container">
                <form className="search" method='GET' onSubmit={(event) => handleSubmit(event) }>
                    <input 
                        className="search-input" 
                        type="text" 
                        placeholder='Search Star Wars' 
                        onChange={(e) => handleChange(e.target.value)}
                        // onSubmit={(event) => handleSubmit(event)}
                    />
                </form>
                <button className="search-button" id="search-icon" tabIndex={-1} type="button">
                <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                </button>
            </div>
            {!pageLoading ? filteredResults.map((character) => (
                <div 
                    key={character.uid}
                    onMouseEnter={() => showTooltip(character.uid)}
                    onMouseLeave={() => hideTooltip()}
                    data-tip
                    data-for={character.uid}
                    className='character-card'
                    >
                    {character.name}

                    <ReactTooltip id={character.uid} place="right">
                        {!loading ? (
                        <div>
                            <ul>
                                <li>Name: {characterInfo.name}</li>
                                <li>Height: {characterInfo.height}</li>
                                <li>Birth: {characterInfo.birth_year}</li>
                                <li>Gender: {characterInfo.gender}</li>
                                <li>Hair Color: {characterInfo.hair_color}</li>
                                <li>Skin Color: {characterInfo.skin_color}</li>
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

export default Characters
