"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Flashcard } from "@/components/learn/flashcard"
import { Volume2, CheckCircle, XCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

const vocabularyList = [
  { word: "Accomplish", meaning: "Hoàn thành", audioUrl: "/audio/accomplish.mp3" },
  { word: "Determine", meaning: "Quyết định", audioUrl: "/audio/determine.mp3" },
  { word: "Enhance", meaning: "Nâng cao", audioUrl: "/audio/enhance.mp3" },
  { word: "Facilitate", meaning: "Tạo điều kiện", audioUrl: "/audio/facilitate.mp3" },
  { word: "Generate", meaning: "Tạo ra", audioUrl: "/audio/generate.mp3" },
]

export default function VocabularyLearningPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const searchParams = useSearchParams()
  const topicId = searchParams.get("topic")

  useEffect(() => {
    // Here you would fetch vocabulary words for the specific topic
    // For now, we'll just log the topic ID
    console.log("Loading vocabulary for topic:", topicId)
  }, [topicId])

  const currentWord = vocabularyList[currentWordIndex]

  useEffect(() => {
    setProgress(((currentWordIndex * 3 + stage) / (vocabularyList.length * 3)) * 100)
  }, [currentWordIndex, stage])

  const handleNext = () => {
    if (stage < 2) {
      setStage(stage + 1)
    } else {
      if (currentWordIndex < vocabularyList.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1)
        setStage(0)
      } else {
        // Lesson completed
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
    setUserInput("")
    setShowResult(false)
  }

  const handleSubmit = () => {
    const isAnswerCorrect = userInput.toLowerCase().trim() === currentWord.word.toLowerCase()
    setIsCorrect(isAnswerCorrect)
    setShowResult(true)

    if (isAnswerCorrect) {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.7 },
      })
    }

    setTimeout(() => {
      handleNext()
    }, 1500)
  }

  const playAudio = () => {
    const audio = new Audio(currentWord.audioUrl)
    audio.play()
  }

  const renderStage = () => {
    switch (stage) {
      case 0:
        return <Flashcard frontContent={currentWord.word} backContent={currentWord.meaning} onNext={handleNext} />
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Nghe và nhập từ</h2>
            <Button onClick={playAudio} className="w-full mb-4">
              <Volume2 className="mr-2 h-4 w-4" /> Nghe
            </Button>
            <Input
              type="text"
              placeholder="Nhập từ bạn nghe được"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-lg"
            />
            <Button onClick={handleSubmit} className="w-full" disabled={!userInput.trim()}>
              Kiểm tra
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Nhập từ theo nghĩa</h2>
            <p className="text-xl mb-4 text-center italic">"{currentWord.meaning}"</p>
            <Input
              type="text"
              placeholder="Nhập từ tiếng Anh"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-lg"
            />
            <Button onClick={handleSubmit} className="w-full" disabled={!userInput.trim()}>
              Kiểm tra
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 container py-6">
        <div className="mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8 space-y-4">
              <h1 className="text-3xl font-bold text-center">Học từ vựng</h1>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Tiến độ: {Math.round(progress)}%</div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">
                    Từ {currentWordIndex + 1}/{vocabularyList.length}
                  </span>
                  <span className="text-sm text-muted-foreground">(Giai đoạn {stage + 1}/3)</span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentWordIndex}-${stage}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStage()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center justify-center p-4 rounded-lg mb-6 ${
                    isCorrect ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="font-medium">Chính xác! Làm tốt lắm!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <span className="font-medium">Không chính xác. Đáp án đúng là "{currentWord.word}".</span>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {progress >= 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold mb-4">Chúc mừng! Bạn đã hoàn thành bài học từ vựng.</h2>
                <Button>Quay về trang chủ</Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

