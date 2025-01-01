import React from 'react'

const VerifyCode = ({verifyCode,code,set}) => {
  return (
    <div>
         <form onSubmit={verifyCode}>
            <label htmlFor="">Enter the verify code: </label>
            <input type="text" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default VerifyCode