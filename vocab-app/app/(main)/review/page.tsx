import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/components/header/main-nav"
import { UserNav } from "@/components/header/user-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen } from "lucide-react"
import { VocabularyLevels } from "@/components/homepage/vocabulary-levels"
import { ReviewWordList } from "@/components/review/review-word-list"

export default function ReviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="container py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-1">Ôn tập từ vựng</h1>
                <p className="text-muted-foreground flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Tổng số từ đã học: 112 từ
                </p>
              </div>
              <Button size="lg">Bắt đầu ôn tập</Button>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Phân bố từ vựng theo cấp độ</h2>
                <VocabularyLevels showLabels />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="all">
                    <ReviewWordList />
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

