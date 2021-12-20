import React,{ useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip';
import Loading from '../components/Loading';

const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [characterInfo, setCharacterInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();

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
    }

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
    return (
        <div className='character-container'>
            {!pageLoading ? characters.map((character) => (
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
