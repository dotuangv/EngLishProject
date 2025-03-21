"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, BookOpen, Filter, ChevronDown, Clock, Users, Star } from 'lucide-react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLessons } from "@/hooks/useLessons"
import { ThemeCard } from "@/components/ThemeCard"
import { LessonCard } from "@/components/LessonCard"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const fadeIn = {
  hidden: { opacity:.0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6
    } 
  }
};

export default function LessonsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    themes,
    allLessons,
    filteredThemes,
    searchQuery,
    setSearchQuery,
    difficulty,
    setDifficulty,
    sortBy,
    setSortBy,
  } = useLessons()

  const [currentTab, setCurrentTab] = useState("themes");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  useEffect(() => {
    const theme = searchParams.get("theme")
    if (theme) {
      setSelectedTheme(theme)
      setCurrentTab("selectedTheme")
    }
  }, [searchParams])

  // Handle click on a lesson
  const handleLessonClick = (lessonId: string) => {
    router.push(`/vocabulary-learning/${lessonId}`);
  };

  return (
    <div className="container max-w-7xl py-10">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-6"
      >
        {/* header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Bài học từ vựng</h1>
            <p className="text-muted-foreground">Khám phá các bài học từ vựng theo chủ đề</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm chủ đề hoặc bài học..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Lọc
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2">
                  <p className="text-sm font-medium mb-2">Độ khó</p>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="beginner">Cơ bản</SelectItem>
                      <SelectItem value="intermediate">Trung cấp</SelectItem>
                      <SelectItem value="advanced">Nâng cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-2 border-t">
                  <p className="text-sm font-medium mb-2">Sắp xếp theo</p>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Phổ biến" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Phổ biến</SelectItem>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="progress">Tiến độ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="themes" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Chủ đề
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Tất cả bài học
            </TabsTrigger>
            {selectedTheme && (
              <TabsTrigger value="selectedTheme" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                {themes.find(t => t.id === selectedTheme)?.title || "Chủ đề"}
              </TabsTrigger>
            )}
          </TabsList>
          
          {/* Themes Tab */}
          <TabsContent value="themes">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredThemes.map(theme => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  onSelect={(id) => {
                    setSelectedTheme(id);
                    setCurrentTab("selectedTheme");
                  }}
                />
              ))}
            </motion.div>
            
            {filteredThemes.length === 0 && (
              <div className="text-center py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Không tìm thấy kết quả</h3>
                  <p className="text-muted-foreground">Vui lòng thử tìm kiếm với từ khóa khác</p>
                </motion.div>
              </div>
            )}
          </TabsContent>
          
          {/* All Lessons Tab */}
          <TabsContent value="lessons">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {allLessons
                .filter(lesson => 
                  (lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   lesson.courseName.toLowerCase().includes(searchQuery.toLowerCase())) &&
                  (difficulty === "all" || lesson.difficulty === difficulty)
                )
                .sort((a, b) => {
                  if (sortBy === "popular") return b.vocabCount - a.vocabCount;
                  if (sortBy === "newest") return b.id.localeCompare(a.id);
                  if (sortBy === "progress") return b.progress - a.progress;
                  return 0;
                })
                .map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onSelect={(id) => handleLessonClick(id)}
                />
              ))}
            </motion.div>
            
            {allLessons.filter(lesson => 
              (lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               lesson.courseName.toLowerCase().includes(searchQuery.toLowerCase())) &&
              (difficulty === "all" || lesson.difficulty === difficulty)
            ).length === 0 && (
              <div className="text-center py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Không tìm thấy kết quả</h3>
                  <p className="text-muted-foreground">Vui lòng thử tìm kiếm với từ khóa khác</p>
                </motion.div>
              </div>
            )}
          </TabsContent>
          
          {/* Selected Theme Tab */}
          <TabsContent value="selectedTheme">
            {selectedTheme && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentTab("themes")}
                    className="mb-4"
                  >
                    ← Quay lại chủ đề
                  </Button>
                  
                  {themes.filter(t => t.id === selectedTheme).map(theme => (
                    <div key={theme.id} className="space-y-6">
                      <div className={`${theme.backgroundColor} ${theme.color} p-6 rounded-lg`}>
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{theme.icon}</div>
                          <div>
                            <h2 className="text-2xl font-bold">{theme.title}</h2>
                            <p className={`${theme.color}`}>{theme.description}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tiến độ chủ đề</span>
                            <span className="font-medium">{Math.round((theme.completedLessons / theme.lessonsCount) * 100)}%</span>
                          </div>
                          <Progress value={(theme.completedLessons / theme.lessonsCount) * 100} className="h-2 bg-white/20" />
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{theme.lessonsCount} bài học</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{theme.userCount.toLocaleString()} người học</span>
                          </div>
                          <Badge variant="outline" className="bg-white/20 text-current">
                            {theme.difficulty === "beginner" ? "Cơ bản" : 
                             theme.difficulty === "intermediate" ? "Trung cấp" : "Nâng cao"}
                          </Badge>
                          {theme.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-white/20 text-current">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-bold">Bài học trong chủ đề này</h3>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                          {theme.lessons
                            .filter(lesson => lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                              lesson.description.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(lesson => (
                            <LessonCard
                              key={lesson.id}
                              lesson={lesson}
                              onSelect={(id) => handleLessonClick(id)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
