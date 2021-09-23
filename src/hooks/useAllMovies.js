import {useState, useEffect, useCallback} from 'react';


export const useMovieFetch = () => {
    const [state, setState] = useState ({movies: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    console.log(process.env.REACT_APP_API_URL)

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);
        try {
            const resultUrl = `${process.env.REACT_APP_API_URL}discover/movie?api_key=${process.env.REACT_APP_API_KEY}`

            const resultData = await (await fetch(resultUrl)).json()
            setState({movies: [...resultData.results]})
        
          } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(()=>{
        fetchData();
    },[fetchData])

    return [state, loading, error];
}