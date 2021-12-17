import React,{ useState, useEffect} from 'react'

const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [characterInfo, setCharacterInfo] = useState([])
    const [lodading, setLoading] = useState(false);
    const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        async function fetchCharacters(){
            const response= await fetch(`https://www.swapi.tech/api/people?page=1&limit=100`)
            const json = await response.json()
            setCharacters(json.results)
        }
        fetchCharacters()
    }, [])

    async function showTooltip(uid){
        console.log("mouseon")
        setLoading(true);
        console.log(uid)
        const response= await fetch(`https://www.swapi.tech/api/people/${uid}`)
            .then(res => res.json())
            console.log(response)

        await setCharacterInfo(response.result)
        setIsShown(true)
    }

    function hideTooltip(){
        setIsShown(false)
        setCharacterInfo([])
        console.log("mouseleave")
    }
    console.log(characterInfo)
    return (
        <div>
            {characters.map((character) => (
                <div 
                    key={character.uid}
                    onMouseEnter={() => showTooltip(character.uid)}
                    onMouseLeave={() => hideTooltip()}
                    data={character}
                    >
                    {character.name}
                    </div>
            ))}
        </div>
    )
}

export default Characters
