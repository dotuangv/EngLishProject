import { Word } from "@/types/lesson-types"
import type { QuestionType, ReviewSessionResults, ReviewWordState } from "@/types/review"
import api from "./api"

// Question types
export const QUESTION_TYPES: QuestionType[] = ["multiple-choice", "translation", "fill-in-blank", "listening"]

// tạo 1 list word tạm để tránh trường hợp chỉ ôn 1 từ mà không có từ nào khác
export const TEMP_WORD_LIST: Word[] = [
  {
    word: "hello", meaning: "xin chào",
    id: 0,
    example: "",
    example_vi: "",
    audio: "",
    image: "",
    pronunciation: "",
    pos: "",
    created_at: "",
    updated_at: "",
    cefr: "",
    lesson: 0
  },
  {
    word: "goodbye", meaning: "tạm biệt",
    id: 0,
    example: "",
    example_vi: "",
    audio: "",
    image: "",
    pronunciation: "",
    pos: "",
    created_at: "",
    updated_at: "",
    cefr: "",
    lesson: 0
  },
  {
    word: "thank you", meaning: "cảm ơn",
    id: 0,
    example: "",
    example_vi: "",
    audio: "",
    image: "",
    pronunciation: "",
    pos: "",
    created_at: "",
    updated_at: "",
    cefr: "",
    lesson: 0
  },
  {
    word: "sorry", meaning: "xin lỗi",
    id: 0,
    example: "",
    example_vi: "",
    audio: "",
    image: "",
    pronunciation: "",
    pos: "",
    created_at: "",
    updated_at: "",
    cefr: "",
    lesson: 0
  },
  {
    word: "please", meaning: "làm ơn",
    id: 0,
    example: "",
    example_vi: "",
    audio: "",
    image: "",
    pronunciation: "",
    pos: "",
    created_at: "",
    updated_at: "",
    cefr: "",
    lesson: 0
  },
]


export const ReviewService = {
  // 📌 Gọi API lấy danh sách từ vựng cần ôn tập
  async fetchReviewWords(): Promise<ReviewWordState[]> {
    try {
      const response = await api.get(`user-words/review-words/`)
      return response.data.words
    } catch (error) {
      console.error("Error fetching review words:", error)
      return []
    }
  },

  // 📌 Gọi API để lưu kết quả bài kiểm tra
  async submitReviewResults(results: ReviewSessionResults): Promise<boolean> {
    try {
      await api.post(`user-words/submit-results`, results)
      return true
    } catch (error) {
      console.error("Error submitting review results:", error)
      return false
    }
  },
  // Initialize empty results
  createEmptyResults(): ReviewSessionResults {
    return {
      correct: 0,
      incorrect: 0,
      skipped: 0,
      totalTime: 0,
      questionResults: [],
    }
  },

  // Get a random question type
  getRandomQuestionType(): QuestionType {
    const randomIndex = Math.floor(Math.random() * QUESTION_TYPES.length)
    return QUESTION_TYPES[randomIndex]
  },

  // Get question type based on word proficiency level
  getQuestionTypeByLevel(level: number): QuestionType {
    if (level <= 2) {
      // For beginner levels, use simpler question types
      return Math.random() > 0.5 ? "multiple-choice" : "listening"
    } else if (level <= 4) {
      // For intermediate levels, use medium difficulty
      return Math.random() > 0.5 ? "translation" : "fill-in-blank"
    } else {
      // For advanced levels, use any question type
      return QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)]
    }
  },

  // Generate options for multiple choice questions
  generateMultipleChoiceOptions(correctWord: string, reviewWords: ReviewWordState[]): string[] {
    // Filter out the correct word from the list of review words
    const filteredWords = reviewWords.filter((word) => word.word.word !== correctWord)
    // Shuffle the filtered words and select 3 random options
    const randomWords = filteredWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((word) => word.word.word)
    // Add the correct word to the options
    randomWords.push(correctWord)
    // Shuffle the options again before returning
    const shuffled = randomWords.sort(() => Math.random() - 0.5)
    
    return shuffled.sort(() => Math.random() - 0.5)
  },

  // Calculate mastery level based on accuracy
  calculateMasteryLevel(accuracy: number): { level: string; color: string } {
    if (accuracy >= 90) return { level: "Xuất sắc", color: "text-purple-600" }
    if (accuracy >= 80) return { level: "Giỏi", color: "text-blue-600" }
    if (accuracy >= 70) return { level: "Khá", color: "text-green-600" }
    if (accuracy >= 60) return { level: "Trung bình", color: "text-yellow-600" }
    return { level: "Cần cải thiện", color: "text-red-600" }
  },

  // Check if an answer is correct based on question type
  checkAnswer(questionType: QuestionType, answer: string, vocabularyItem: Word): boolean {
    switch (questionType) {
      case "multiple-choice":
        return answer === vocabularyItem.meaning
      case "translation":
        return answer.toLowerCase().trim() === vocabularyItem.meaning.toLowerCase().trim()
      case "fill-in-blank":
      case "listening":
        return answer.toLowerCase().trim() === vocabularyItem.word.toLowerCase().trim()
      default:
        return false
    }
  },
}

