import {useState, useEffect, useCallback} from 'react';


export const useActorsFetch = (allMovies, setActor) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            await allMovies.map(await ((movie)  => (
                fetch(`${process.env.REACT_APP_API_URL}movie/${movie.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
                .then(data => data.json())
                .then(data => {
                    setActor(actor=>[ ...actor, ...data.cast])      
                })
            )))
        }catch (error){
            setError(error)
        }

        setLoading(false)
    }, [ allMovies, setActor])

    useEffect(() => {
        fetchData()

    }, [fetchData])


    return [ loading, error];
}