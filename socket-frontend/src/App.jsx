import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

function App() {
  const [chat, setChat] = useState([])
  const socket = io('http://localhost:5000', { autoConect: false })
  const sendChat = (e) => {
    e.preventDefault()
    const message = e.target[0].value
    socket.emit('chat', message)
    e.target[0].value = ''
  }

  useEffect(() => {
    socket.on('chat', (msg) => {
      console.log(msg)
      setChat([...chat, msg])
    })
  })
  return (
    <div className='App'>
      {/* {!usernameAlreadySelected && <UsernameForm />} */}
      <>
        <h2> chat example </h2>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
        <form onSubmit={sendChat}>
          <input type='text' name='chat' placeholder='Type some message here' />
          <button type='submit' name='sendbtn'>
            Send
          </button>
        </form>
      </>
    </div>
  )
}

export default App
