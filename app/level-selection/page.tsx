'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LevelSelection() {
  const router = useRouter()
  const [learningOrder, setLearningOrder] = useState<'sequential' | 'random'>('sequential')

  const handleLevelSelect = (level: '0' | '1' | '2') => {
    router.push(`/learning/${level}?order=${learningOrder}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Select Learning Mode</h1>
          
          <div className="mb-8">
            <div className="flex w-full bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setLearningOrder('sequential')}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${ 
                  learningOrder === 'sequential' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sequential
              </button>
              <button
                onClick={() => setLearningOrder('random')}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${ 
                  learningOrder === 'random' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Random
              </button>
            </div>
          </div>
          
          <hr className="my-6 sm:my-8 border-gray-200" />
          
          <div className="flex flex-col space-y-4 w-full max-w-md">
            <button
              onClick={() => handleLevelSelect('0')}
              className="w-full py-4 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
            >
              Level 0: Basic Voca I
            </button>
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 text-center">Select Level</h2>
              <button
                onClick={() => handleLevelSelect('1')}
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 ease-in-out text-base sm:text-lg shadow-sm"
              >
                Level 1: Pronunciation Focus
              </button>
              
              <button
                onClick={() => handleLevelSelect('2')}
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 ease-in-out text-base sm:text-lg shadow-sm"
              >
                Level 2: Reading & Writing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 