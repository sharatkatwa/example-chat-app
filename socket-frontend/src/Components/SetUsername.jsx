import React from 'react'

const SetUsername = ({ setName }) => {
  // let name
  // const setName = (e) => {
  //   e.preventDefault()
  //   name = e.target[0].value
  // }
  return (
    <div>
      <h3>Enter you name</h3>
      <form onSubmit={setName}>
        <input
          type='text'
          name='chat'
          placeholder='Enter your name here'
          className='textInput'
        />
        <button type='submit' name='sendbtn' className='btn'>
          save
        </button>
      </form>
    </div>
  )
}

export default SetUsername
