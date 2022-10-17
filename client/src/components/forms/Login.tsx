import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorBox from '../ui/ErrorBox'

type Props = {}

const Login = (props: Props) => {
    const [error, setError] = React.useState('')
    const [loginSession, setLoginSession] = React.useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        setLoginSession({
            ...loginSession,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(loginSession)
        //store login session if username and password matched
        localStorage.setItem('userName', loginSession.username);
        let user = await axios.post('http://localhost:8000/login', loginSession)
        console.log(user.data)
        if (user.data.user) return navigate(`/chat?username=${user.data.user.username}`)
        else {
            setError('Incorrect password. Please try again')
        }
    };
  return (
    <form action="" method='POST' onSubmit={handleSubmit}>
                <div className='mb-6 flex flex-col gap-2'>
                    <h1 >Login</h1>
                    <span className='text-lg opacity-50'>Welcome back</span>
                </div>
                <ErrorBox message={error} />
                <label >
                    <span>Username</span>
                    <input className='p-3' type="text" onChange={handleChange} name='username' autoFocus />
                </label>
                <label >
                    <span>Password</span>
                    <input className='p-3' type="password" onChange={handleChange} name='password' />
                </label>
                <button data-type='filled' disabled={!loginSession.username || !loginSession.password}>Login</button>
                <button data-type='ghost'
                    onClick={() => navigate('/register', { replace: true })}
                >Don't have an account yet? <strong>Signup</strong></button>
            </form>
  )
}

export default Login