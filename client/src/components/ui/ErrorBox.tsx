import React from 'react'

type Props = {
    message: string
}

const ErrorBox = (props: Partial<Props>) => {
    return (
        <React.Fragment>
            {
                props.message &&
                <div className='py-3 px-6 text-rose-600 bg-pink-100 rounded-lg mx-auto w-fit'>{props.message}</div>
            }
        </React.Fragment>
    )
}

export default ErrorBox