import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GettingStarted from './components/GettingStarted'
import ChatWindow from './components/ChatWindow'
import { io, Socket } from "socket.io-client";
import { Route, Routes } from 'react-router-dom'
import RegistrationPanel from './components/RegistrationPanel'
import axios from 'axios'

// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;

// }

// interface ClientToServerEvents {
//   hello: () => void;
// }

const socket: Socket = io('ws://localhost:8000', {
  transports: ['websocket', 'polling']
});

function App() {
  socket.on('connect_error', () => {
    socket.io.opts.transports = ['polling', 'websocket']
  })

  socket.on('connect', () => {
    console.log(socket.id)
  })

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/user'
    }).then(res => console.log(res.data))
  }, [])
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<GettingStarted />} />
        <Route path='/chat' element={<ChatWindow />} />
        <Route path='/register' element={<RegistrationPanel />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
