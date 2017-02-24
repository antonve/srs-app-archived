import React from 'react'
import UserLoginFormContainer from '../components/login'

function UserLogin() {
  return (
    <div className="card small-12">
      <div className="card-divider grid-block">
        <div className="small-12">Log in</div>
      </div>
      <div className="card-section">
        <UserLoginFormContainer />
      </div>
    </div>
  )
}


export default UserLogin;
