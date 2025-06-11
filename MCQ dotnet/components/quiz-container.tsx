"use client"

import { useState, useEffect } from "react"
import type { Question } from "@/types/question"

interface QuizContainerProps {
  question: Question
  onScoreUpdate: () => void
  userAnswer?: string
  onAnswerUpdate: (questionId: string, answer: string) => void
}

export default function QuizContainer({ question, onScoreUpdate, userAnswer, onAnswerUpdate }: QuizContainerProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null)
  const [isChecked, setIsChecked] = useState(!!userAnswer)
  const [isCorrect, setIsCorrect] = useState(false)

  // Update state when question changes or userAnswer is loaded
  useEffect(() => {
    setSelectedOption(userAnswer || null)
    setIsChecked(!!userAnswer)
    if (userAnswer) {
      setIsCorrect(userAnswer === question.answer)
    } else {
      setIsCorrect(false)
    }
  }, [question.id, userAnswer, question.answer])

  const handleOptionClick = (option: string) => {
    if (!isChecked) {
      setSelectedOption(option)
    }
  }

  const checkAnswer = () => {
    if (!selectedOption) {
      alert("Please select an answer!")
      return
    }

    setIsChecked(true)
    const correct = selectedOption === question.answer
    setIsCorrect(correct)

    // Save the answer
    onAnswerUpdate(question.id, selectedOption)

    if (correct) {
      onScoreUpdate()
    }
  }

  const getOptionClass = (option: string) => {
    if (!isChecked) {
      return selectedOption === option ? "selected" : ""
    }

    if (option === question.answer) {
      return "correct"
    }

    if (selectedOption === option && selectedOption !== question.answer) {
      return "incorrect"
    }

    return ""
  }

  return (
    <div className="question-container mb-6 p-4 border border-gray-300 rounded-lg bg-white">
      <div className="question-header flex flex-wrap justify-between gap-2 mb-4 pb-2 border-b border-gray-200">
        <span className="question-id font-bold text-blue-500">{question.id}</span>
        <span className="question-source text-gray-600 text-sm">Source: {question.source}</span>
      </div>

      <div className="question text-lg mb-4 text-gray-800">{question.question}</div>

      <div className="options flex flex-col gap-3">
        {Object.entries(question.options).map(([key, value]) => (
          <div
            key={key}
            className={`option p-3 border border-gray-300 rounded cursor-pointer transition-all ${getOptionClass(key)}`}
            onClick={() => handleOptionClick(key)}
          >
            {key}: {value}
          </div>
        ))}
      </div>

      <button
        className="check-btn block w-full max-w-[300px] mx-auto mt-4 p-3 bg-blue-500 text-white border-none rounded cursor-pointer transition-all hover:bg-blue-600 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        onClick={checkAnswer}
        disabled={isChecked || !selectedOption}
      >
        Check Answer
      </button>
    </div>
  )
}
