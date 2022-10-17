import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ErrorBox from '../ui/ErrorBox'
type Props = {}

const FormRegister = (props: Props) => {

    const [error, setError] = React.useState('')
    const [details, setDetails] = React.useState({
        username: '',
        displayName: '',
        password: '',
        confirm_password: ''
    });
    const navigate = useNavigate()

    const handleCreateAccount = async (event: React.FormEvent) => {
        event.preventDefault();
        if (details.username && details.displayName && details.password) {
            if (details.password !== details.confirm_password) return setError('Password not match!')
            else {
                try {
                    await axios.post('http://localhost:8000/register',
                        details

                    )
                    setDetails({
                        username: '',
                        displayName: '',
                        password: '',
                        confirm_password: ''
                    })
                    navigate('/login', { replace: true })
                } catch (error: any) {
                    setError(error.message)
                }
            }
        }
        else {
            setError('Missing required field')
        }
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        setDetails({
            ...details,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form onSubmit={handleCreateAccount}>
            <h1 className='mb-6'>Register</h1>
            <ErrorBox message={error} />
            <div className='flex flex-col gap-3 p-3'>
                <label>
                    <span>Username</span>
                    <input type={'text'} name="username" onChange={handleOnChange} value={details.username} />
                </label>
                <label>
                    <span>Display Name</span>
                    <input type={'text'} name="displayName" onChange={handleOnChange} value={details.displayName} />
                </label>
            </div>
            <div className='flex flex-col gap-3 p-3 border border-dashed rounded-lg'>

                <label>
                    <span>Password</span>
                    <input type="password" name="password" onChange={handleOnChange} value={details.password} />
                </label>
                <label>
                    <span>Confirm Password</span>
                    <input type="password" name="confirm_password" onChange={handleOnChange} value={details.confirm_password} />
                </label>
            </div>
            <button disabled={!details.password || !details.displayName || !details.username} data-type='filled'>Create an account</button>
            <button type='button' data-type='ghost'
                onClick={() => navigate('/', { replace: true })}
            >Already have an account? <strong>Login</strong></button>
        </form>
    )
}

export default FormRegister