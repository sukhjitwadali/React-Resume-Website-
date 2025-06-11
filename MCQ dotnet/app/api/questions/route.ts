import { NextResponse } from "next/server"
import type { Question } from "@/types/question"

export async function GET() {
  try {
    // Fetch the JSON data from the blob URL
    const response = await fetch("https://blobs.vusercontent.net/blob/mcq_question-3pOjepTYghVhf5eC2EdGDmnWx2Epxm.json")

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`)
    }

    const rawData = await response.json()

    // Transform the data to match our Question interface
    const quizData: Question[] = rawData.map((item: any) => ({
      id: item.id.toString(),
      question: item.question,
      options: {
        A: Array.isArray(item.options) ? item.options[0] : item.options.A || item.options["A"],
        B: Array.isArray(item.options) ? item.options[1] : item.options.B || item.options["B"],
        C: Array.isArray(item.options) ? item.options[2] : item.options.C || item.options["C"],
        D: Array.isArray(item.options) ? item.options[3] : item.options.D || item.options["D"],
      },
      answer: item.answer,
      source: item.source || item.citation || "C# Documentation",
    }))

    return NextResponse.json(quizData)
  } catch (error) {
    console.error("Error fetching quiz data:", error)

    // Fallback to a few sample questions if fetching fails
    const fallbackData: Question[] = [
      {
        id: "Q001",
        question: "When declaring a C# array using the `new int[3]` syntax, what does the number `3` represent?",
        options: {
          A: "The upper bound of the array.",
          B: "The starting index of the array.",
          C: "The total number of items the array can hold.",
          D: "The default value for each element.",
        },
        answer: "C",
        source: "04_C#.pdf",
      },
    ]

    return NextResponse.json(fallbackData)
  }
}
