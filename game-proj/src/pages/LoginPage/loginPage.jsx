import React,{useEffect,useState} from 'react'
import {Link, useNavigate} from 'react-router'
import ConnectByEmail from '../../components/ConnectByEmail/ConnectByEmail.jsx';
import axios from 'axios';
import './LoginPage.css';
const LoginPage = () => {
    const [errMsg, setErrMsg] = useState('')
    const [user, setUser] = useState({userName: '', password: ''})
    const [connectByEmail, setConnectByEmail] = useState(false)
    const navigate = useNavigate();

    const login=async(e)=>{
        e.preventDefault();
            await axios.post('/api/v1/users/login',user,{withCredentials: true}).then(res=>{
                setUser(res.data);
                console.log(res.data);
                navigate('/chat')
            }).catch(err=>{setErrMsg(err.response.data)
                console.log(err.response.data|| "not be found");
            });  
    }

    const connectByEmailHandler = () => {
        setConnectByEmail(!connectByEmail)

    }
  return (
    <div className='mainScreen'>
        <div  className='formContent'>
            <form onSubmit={login}>
                <h2 >Login</h2>
                <input type="text" placeholder="Username" value={user.userName} onChange={(e)=>setUser({...user, userName: e.target.value})} />
                <br/>
                <br/>
                <input type="password" placeholder="Password" value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})}/>
                <br />
                <br />
                <button className='btnLogin'>Login</button>
                {errMsg? <p style={{color:'red'}}>{errMsg}</p>:''}
            </form>
            <p>Don't have an account? <Link to="/signUp">Sign up here</Link></p>
        </div>
        <div className='margineCenter'>
             <button className='connectByEmailBtn' onClick={connectByEmailHandler} >Want to connect with Email?</button> 
                {connectByEmail? (
                    <ConnectByEmail/>
                ): null }
        </div>
    </div>
  )
}

export default LoginPage