"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WritingFreeform } from "@/components/writing/freeform"
import { WritingProgress } from "@/components/writing/progress"
import { WritingSentenceBuilder } from "@/components/writing/sentence-builder"
import { WritingTextCompletion } from "@/components/writing/text-completion"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, BarChart, BookOpen, CheckCircle, Clock, Lightbulb, PenLine, Sparkles } from 'lucide-react'
import { useState } from "react"


export default function WritingPage() {
  const [activeTab, setActiveTab] = useState("sentence-builder")
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [completionStats, setCompletionStats] = useState({
    correct: 0,
    total: 0,
    time: 0
  })

  const handleExerciseComplete = (stats: { correct: number; total: number; time: number }) => {
    setCompletionStats(stats)
    setShowCompletionModal(true)
  }

  return (
    <>
      <main className="flex-1 container py-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <PenLine className="h-8 w-8 mr-3 text-primary" />
              Luyện viết
            </h1>
            <p className="text-muted-foreground">
              Rèn luyện kỹ năng viết thông qua các bài tập đa dạng
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="border-2">
                <CardContent className="p-0">
                  <Tabs 
                    defaultValue="sentence-builder" 
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <div className="border-b">
                      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger 
                          value="sentence-builder"
                          className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                          Xây dựng câu
                        </TabsTrigger>
                        <TabsTrigger 
                          value="text-completion"
                          className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                          Hoàn thành đoạn văn
                        </TabsTrigger>
                        <TabsTrigger 
                          value="freeform"
                          className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                          Viết tự do
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="sentence-builder" className="p-6">
                      <WritingSentenceBuilder onComplete={handleExerciseComplete} />
                    </TabsContent>

                    <TabsContent value="text-completion" className="p-6">
                      <WritingTextCompletion onComplete={handleExerciseComplete} />
                    </TabsContent>

                    <TabsContent value="freeform" className="p-6">
                      <WritingFreeform onComplete={handleExerciseComplete} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <WritingProgress />
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                    Mẹo luyện viết
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                      <span>Viết thường xuyên, ít nhất 15 phút mỗi ngày</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                      <span>Sử dụng từ vựng mới đã học trong câu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                      <span>Đọc lại và chỉnh sửa những gì bạn viết</span>
                    </li>
                  </ul>
                  <Button variant="link" className="mt-2 p-0 h-auto text-sm">
                    Xem thêm mẹo luyện viết
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Thống kê luyện viết
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                          Bài tập đã hoàn thành
                        </span>
                        <span className="font-medium">24</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          Độ chính xác
                        </span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          Thời gian trung bình
                        </span>
                        <span className="font-medium">4:32</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">Xem báo cáo chi tiết</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCompletionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Hoàn thành bài tập!</h2>
                <p className="text-muted-foreground mb-6">
                  Bạn đã hoàn thành bài tập luyện viết thành công.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {completionStats.correct}/{completionStats.total}
                  </div>
                  <div className="text-xs text-muted-foreground">Chính xác</div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.round((completionStats.correct / completionStats.total) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Tỷ lệ</div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {Math.floor(completionStats.time / 60)}:{(completionStats.time % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground">Thời gian</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCompletionModal(false)}
                >
                  Đóng
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setShowCompletionModal(false)
                    // Reset the exercise
                  }}
                >
                  Bài tập mới
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}