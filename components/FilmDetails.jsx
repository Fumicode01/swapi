import React, { useEffect, useState} from 'react'

const FilmDetails = (props) => {
    const [loading, setLoading] = useState(false)
    const [characters, setCharacters] = useState([])

    useEffect(async ()=>{
        setLoading(true)
        await setCharacters(props.characters)

    },[])

    async function getCharacterName(url){
        const response= await fetch(url)
        const json = await response.json()
        return json.result.properties.name
    }


    

    return (
        <div>
            {/* {props.characters.map((character, i)=>{
                // <div key={i}>{getCharacterName(character)}</div>
                <div>{character}</div>
            })} */}
            
        </div>
    )
}

export default FilmDetails
