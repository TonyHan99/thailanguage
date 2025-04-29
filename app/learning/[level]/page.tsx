'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ThaiPhrase, loadThaiData } from '@/app/utils/data'
import { speakThai } from '@/app/utils/speech'

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

// SpeakerIcon 컴포넌트 추가
const SpeakerIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.788v6.424m4.788-11.212v16h-.017m-8.771-8h3.635" 
    />
  </svg>
);

export default function LearningPage({ params }: { params: { level: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [phrases, setPhrases] = useState<ThaiPhrase[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userGender, setUserGender] = useState<'male' | 'female' | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

  // 발음 재생 함수
  const handleSpeak = (text: string) => {
    if (isPlaying) return; // 이미 재생 중이면 중복 실행 방지
    
    setIsPlaying(true);
    speakThai(text);
    
    // 재생이 끝나면 상태 초기화 (약 2초 후)
    setTimeout(() => setIsPlaying(false), 2000);
  };

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
                <div className="flex items-center gap-2">
                  <p className="text-lg sm:text-xl font-medium text-gray-700">
                    <span className="font-semibold text-gray-500">Thai:</span> {currentPhrase.thai}
                  </p>
                  <button 
                    onClick={() => handleSpeak(currentPhrase.thai)}
                    className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isPlaying ? 'text-primary animate-pulse' : 'text-gray-400'}`}
                    disabled={isPlaying}
                    title="발음 듣기"
                  >
                    <SpeakerIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-lg sm:text-xl font-medium text-gray-700 mt-2">
                  <span className="font-semibold text-gray-500">Pronunciation:</span> {currentPhrase.pronunciation}
                </p>
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
        <div className="flex flex-col space-y-4">
          {/* Quick Navigation */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <input
              type="number"
              value={currentIndex + 1}
              onChange={(e) => {
                const newIndex = parseInt(e.target.value) - 1;
                if (newIndex >= 0 && newIndex < phrases.length) {
                  setCurrentIndex(newIndex);
                  resetStateForNextPhrase();
                }
              }}
              className="w-16 p-2 border border-gray-300 rounded-lg text-center"
              min="1"
              max={phrases.length}
            />
            <span className="text-gray-500">of {phrases.length}</span>
          </div>
          
          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {Array.from({ length: Math.ceil(phrases.length / 50) }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  const newIndex = i * 50;
                  if (newIndex < phrases.length) {
                    setCurrentIndex(newIndex);
                    resetStateForNextPhrase();
                  }
                }}
                className={`px-3 py-1 rounded-lg text-sm ${
                  Math.floor(currentIndex / 50) === i
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {i * 50 + 1}
              </button>
            ))}
          </div>

          {/* Previous/Next Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                currentIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === phrases.length - 1}
              className={`px-4 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                currentIndex === phrases.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 