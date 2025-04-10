'use client'

import { useRouter } from 'next/navigation'

export default function GenderSelection() {
  const router = useRouter()

  const handleGenderSelect = (gender: 'male' | 'female') => {
    // Store gender selection in localStorage
    localStorage.setItem('userGender', gender)
    router.push('/level-selection')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Select Your Gender</h1>
          <p className="text-gray-600 mb-8 text-center text-sm sm:text-base">
            This helps personalize your learning experience.
          </p>

          {/* Gender Selection Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleGenderSelect('male')}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 ease-in-out text-base sm:text-lg shadow-sm"
            >
              Male
            </button>
            
            <button
              onClick={() => handleGenderSelect('female')}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 ease-in-out text-base sm:text-lg shadow-sm"
            >
              Female
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 