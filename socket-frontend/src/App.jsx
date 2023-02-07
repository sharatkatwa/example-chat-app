import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import SetUsername from './Components/SetUsername'

function App() {
  const [chat, setChat] = useState([])
  const [username, setUsername] = useState('')
  const socket = io('http://localhost:5000', { autoConect: false })
  const [usernameEntered, setUsernameEntered] = useState(false)

  const setName = (e) => {
    e.preventDefault()
    setUsername(`${e.target[0].value}`)
    e.target[0].value = ''
    setUsernameEntered(true)
  }

  const sendChat = (e) => {
    e.preventDefault()
    const message = e.target[0].value
    const name = username ? username : 'unknown'
    if (message) {
      socket.emit('chat', { message, username: name })
      e.target[0].value = ''
    }
  }

  useEffect(() => {
    socket.on('chat', (msgData) => {
      setChat([...chat, msgData])
    })
  })

  const chatPage = (
    <>
      <h2> chat here </h2>
      {chat.map((msgData, index) => (
        <div className='msgDiv' key={index}>
          <p>
            {msgData.message} <sub>{`by:${msgData.username}`}</sub>
          </p>
        </div>
      ))}
      <form onSubmit={sendChat}>
        <input
          type='text'
          name='chat'
          placeholder='Type some message here'
          className='textInput'
        />
        <button type='submit' name='sendbtn' className='btn'>
          Send
        </button>
      </form>
    </>
  )
  return (
    <div className='App'>
      {!usernameEntered && <SetUsername setName={setName} />}
      {usernameEntered && chatPage}
    </div>
  )
}

export default App
