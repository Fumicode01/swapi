import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading';


const planets = () => {

    const [loading, setLoading] = useState(true);
    const [planets, setPlanets] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();

    useEffect( async () => {
        setLoading(true)
        await fetchPlanets()
        setLoading(false)
    }, [])

    async function fetchPlanets(){
        const response= await fetch(`https://www.swapi.tech/api/planets?page=${page}&limit=10`)
        const json = await response.json()
        await setPlanets(json.results)
        setMaxPage(json.total_pages)
        console.log(json)
    }

    async function loadNextPlanets(){
        setLoading(true)
        setPage(page +1)
        await fetchPlanets()
        setLoading(false)
    }

    async function loadPreviousPlanets(){
        setLoading(true)
        setPage(page-1)
        await fetchPlanets()
        setLoading(false)
    }

    return (
        <div>
            <div>
                {!loading ? planets.map((planet, i) => 
                    <div key={i}>{planet.name}</div>
                ) : <Loading className="page-loading" />}
            </div>
            { page > 1 ? <button onClick={() => loadPreviousPlanets()}>previous</button> : "" }
            

            {page == maxPage ? "" : <button onClick={() => loadNextPlanets()}>Next</button>}
        </div>
        

    )
}

export default planets
