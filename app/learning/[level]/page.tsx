'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ThaiPhrase, loadThaiData } from '@/app/utils/data'

// Fisher-Yates (aka Knuth) Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array]; // Create a copy to avoid modifying the original array

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}

export default function LearningPage({ params }: { params: { level: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [phrases, setPhrases] = useState<ThaiPhrase[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userGender, setUserGender] = useState<'male' | 'female' | null>(null)
  const [userAnswer, setUserAnswer] = useState('') // State for user input in Level 2
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null) // State for answer correctness

  useEffect(() => {
    const gender = localStorage.getItem('userGender') as 'male' | 'female'
    const order = searchParams.get('order') || 'sequential'

    if (gender || params.level === '0') {  // Allow Level 0 without gender
      setUserGender(gender)
      loadThaiData(params.level).then(allData => {
        // Apply gender filter only for levels 1 and 2
        const filteredData = params.level === '0' 
          ? allData 
          : allData.filter(phrase => phrase.gender === gender)
        console.log("Filtered data:", filteredData)
        
        // Shuffle data if order is random
        const orderedData = order === 'random' ? shuffleArray(filteredData) : filteredData
        console.log(`Data order: ${order}`, orderedData)

        if (orderedData.length > 0) {
          setPhrases(orderedData)
        } else {
          console.error("No data found for the selected level:", params.level)
          // Consider adding user feedback here
        }
      }).catch(error => {
        console.error("Failed to load or process data:", error)
        // Consider adding user feedback here
      })
    } else {
      console.warn("User gender not found in localStorage. Redirecting...")
      router.push('/gender-selection')
    }
  }, [searchParams, params.level, router])

  const currentPhrase = phrases[currentIndex]

  const resetStateForNextPhrase = () => {
      setShowAnswer(false)
      setUserAnswer('')
      setIsCorrect(null)
  }

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(prev => prev + 1)
      resetStateForNextPhrase()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      resetStateForNextPhrase()
    }
  }

  const handleShowAnswer = () => {
      setShowAnswer(true);
      // Check if it's Level 2, currentPhrase exists, AND currentPhrase.thai is a string
      if (params.level === '2' && currentPhrase && typeof currentPhrase.thai === 'string') { 
          // Basic check (case-insensitive, trims whitespace)
          const correct = userAnswer.trim().toLowerCase() === currentPhrase.thai.trim().toLowerCase();
          setIsCorrect(correct);
      } else if (params.level === '2') {
          // If thai phrase is missing, consider it incorrect or handle as needed
          setIsCorrect(false);
      }
  }

  // Loading state more robust
  if (!userGender || phrases.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <p className="text-lg text-gray-600">Loading phrases...</p>
        {/* Add a spinner animation here if desired */}
      </div>
    )
  }

  if (!currentPhrase) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <p className="text-lg text-red-600">Error: Could not load the current phrase.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 sm:p-6 pt-20 sm:pt-24">
      <div className="w-full max-w-xl">
        {/* Progress Indicator (Optional but Recommended) */}
        <div className="text-center mb-4 text-sm text-gray-500">
          {currentIndex + 1} / {phrases.length}
        </div>

        {/* Main Learning Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
          {/* Korean Phrase */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 text-center">
            {currentPhrase.kr}
          </h2>

          <div className="space-y-5">
            {/* Answer Section */} 
            {showAnswer ? (
              <div className={`mt-4 p-4 rounded-lg ${isCorrect === true ? 'bg-green-50 border border-green-200' : isCorrect === false ? 'bg-red-50 border border-red-200' : 'bg-gray-100 border border-gray-200'}`}>
                <p className="text-lg sm:text-xl font-medium text-gray-700">
                  <span className="font-semibold text-gray-500">Pronunciation:</span> {currentPhrase.pronunciation}
                </p>
                {/* Show Thai text only in Level 0 and 2 */} 
                {(params.level === '0' || params.level === '2') && (
                  <p className="text-lg sm:text-xl font-medium mt-2 text-gray-700">
                    <span className="font-semibold text-gray-500">Thai:</span> {currentPhrase.thai}
                  </p>
                )}
                {/* Correct/Incorrect Feedback for Level 2 */}
                {params.level === '2' && isCorrect !== null && (
                  <p className={`mt-3 text-base font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? 'Correct! 👍' : 'Incorrect. Try again!'}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Input field for Level 2 */}
                {params.level === '2' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleShowAnswer();
                        }
                      }}
                      placeholder="Type the Thai phrase here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-150 ease-in-out text-gray-900"
                      aria-label="Thai input"
                    />
                  </div>
                )}
                {/* Show Answer Button */}
                <button
                  onClick={handleShowAnswer}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-primary font-semibold py-3 px-6 rounded-lg transition-colors duration-150 ease-in-out text-base sm:text-lg shadow-sm"
                >
                  {params.level === '2' ? 'Check Answer' : 'Show Answer'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-3">
          {/* Apple-style Gray Button */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base"
          >
            Previous
          </button>
          {/* Apple-style Primary Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === phrases.length - 1}
            className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
} 