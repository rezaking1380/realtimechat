import React from 'react'

function Avatar({user}) {
    console.log(user)
  return (
    <div className='w-12 h-12 relative'>
        <img className='w-full h-full object-cover' src={user.avatarUrl} alt={user.name} />
        {user.status === "online" && (
        <div className='absolute bg-green-600 w-3 h-3 border bottom-0 right-0 rounded-full'>
        </div>
        )}
    </div>
  )
}

export default Avatar