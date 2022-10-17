import React from 'react'

type Props = {
    content: string,
    author: string,
    date: string,
}

const Receiver = (props: Partial<Props>) => {
    return (
        <div className='flex items-start flex-col my-3 gap-1'>
            <div className='p-3 bg-slate-200 w-fit rounded-b-xl rounded-tr-xl text-slate-800 text-start max-w-[50vw]'>{props.content}</div>
            <span className='text-sm opacity-75'>{props.author} • {props.date}</span>
        </div>
    )
}

export default Receiver