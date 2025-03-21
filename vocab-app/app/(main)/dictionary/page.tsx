"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Volume2, Bookmark, BookmarkCheck, Clock, ArrowRight, Sparkles, History, TrendingUp, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { DictionaryWordDetails } from "@/components/dictionanry/word-details"
import { DictionaryWordOfDay } from "@/components/dictionanry/word-of-day"
import { DictionaryTrendingWords } from "@/components/dictionanry/trending-words"

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedWord, setSelectedWord] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [savedWords, setSavedWords] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Simulated search suggestions
  const suggestions = [
    "accomplish", "determine", "enhance", "facilitate", "generate",
    "accommodate", "beneficial", "comprehensive", "demonstrate", "efficient"
  ].filter(word => word.includes(searchTerm.toLowerCase()) && searchTerm.length > 0)

  // Handle search
  const handleSearch = (term: string = searchTerm) => {
    if (!term.trim()) return
    
    setIsLoading(true)
    setShowSuggestions(false)
    
    // Simulate API call
    setTimeout(() => {
      // Mock result
      const result = {
        word: term.toLowerCase(),
        phonetic: "/əˈkɒmplɪʃ/",
        partOfSpeech: "verb",
        definitions: [
          "to succeed in doing or completing something",
          "to achieve or complete successfully"
        ],
        examples: [
          "She accomplished all her goals.",
          "The team accomplished the task ahead of schedule."
        ],
        synonyms: ["achieve", "complete", "fulfill", "realize", "attain", "execute"],
        antonyms: ["fail", "neglect", "forget", "abandon"],
        etymology: "Late Middle English: from Old French accompliss-, lengthened stem of accomplir, based on Latin ad- 'to' + complere 'to complete'."
      }
      
      setSelectedWord(result)
      setIsLoading(false)
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(term.toLowerCase())) {
        setRecentSearches(prev => [term.toLowerCase(), ...prev].slice(0, 10))
      }
    }, 800)
  }

  // Toggle saved word
  const toggleSavedWord = (word: string) => {
    if (savedWords.includes(word)) {
      setSavedWords(prev => prev.filter(w => w !== word))
    } else {
      setSavedWords(prev => [...prev, word])
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setSelectedWord(null)
    setShowSuggestions(false)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearch()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 container py-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Từ điển</h1>
            <p className="text-muted-foreground">Tra cứu từ vựng, nghĩa và cách sử dụng</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="overflow-hidden border-2">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="flex items-center p-4 border-b">
                      <Search className="absolute left-6 text-muted-foreground h-5 w-5" />
                      <Input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Nhập từ cần tra cứu..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setShowSuggestions(e.target.value.length > 0)
                        }}
                        onKeyDown={handleKeyPress}
                        className="pl-10 border-none shadow-none focus-visible:ring-0 text-base"
                      />
                      {searchTerm && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={clearSearch}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleSearch()} 
                        disabled={!searchTerm.trim() || isLoading}
                        className="ml-2"
                      >
                        {isLoading ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          "Tìm kiếm"
                        )}
                      </Button>
                    </div>

                    {/* Search suggestions */}
                    <AnimatePresence>
                      {showSuggestions && suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 left-0 right-0 bg-background border-t shadow-md"
                        >
                          <ul className="py-2">
                            {suggestions.map((suggestion) => (
                              <li key={suggestion}>
                                <button
                                  className="w-full px-4 py-2 text-left hover:bg-muted flex items-center"
                                  onClick={() => {
                                    setSearchTerm(suggestion)
                                    handleSearch(suggestion)
                                  }}
                                >
                                  <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                                  {suggestion}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-6 space-y-4"
                        >
                          <Skeleton className="h-8 w-1/3" />
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <div className="pt-4">
                            <Skeleton className="h-6 w-1/4" />
                            <div className="flex gap-2 mt-2">
                              <Skeleton className="h-8 w-20" />
                              <Skeleton className="h-8 w-20" />
                              <Skeleton className="h-8 w-20" />
                            </div>
                          </div>
                        </motion.div>
                      ) : selectedWord ? (
                        <motion.div
                          key="result"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DictionaryWordDetails 
                            word={selectedWord} 
                            isSaved={savedWords.includes(selectedWord.word)}
                            onToggleSave={() => toggleSavedWord(selectedWord.word)}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-6"
                        >
                          <div className="text-center py-12">
                            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Tìm kiếm từ vựng</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                              Nhập từ vựng bạn muốn tra cứu vào ô tìm kiếm phía trên để xem định nghĩa, ví dụ và cách phát âm.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              {recentSearches.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <History className="h-5 w-5 mr-2 text-muted-foreground" />
                        Tìm kiếm gần đây
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setRecentSearches([])}
                      >
                        Xóa lịch sử
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <Badge 
                          key={term} 
                          variant="outline"
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => {
                            setSearchTerm(term)
                            handleSearch(term)
                          }}
                        >
                          {term}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <DictionaryWordOfDay onSelectWord={(word) => {
                setSearchTerm(word)
                handleSearch(word)
              }} />
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 mr-2 text-muted-foreground" />
                    Từ vựng thịnh hành
                  </h3>
                  <DictionaryTrendingWords onSelectWord={(word) => {
                    setSearchTerm(word)
                    handleSearch(word)
                  }} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <Sparkles className="h-5 w-5 mr-2 text-muted-foreground" />
                    Mẹo học từ vựng
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                      <span>Sử dụng từ trong câu để hiểu ngữ cảnh</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                      <span>Tìm hiểu từ đồng nghĩa và trái nghĩa</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                      <span>Lưu từ mới và ôn tập thường xuyên</span>
                    </li>
                  </ul>
                  <Button variant="link" className="mt-2 p-0 h-auto text-sm">
                    Xem thêm mẹo học từ vựng
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}