import React, { useCallback, useEffect, useState } from 'react'
import { useActorsFetch } from '../hooks/useActorsFetch'
import { toast, ToastContainer, Zoom } from "react-toastify"
import defaultImage from "../assets/defaultImage.png"
import defaultPost from "../assets/defaultPoster.jpg"
import Loading from './Loading'

function MainContenuOfQuiz(props) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [actor, setActor] = useState([]);
    const [allActorInMovie, setAllActorInMovie] = useState([]);
    const [loadingRandom, setLoadingRandom] = useState(false);
    const [loading] = useActorsFetch(props.movies, setActor);
    let correctResult = false

    const actorData = actor && [actor.map(actor => {
        return {nameActor : actor.name, profilActor: actor.profile_path }
    })]

    
    const randomActorData = actorData !== undefined && actorData.map(item => item[Math.floor(Math.random() * item.length)])


    const goToNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;

        setCurrentQuestion(nextQuestion);
    
        if (nextQuestion < 20) {
          setCurrentQuestion(nextQuestion);
        } else {
          props.setShowScore(true);
        }
    }

    //this function fetch all the actors we have in the current movie 
    const fetchData = useCallback(async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}movie/${props.movies[currentQuestion].id}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
                 .then(data => data.json())
                 .then(data => {
                     setAllActorInMovie([data.cast])
                 })
 
        } catch (error) {
             console.log(error)
        }
    }, [currentQuestion, props.movies])
    useEffect(() => {
        fetchData()
    }, [fetchData])



    //This function compares the randomly selected actor with the actors in the movie and checks if the user's answer is correct
    const handleAnswerButtonClick = (isCorrect) => {
     
        allActorInMovie && allActorInMovie.map((actor) =>
            actor.map((actorItem) => {              
                if (actorItem.name === randomActorData.map(name => name.nameActor).toString()) { 
                    correctResult = true
                }
            })
        )

        if (isCorrect === true && correctResult === true) {
            props.setScore(props.score + 1)
            toast.success('Bonne réponse', {
                position: "top-right",
                autoClose: 1100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom,
            });
            correctResult = false
        } else if (isCorrect === false && correctResult === false) {
            props.setScore(props.score + 1)
            toast.success('Bonne réponse', {
                position: "top-right",
                autoClose: 1100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom,
            });
        } else {
            toast.error('Mauvaise réponse', {
                position: "top-right",
                autoClose: 1100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom,
            });
        }

        goToNextQuestion()
    };
    

    if (props.movies.length === 0 || actor.length === 0 || loading ) {
        return <Loading />
    }

    return (
        <>
            <ToastContainer />
            <div className="mainContainerBlock">
                <h1>Question {currentQuestion + 1}/{props.movies.length }</h1>
                <div className="imageBlock" >
                    <img
                        src={props.movies[currentQuestion].backdrop_path ?
                            `${process.env.REACT_APP_IMAGE_BASE_URL}${process.env.REACT_APP_POSTER_SIZE}${props.movies[currentQuestion].backdrop_path}`
                            : defaultPost}
                        alt="poster movie"
                        className="posterMovie"
                    />
                    <img
                        src={randomActorData.map(profilPath => (
                            profilPath.profilActor ? `${process.env.REACT_APP_IMAGE_BASE_URL}${process.env.REACT_APP_PROFIL_SIZE}${profilPath.profilActor}`
                                : defaultImage))}
                        alt="profil actor"
                        className="profilActor"
                    />
                </div>
                <span>Est-ce que <strong>{randomActorData.map(name=>name.nameActor)}</strong>  a joué dans <strong>{props.movies[currentQuestion].title }</strong> ?</span>
                
                <div className="buttonBlock" >
                    <button className="yesButton" onClick={() => handleAnswerButtonClick(true)} >vrai</button>
                    <button className="noButton" onClick={() => handleAnswerButtonClick(false)} >faux</button>
                </div>
            </div>
        </>
    )
}

export default MainContenuOfQuiz