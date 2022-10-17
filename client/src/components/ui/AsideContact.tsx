import React from 'react'

type Props = {}

const AsideContact = (props: Props) => {
    return (
        <aside className='min-w-[260px] bg-slate-700 text-white min-h-[40vh]  p-4'>
            <h3>Contacts</h3>
            <div className='flex flex-col gap-3 my-6 items-start'>
                <ul className='flex flex-col gap-1 w-full'>
                    <li className='py-2 flex gap-2 items-center bg-slate-500/20 w-full rounded-lg overflow-hidden p-3'>
                        <div className='p-3 min-w-[6ch] bg-slate-600 rounded-full flex items-center justify-center flex-1 '>
                            <span>J</span>
                        </div>
                        <span className='w-full block'>Joanna</span>
                    </li>
                    <li className='py-2 flex gap-2 items-center bg-slate-500/20 w-full rounded-lg overflow-hidden p-3'>
                        <div className='p-3 min-w-[6ch] bg-slate-600 rounded-full flex items-center justify-center flex-1 '>
                            <span>M</span>
                        </div>
                        <span className='w-full block'>Michael</span>
                    </li>
                </ul>
            </div>
            <button disabled className='text-slate-100 bg-transparent border border-slate-500/50 hover:bg-slate-100/20' >Add Contact</button>
        </aside>
    )
}

export default AsideContact