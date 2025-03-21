"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Pencil, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import Image from "next/image"

const topics = [
  {
    id: 1,
    title: "Tầm quan trọng của việc học ngoại ngữ",
    prompt:
      "Viết một bài luận ngắn (khoảng 150-200 từ) về chủ đề: 'Tầm quan trọng của việc học ngoại ngữ trong thế giới hiện đại'.",
    image: "/images/language-learning.jpg",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Ảnh hưởng của công nghệ đến giáo dục",
    prompt:
      "Thảo luận về cách công nghệ đã thay đổi phương pháp giảng dạy và học tập trong những năm gần đây. Bài luận nên dài khoảng 200-250 từ.",
    image: "/images/technology-education.jpg",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Lợi ích của việc đọc sách",
    prompt:
      "Viết một bài luận ngắn (khoảng 150-200 từ) về lợi ích của việc đọc sách đối với sự phát triển cá nhân và trí tuệ.",
    image: "/images/reading-books.jpg",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 4,
    title: "Bảo vệ môi trường",
    prompt:
      "Đề xuất các giải pháp để giảm thiểu tác động của con người đến môi trường. Bài luận nên dài khoảng 200-250 từ.",
    image: "/images/environment-protection.jpg",
    color: "from-green-600 to-emerald-500",
  },
  {
    id: 5,
    title: "Vai trò của truyền thông xã hội",
    prompt:
      "Phân tích tác động tích cực và tiêu cực của truyền thông xã hội đối với xã hội hiện đại. Bài luận nên dài khoảng 200-250 từ.",
    image: "/images/social-media.jpg",
    color: "from-red-500 to-pink-500",
  },
]

export default function WritingPracticePage() {
  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[0] | null>(null)
  const [essay, setEssay] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTopicSelect = (topic: (typeof topics)[0]) => {
    setSelectedTopic(topic)
    setEssay("")
    setFeedback("")
  }

  const handleSubmit = async () => {
    if (!selectedTopic) return

    setIsLoading(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Please grade the following English essay and provide detailed feedback. Consider grammar, vocabulary, structure, and content. The essay prompt is: "${selectedTopic.prompt}" Essay: "${essay}"`,
      })
      setFeedback(text)
    } catch (error) {
      console.error("Error grading essay:", error)
      setFeedback("An error occurred while grading your essay. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 container py-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-6">Luyện tập viết</h1>

          <AnimatePresence mode="wait">
            {!selectedTopic ? (
              <motion.div
                key="topic-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Chọn một chủ đề để bắt đầu:</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {topics.map((topic) => (
                    <motion.div key={topic.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Card className="cursor-pointer overflow-hidden group" onClick={() => handleTopicSelect(topic)}>
                        <div className="relative h-48">
                          <Image
                            src={topic.image || "/placeholder.svg"}
                            alt={topic.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                          ></div>
                          <CardHeader className="absolute inset-0 flex flex-col justify-end">
                            <CardTitle className="text-white text-xl font-bold drop-shadow-lg">{topic.title}</CardTitle>
                          </CardHeader>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">{topic.prompt}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="writing-interface"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Button variant="outline" onClick={() => setSelectedTopic(null)} className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại danh sách chủ đề
                </Button>
                <Card className="mb-6 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={selectedTopic.image || "/placeholder.svg"}
                      alt={selectedTopic.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedTopic.color} opacity-60`}></div>
                    <CardHeader className="absolute inset-0 flex flex-col justify-end">
                      <CardTitle className="text-white text-2xl font-bold drop-shadow-lg">
                        {selectedTopic.title}
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-lg">{selectedTopic.prompt}</p>
                  </CardContent>
                </Card>
                <Textarea
                  placeholder="Viết bài luận của bạn ở đây..."
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  className="mb-4 min-h-[200px]"
                />
                <Button onClick={handleSubmit} disabled={isLoading || essay.trim().length === 0}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang chấm điểm...
                    </>
                  ) : (
                    <>
                      <Pencil className="mr-2 h-4 w-4" />
                      Nộp bài để chấm điểm
                    </>
                  )}
                </Button>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Nhận xét và đánh giá</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: feedback }} />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}

