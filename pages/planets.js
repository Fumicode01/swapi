import React from 'react'

const planets = () => {

    const [planets, setPlanets] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);

    useEffect( async () => {
        setPageLoading(true)
        async function fetchPlanets(){
            const response= await fetch(`https://www.swapi.tech/api/people?page=1&limit=100`)
            const json = await response.json()
            await setPlanets(json.results)
        }
        await fetchPlanets()
        setPageLoading(false)
    }, [])
    return (
        <div>
            Planets
        </div>
    )
}

export default planets
