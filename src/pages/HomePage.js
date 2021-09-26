import React from 'react'
import { injectStyle } from "react-toastify/dist/inject-style";
import { toast, ToastContainer, Zoom } from 'react-toastify'

import popcorn from "../assets/pop.png"
import movieImage from "../assets/movie.png"

if (typeof window !== "undefined") {
    injectStyle();
}
  
function HomePage(props) {

    const handleInputChange = (e) => { props.setUsername(e.target.value) }
    const handleStartQuiz = () => {
        if (!props.username) {
            toast.error('Nom requis !', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom,
            });
        } else {
            props.setStart(true)
        }    
    }
    
    return (
        <>
            <ToastContainer />
            <div className="containerPage">
                <div className="homeInformations">
                    <div className="titleMessage" >
                        <img src={popcorn} alt="popcorn" className="popcornImage" />
                        <span> Bienvenue dans l'univers du cinéma </span>
                        <img src={movieImage} alt="popcorn" className="movieImage"  />
                    </div>
                    <div className="enterInformation" >
                        <input
                            name="username"
                            id="username"
                            placeholder="Entrez votre nom"
                            value={props.username}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <button onClick={()=>handleStartQuiz()}>Commencez le quiz</button>
                    </div> 
                </div>
            </div>
           
        </>
    )
}

export default HomePage;