import React from 'react'
import UserRegisterFormContainer from '../components/register'

function UserRegister() {
  return (
    <div className="card small-12">
      <div className="card-divider grid-block">
        <div className="small-3">Register</div>
      </div>
      <div className="card-section">
        <UserRegisterFormContainer/>
      </div>
    </div>
  )
}


export default UserRegister
