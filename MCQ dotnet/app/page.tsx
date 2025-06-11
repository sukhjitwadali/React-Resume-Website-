"use client"

import { useState, useEffect } from "react"
import QuizContainer from "@/components/quiz-container"
import type { Question } from "@/types/question"

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [questionsPerPage, setQuestionsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("csharp-quiz-state")
    if (savedState) {
      try {
        const {
          currentIndex,
          answers,
          currentPage: savedPage,
          questionsPerPage: savedQuestionsPerPage,
        } = JSON.parse(savedState)
        setCurrentQuestionIndex(currentIndex || 0)
        setUserAnswers(answers || {})
        if (savedPage) setCurrentPage(savedPage)
        if (savedQuestionsPerPage) setQuestionsPerPage(savedQuestionsPerPage)
      } catch (error) {
        console.error("Error loading saved state:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      const stateToSave = {
        currentIndex: currentQuestionIndex,
        answers: userAnswers,
        currentPage: currentPage,
        questionsPerPage: questionsPerPage,
      }
      localStorage.setItem("csharp-quiz-state", JSON.stringify(stateToSave))
    }
  }, [currentQuestionIndex, userAnswers, currentPage, questionsPerPage, isLoaded])

  useEffect(() => {
    // Fetch questions from the API
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching questions:", error)
        setLoading(false)
      })
  }, [])

  // Pagination calculations
  const totalPages = Math.ceil(questions.length / questionsPerPage)
  const startIndex = (currentPage - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  const currentPageQuestions = questions.slice(startIndex, endIndex)
  const questionIndexInPage = currentQuestionIndex - startIndex
  const isQuestionInCurrentPage = currentQuestionIndex >= startIndex && currentQuestionIndex < endIndex

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Jump to first question of the new page
    const newQuestionIndex = (page - 1) * questionsPerPage
    setCurrentQuestionIndex(newQuestionIndex)
  }

  const handleQuestionsPerPageChange = (newQuestionsPerPage: number) => {
    setQuestionsPerPage(newQuestionsPerPage)
    // Recalculate current page based on current question
    const newPage = Math.floor(currentQuestionIndex / newQuestionsPerPage) + 1
    setCurrentPage(newPage)
  }

  const getPageForQuestion = (questionIndex: number) => {
    return Math.floor(questionIndex / questionsPerPage) + 1
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      const newPage = getPageForQuestion(currentQuestionIndex - 1)
      setCurrentPage(newPage)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      const newPage = getPageForQuestion(currentQuestionIndex + 1)
      setCurrentPage(newPage)
    }
  }

  const handleScoreUpdate = () => {
    setScore(score + 1)
  }

  const handleAnswerUpdate = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
    const newPage = getPageForQuestion(index)
    setCurrentPage(newPage)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading C# MCQ Quiz...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-4">
      <div className="container max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">C# MCQ Quiz</h1>

        <div className="text-center text-gray-600 mb-4">
          Question <span id="current-question">{currentQuestionIndex + 1}</span> of{" "}
          <span id="total-questions">{questions.length}</span>
          {questions.length > 0 && (
            <span className="ml-2 text-sm">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="text-center text-gray-600 mb-4">
          Progress: {Object.keys(userAnswers).length} of {questions.length} questions answered
        </div>

        {questions.length > 0 && (
          <QuizContainer
            question={questions[currentQuestionIndex]}
            onScoreUpdate={handleScoreUpdate}
            userAnswer={userAnswers[questions[currentQuestionIndex].id]}
            onAnswerUpdate={handleAnswerUpdate}
          />
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Question Navigation</h3>
            <div className="flex items-center gap-2">
              <label htmlFor="questionsPerPage" className="text-sm font-medium">
                Questions per page:
              </label>
              <select
                id="questionsPerPage"
                value={questionsPerPage}
                onChange={(e) => handleQuestionsPerPageChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              Previous Page
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded text-sm font-medium ${
                      pageNum === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              Next Page
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 mb-3">
            Page {currentPage} of {totalPages} ({questions.length} total questions)
          </div>

          {/* Current Page Questions Grid */}
          <div className="grid grid-cols-10 gap-2 max-h-40 overflow-y-auto">
            {currentPageQuestions.map((_, index) => {
              const actualIndex = startIndex + index
              return (
                <button
                  key={actualIndex}
                  onClick={() => handleJumpToQuestion(actualIndex)}
                  className={`w-10 h-10 rounded text-sm font-medium transition-all ${
                    actualIndex === currentQuestionIndex
                      ? "bg-blue-500 text-white"
                      : userAnswers[questions[actualIndex]?.id]
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {actualIndex + 1}
                </button>
              )
            })}
          </div>

          {/* Show indicator if current question is not on current page */}
          {!isQuestionInCurrentPage && (
            <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">
              Current question ({currentQuestionIndex + 1}) is on page {getPageForQuestion(currentQuestionIndex)}.
              <button
                onClick={() => handlePageChange(getPageForQuestion(currentQuestionIndex))}
                className="ml-2 text-blue-600 hover:text-blue-800 underline"
              >
                Go to that page
              </button>
            </div>
          )}

          <div className="flex gap-4 mt-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6 px-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 max-w-[200px] py-3 px-6 bg-blue-500 text-white rounded-md cursor-pointer transition-all hover:bg-blue-600 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex-1 max-w-[200px] py-3 px-6 bg-blue-500 text-white rounded-md cursor-pointer transition-all hover:bg-blue-600 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            Next
          </button>
        </div>

        <div className="text-center text-lg mt-6 p-4 bg-blue-100 rounded-md">
          <p>
            Score: <span id="score">{score}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
