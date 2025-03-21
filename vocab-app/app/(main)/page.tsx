"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StreakCounter } from "@/components/homepage/streak-counter"
import { Leaderboard } from "@/components/homepage/leaderboard"
import { VocabularyLevels } from "@/components/homepage/vocabulary-levels"
import { Owl } from "@/components/owl"
import { motion } from "framer-motion"
import { ThemesOverview } from "@/components/learn/learning-topics"
import { SavedWords } from "@/components/homepage/saved-words"
import { WordsLearnedCounter } from "@/components/homepage/words-learned-counter"
import { DailyGoalTracker } from "@/components/homepage/daily-goal-tracker"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-full lg:col-span-2"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Học tiếng Anh</h2>
                      <StreakCounter days={7} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <WordsLearnedCounter totalWords={112} weeklyWords={23} />
                      <DailyGoalTracker completed={3} total={5} streak={7} />
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Cấp độ từ vựng</h3>
                      </div>
                      <VocabularyLevels />
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Chủ đề học</h3>
                      </div>
                      <ThemesOverview />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-full lg:col-span-1 space-y-6"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center">
                  <Owl className="w-32 h-32 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Chào mừng trở lại!</h3>
                  <p className="text-center text-muted-foreground mb-4">Bạn đã học được 112 từ. Hãy tiếp tục!</p>
                  <Button className="w-full">Tiếp tục học</Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Từ vựng đã lưu</h3>
                  <SavedWords />
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Bảng xếp hạng</h3>
                  <Leaderboard />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

