import React,{useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router';
import './signUpPage.css';
import { useNavigate } from'react-router';
import signupIcon from '../../assets/Images/signupIcon.png';

const SignUpPage = () => {
    const [user, setUser] = useState({userName: '', password: '',email: '',isFemale: false});
    const [errMsg, setErrMsg] = useState('');

    const signUp=async(e)=>{
      e.preventDefault();
      await axios.post('/api/v1/users/signup',user).then(res=>{
        console.log(res.data);
        setUser(res.data);
        navigate('/chat');
      }).catch(err=>
        setErrMsg(err.response.data));
    }
  return (
    
    <div>
      <div className='signUp'>
        <img src={signupIcon} alt="" className='signupIcon'/>
        {/* להמשיך.. */}
        <form onSubmit={signUp}>
          <div>
            <label htmlFor='userName'>Enter your Username:</label>
            <br />
            <input type="text" className="inputText" placeholder="Username" value={user.userName} onChange={(e)=>setUser({...user,userName: e.target.value})}/>
          </div>
          <br />
          <div>
            <label htmlFor="password">Enter your password:</label>
            <br/>
            <input type="password" className="inputText" placeholder="Password" onChange={(e)=>setUser({...user,password:e.target.value})}/>
          </div>
          <br />
          <div>
            <label htmlFor="email">Enter your Email:</label>
            <br/>
            <input type="text" className="inputText" placeholder="Your Email Address" value={user.email} onChange={(e)=>setUser({...user,email: e.target.value})}/>
          </div>
          <div>
            <label htmlFor="isFemale"></label>
            <input type="checkbox" name='isFemale' value={user.isFemale} onChange={(e)=>setUser({...user,isFemale: e.target.value==="Female"? true:false})}/>
          </div>
          <br />
            <button className='btnSign'>Sign up</button>
        </form>
        {errMsg ? (errMsg==="error"? 
          <p style={{color:'red'}}>somthing get wrong, please try again</p> :
           <p style={{color:'red'}}>{errMsg}</p>) 
            : ('')}
        <p>Already have an account? <Link to="/">Login here</Link></p>
      </div>

    </div>
  )
}

export default SignUpPage