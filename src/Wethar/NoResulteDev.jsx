import React from 'react'

const NoResulteDev = () => {
  return (
    <div className='no-results'>
      <img src='icons/no-result.svg' alt='No Results Found' className='icon'/>
      <h3 className='title'>Something went wrong</h3>
      <p className='message'>We&apos;re unbale to retrieve the weathar details. Enure you&apos; ve entered a valid city or try again later.</p>
    </div>
  )
}

export default NoResulteDev