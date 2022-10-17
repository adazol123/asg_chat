import React from 'react'
import FormRegister from './forms/Register'

type Props = {}

const RegistrationPanel = (props: Props) => {
    return (
        <div className='grid place-items-center min-h-screen'>
            <FormRegister />
        </div>
    )
}

export default RegistrationPanel