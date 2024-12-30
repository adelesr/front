import React from 'react'
import axios from 'axios';
const ConnectByEmail = () => {
    const [email, setEmail] = useState('');
    const [isVerifySent, setIsVerifySent] = useState(false)
    const [message, setMessage] = useState('');
    const [code, setCode] = useState('');
    const [SendCodeTwice, setSendCodeTwice] = useState(false)

    const sendVerifyCode = async (e)=>{
        e.preventDefault();
        await axios.post('/api/v1/users/loginByEmail',{email}).then(res=>{
            setIsVerifySent(true)
            setMessage(res.data.message)
        })
        .catch(err=>setErrMsg(err.response.data.message));
    }
    const verifyCode = async (e)=>{
        await axios.post('/api/v1/users/verifyEnteryCode', {email, code}).then(res=>{

        }).catch(err=>setErrMsg(err.response.data.message));
    }
  return (
    <div>
        {!isVerifySent ? (
            <form onSubmit={sendVerifyCode}>
                <label htmlFor="phoneNumber">Phone number: </label>
                <input type="text" name='phoneNumber' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                <button>Send a verify code</button>
                <div>{message}</div>
            </form>
            
        ):(
            <div>
                <form onSubmit={verifyCode}>
                    <label htmlFor="">Enter the verify code: </label>
                    <input type="text" value={code} onChange={(e)=>setCode(e.target.value)}/>
                    <button>Submit</button>
                </form>
            <div>
                <span>{message}</span>
                 {message==="Verification code has expired"? (
                 <button onClick={setSendCodeTwice(!SendCodeTwice)}>send another code</button>
                 {SendCodeTwice}
             ):''}
            </div>
           </div>
        )
        }
       
   
</div>
  )
}

export default ConnectByEmail