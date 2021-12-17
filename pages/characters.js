import React,{ useState, useEffect} from 'react'

const Characters = () => {

    const [characters, setCharacters] = useState([]);
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

    function showTooltip(event){
        setLoading(true);
        console.log(event.target)

    }


    console.log(characters)
    return (
        <div>
            {characters.map((character) => (
                <div 
                    key={character.uid}
                    onMouseOver={showTooltip}
                    >
                    {character.name}
                    </div>
            ))}
        </div>
    )
}

export default Characters
