import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

const ConnectByEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isVerifySent, setIsVerifySent] = useState(false);
    const [message, setMessage] = useState('');
    const [code, setCode] = useState('');
    const [sendCodeTwice, setSendCodeTwice] = useState(false)

    const sendVerifyCode = async (e)=>{
        e.preventDefault();
        await axios.post('/api/v1/users/loginByEmail',{email}).then(res=>{
            setIsVerifySent(true);
            setMessage(res.data)
        })
        .catch((err)=>setMessage(err.response.data));
    }
    const verifyCode = async (e)=>{
        e.preventDefault();
        await axios.post('/api/v1/users/verifyEnteryCode', {email, code}).then(res=>{
            setMessage('');
            navigate('/chat');
        }).catch(err=>{setMessage(err.response.data.message)
            console.log("err",message);
        });
    }
    const SendVerifyCodeAgain=()=>{
        setMessage('');
        setCode('');
        setIsVerifySent(false);
        if(sendCodeTwice){
            sendVerifyCode();
        }
        setSendCodeTwice(false);
    }
  return (
    <div>
            <form onSubmit={sendVerifyCode}>
                <label htmlFor="email">Your email address: </label>
                <input type="text" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <button>Send a verify code</button>
                <div>{message=="Verification code sent to your email" ? 
                    (<p style={{color:'green'}}>{message}</p>):
                    (<p style={{color:'red'}}>{message}</p>)
                }
                </div>
            </form>
            {isVerifySent ? (
            <div>
                 <div>
                   <form onSubmit={verifyCode}>
                        <label htmlFor="">Enter the verify code: </label>
                        <input type="text" value={code} onChange={(e)=>setCode(e.target.value)}/>
                        <button>Submit</button>
                    </form>
                </div>
                <div>{message}</div>
                {message==="Verification code has expired"? (
                    <>
                      <button onClick={()=>{
                        setSendCodeTwice(!sendCodeTwice)
                        SendVerifyCodeAgain();
                        }}>
                        send another code
                      </button>
                      {sendCodeTwice&&(
                        <div>
                            <form onSubmit={verifyCode}>
                                <label htmlFor="">Enter the verify code: </label>
                                <input type="text" value={code} onChange={(e)=>setCode(e.target.value)}/>
                                <button>Submit</button>
                            </form>
                        </div>)}
                    </>
                )
                :('')}
            </div>

        ): ('')}
    </div>
   
  )
}
export default ConnectByEmail