import Link from 'next/link'
// import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mt-8 text-center overflow-hidden">
          {/* Placeholder for Logo/Icon */}
          <div className="mb-6 w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
             {/* You can replace this div with an <Image> component later */} 
             {/* Example using initials: */}
             <span className="text-3xl font-bold text-primary">T</span> 
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            ThaiStep
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Master Thai essentials, step by step.
          </p>

          <Link 
            href="/gender-selection"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-150 ease-in-out text-base sm:text-lg shadow-sm"
          >
            Start Learning
          </Link>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Learning Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Level 1 Card */}
              <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 text-left flex flex-col items-start">
                 {/* Placeholder Icon for Level 1 - using a simple SVG */}
                 <div className="w-10 h-10 mb-3 bg-blue-100 rounded-lg flex items-center justify-center">
                    {/* Replace with <Image> later */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                 </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Level 1: Pronunciation</h3>
                <p className="text-gray-600 text-sm">Focus on sounds and tones with guided listening.</p>
              </div>
              {/* Level 2 Card */}
              <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 text-left flex flex-col items-start">
                 {/* Placeholder Icon for Level 2 - using a simple SVG */}
                 <div className="w-10 h-10 mb-3 bg-orange-100 rounded-lg flex items-center justify-center">
                     {/* Replace with <Image> later */} 
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                 </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Level 2: Sentences</h3>
                <p className="text-gray-600 text-sm">Practice reading and writing key Thai phrases.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 