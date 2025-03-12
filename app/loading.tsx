import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen dark:bg-slate-800 gap-6 flex items-center justify-center">
      <div className="w-36 h-36 border-8 border-dashed rounded-full animate-spin border-transparent bg-gradient-to-r from-blue-400 to-green-400 p-1">
        <div className="w-full h-full bg-slate-800 rounded-full" />
      </div>
    </div>
  )
}

export default Loading
