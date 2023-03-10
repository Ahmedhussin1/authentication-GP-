import pb from './lib/pocketbase'
import React from 'react'

function Auth() {
  return (
    <div>
        <h1>is Logged {pb.authStore.isValid.toString()}</h1>
    </div>
  )
}

export default Auth