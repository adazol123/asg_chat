import React from 'react'
import Receiver from './ui/Receiver'
import Sender from './ui/Sender'
import { io, Socket } from "socket.io-client";
import axios from 'axios';
import { useLocation, useNavigate, useParams, useRoutes, useSearchParams } from 'react-router-dom'
import GettingStarted from './GettingStarted';
import AsideContact from './ui/AsideContact';
import ConversationHeader from './ui/ConversationHeader';
const socket: Socket = io('ws://localhost:8000', {
    transports: ['websocket', 'polling']
});

type Props = {}

type Convo = {
    name: string,
    message: string,
    timestamp: Date
}

type Conversation = {
    conversations: Convo[]
}

const Conversation = (props: Conversation) => {
    return (
        <React.Fragment>
            {
                props.conversations.map((convo, index) => (
                    <div key={index}>
                        {
                            convo.name === localStorage.getItem('userName') as string ?
                                <Sender author={convo.name} content={convo.message} date={convo.timestamp.getHours().toString()} /> :
                                <Receiver author={convo.name} content={convo.message} date={convo.timestamp.getHours().toString()} />
                        }

                    </div>
                ))
            }
        </React.Fragment>
    )
}

const ChatWindow = (props: Props) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    if (!searchParams.get('username')) {
        navigate('/', { replace: true })
        return <GettingStarted />

    }
    const [chat, setChat] = React.useState<Convo>({
        name: searchParams.get('username') as string,
        message: '',
        timestamp: new Date(Date.now())
    })

    const [logs, setLogs] = React.useState<Convo[]>([])

    React.useEffect(() => {
        socket.on('message', ({ name, message }) => {
            setLogs([
                ...logs,
                { name, message, timestamp: new Date(Date.now()) }
            ])

        })
    })


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChat({ ...chat, message: event.target.value })
    }

    const onSendSubmit = async (event: React.MouseEvent) => {
        event.preventDefault()
        socket.emit('message', chat)
        await axios.post('http://localhost:8000/conversations', chat)
        setChat({ ...chat, message: '' })
    }

    const handleLogout = async () => {
        await axios.get('http://localhost:8000/logout')
        navigate('/', { replace: true })
    }


    return (
        <div className='flex overflow-hidden h-screen'>
            <AsideContact />
            <div className=' min-w-[calc(100%-280px)] bg-slate-100 flex flex-col'>
                <ConversationHeader user={searchParams.get('username')} handleLogout={handleLogout} />
                <div className='bg-slate-50 relative flex-grow p-2 max-h-full overflow-y-auto'>
                    <Conversation conversations={logs} />
                </div>
                <div className='flex p-3'>
                    <input className='p-2 w-full mr-3' placeholder='Type your message...' type="text" aria-controls='x' value={chat.message} onChange={handleChange} />
                    <button disabled={!chat.message} data-type='filled' onClick={onSendSubmit}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow