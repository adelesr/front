import React from 'react'

const EmptyChatBox = () => {
  
    return (
    <div className='chatbox emptyChatMessage'>
        <header>
        </header>
        <section>
            <main>
                <div>
                    <img className='emptyChatImage' src='../src/assets/Images/chat_Images/empty chat.png'></img>
                    <h2>No chat has been selected</h2>
                    <div>choose a chat for start talking</div>
                </div>
            </main>
        </section>
    </div>
  )
}

export default EmptyChatBox