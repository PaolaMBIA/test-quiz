import React, { useState } from 'react'
import { useActorsFetch } from '../hooks/useActorsFetch'
import { toast, ToastContainer, Zoom } from "react-toastify"
import defaultImage from "../assets/defaultImage.png"
import defaultPost from "../assets/defaultPoster.jpg"

function MainContenuOfQuiz(props) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [actor, setActor] = useState([]);
    const [allActorInMovie, setAllActorInMovie] = useState([]);
    const [correctResult, setCorrectResult] = useState(false)
    const [loading, error] = useActorsFetch(props.movies, setActor);

    const actorData = actor && [actor.map(actor => {
        return {nameActor : actor.name, profilActor: actor.profile_path }
    })]

    const randomActorData = actorData && actorData.map(item => item[Math.floor(Math.random() * item.length)])

    const goToNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;

        setCurrentQuestion(nextQuestion);
    
        if (nextQuestion < 20) {
          setCurrentQuestion(nextQuestion);
        } else {
          props.setShowScore(true);
        }
    }

    //This function compares the randomly selected actor with the actors in the movie and checks if the user's answer is correct

    const handleAnswerButtonClick = async (isCorrect) => {
        goToNextQuestion()
        try {
           await fetch(`https://api.themoviedb.org/3/movie/${props.allMovies[currentQuestion].id}/credits?api_key=932abb19676c822ea035ea1f7b3c7d6b`)
                .then(data => data.json())
                .then(data => {
                    setAllActorInMovie([data.cast])
                })

        } catch (error) {
            console.log(error.message)
        }

        allActorInMovie && allActorInMovie.map((actor) =>
            actor.map((actorItem) => {
                if (actorItem.name === randomActorData.toString()) {
                   return setCorrectResult(true)
                } else {
                   return setCorrectResult(false)
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
            setCorrectResult(false)
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
    };
    

    if (props.movies.length === 0 || actor.length === 0) {
        return <div>load</div>
    }

    console.log(props.movies)

    return (
        <>
            <ToastContainer />
            <div className="mainContainerBlock">
                <h1>Question {currentQuestion + 1}/{props.movies.length }</h1>
                <div className="imageBlock" >
                    <img
                        src={props.movies[currentQuestion].backdrop_path ?
                            `http://image.tmdb.org/t/p/w780${props.movies[currentQuestion].backdrop_path}`
                            : defaultPost}
                        alt="poster movie"
                        className="posterMovie"
                    />
                    <img
                        src={randomActorData.map(profilPath => (
                            profilPath.profilActor ? `http://image.tmdb.org/t/p/w185${profilPath.profilActor}`
                                : defaultImage))}
                        alt="profil actor"
                        className="profilActor"
                        width="140px"
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