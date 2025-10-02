import React from 'react'

const Ping = () => {
  return (
    <div className='relative'>
        <div className='absoute -left-4 top-1'>
            <span className='flex size-[11px]'>
                <span className='absolute inline-flex h-full w-full  animate-ping  rounded-full opacity-90'>
                    <span className='relative inline-flex size-[11px] rounded-full bg-red-600'></span>
                </span>
            </span>
        </div>
    </div>
  )
}

export default Ping