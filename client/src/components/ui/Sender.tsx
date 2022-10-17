import React from 'react'

type Props = {
    content: string,
    author: string,
    date: string,
}


const Sender = (props: Props) => {
    return (
        <div className='flex items-end flex-col my-3'>
            <div className='flex w-fit p-3 rounded-t-xl rounded-bl-xl bg-slate-600/70 text-white text-end max-w-[50vw]'>{props.content}</div>
            <span className='text-sm opacity-75'>{props.author} • {props.date}</span>
        </div>
    )
}

export default Sender