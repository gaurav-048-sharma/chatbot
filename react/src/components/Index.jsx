import React from 'react'

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
        <div className="text-white text-2xl">
            Welcome to the Redux Counter App!
        </div>
        <div className="mt-4">
            <p className="text-lg">This app demonstrates a simple counter using Redux for state management.</p>
            <p className="text-lg">Click the buttons to increment, decrement, or reset the counter.</p>
            <p className="text-2xl">Check the source code for more details.</p>
        </div>
    </div>
  )
}

export default Index
