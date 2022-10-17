import React from 'react'

type Props = {
    handleLogout: () => void,
    user: string | null
}

const ConversationHeader = (props: Props) => {
    return (
        <nav className='flex justify-between py-2 shadow-xl'>
            <div className='p-3'>Conversations</div>
            <div className='flex gap-3 items-center'>
                <span className='px-3 py-2 bg-slate-500/20 text-slate-800 rounded-full'>{props.user}</span>
                <button className='bg-slate-600 text-white'
                    onClick={props.handleLogout}
                >Logout</button>
            </div>
        </nav>
    )
}

export default ConversationHeader