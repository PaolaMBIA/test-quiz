import React from 'react'


function HomePage(props) {

    const handleInputChange = (e) => { props.setUsername(e.target.value) }
    const handleStartQuiz = () => {props.setStart(true)}
    
    return (
        <div className="containerPage">
            <input
                name="username"
                id="username"
                placeholder="Entrez votre nom"
                value={props.username}
                onChange={(e)=>handleInputChange(e)}
            />
            <button onClick={()=>handleStartQuiz()}>Commencer</button>
        </div>
    )
}

export default HomePage;