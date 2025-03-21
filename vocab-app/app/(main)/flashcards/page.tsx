"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Plus, Edit, Trash2, Settings, Filter, Search, ChevronDown, Volume2, RotateCw, Bookmark, BookmarkPlus, ExternalLink, DivideCircle, X, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Sample flashcard decks data
const flashcardDecks = [
  {
    id: "d1",
    title: "Từ vựng giao tiếp cơ bản",
    description: "Những từ vựng cần thiết cho giao tiếp hàng ngày",
    backgroundColor: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-800 dark:text-blue-400",
    totalCards: 24,
    lastStudied: "2023-08-15",
    category: "Giao tiếp",
    cardsMastered: 14,
    author: "Tôi",
    favorite: true,
    cards: [
      {
        id: "c1",
        front: "Hello",
        back: "Xin chào",
        example: "Hello, how are you?",
        exampleTranslation: "Xin chào, bạn khỏe không?",
        notes: "Lời chào phổ biến nhất",
        lastReviewed: "2023-08-15",
        mastered: true
      },
      {
        id: "c2",
        front: "Thank you",
        back: "Cảm ơn",
        example: "Thank you for your help.",
        exampleTranslation: "Cảm ơn vì sự giúp đỡ của bạn.",
        notes: "Dùng khi muốn bày tỏ lòng biết ơn",
        lastReviewed: "2023-08-14",
        mastered: true
      },
      {
        id: "c3",
        front: "Goodbye",
        back: "Tạm biệt",
        example: "Goodbye, see you tomorrow!",
        exampleTranslation: "Tạm biệt, hẹn gặp lại vào ngày mai!",
        notes: "Dùng khi chia tay",
        lastReviewed: "2023-08-13",
        mastered: false
      },
      {
        id: "c4",
        front: "Sorry",
        back: "Xin lỗi",
        example: "I'm sorry for being late.",
        exampleTranslation: "Tôi xin lỗi vì đến muộn.",
        notes: "Dùng khi xin lỗi",
        lastReviewed: "2023-08-12",
        mastered: false
      },
      {
        id: "c5",
        front: "Excuse me",
        back: "Xin lỗi (để bắt đầu nói chuyện)",
        example: "Excuse me, where is the bathroom?",
        exampleTranslation: "Xin lỗi, nhà vệ sinh ở đâu?",
        notes: "Dùng khi muốn bắt đầu nói chuyện với người lạ hoặc xin phép",
        lastReviewed: "2023-08-11",
        mastered: true
      }
    ]
  },
  {
    id: "d2",
    title: "Từ vựng du lịch",
    description: "Từ vựng hữu ích khi đi du lịch nước ngoài",
    backgroundColor: "bg-green-100 dark:bg-green-900/30",
    color: "text-green-800 dark:text-green-400",
    totalCards: 30,
    lastStudied: "2023-08-10",
    category: "Du lịch",
    cardsMastered: 20,
    author: "Tôi",
    favorite: false,
    cards: [
      {
        id: "c6",
        front: "Airport",
        back: "Sân bay",
        example: "The airport is very busy today.",
        exampleTranslation: "Sân bay hôm nay rất đông.",
        notes: "Nơi máy bay cất và hạ cánh",
        lastReviewed: "2023-08-10",
        mastered: true
      },
      {
        id: "c7",
        front: "Hotel",
        back: "Khách sạn",
        example: "We're staying at a nice hotel.",
        exampleTranslation: "Chúng tôi đang ở một khách sạn đẹp.",
        notes: "Nơi du khách lưu trú",
        lastReviewed: "2023-08-09",
        mastered: true
      },
      {
        id: "c8",
        front: "Passport",
        back: "Hộ chiếu",
        example: "Don't forget your passport.",
        exampleTranslation: "Đừng quên hộ chiếu của bạn.",
        notes: "Giấy tờ quan trọng khi đi du lịch nước ngoài",
        lastReviewed: "2023-08-08",
        mastered: false
      }
    ]
  },
  {
    id: "d3",
    title: "Thuật ngữ công nghệ",
    description: "Từ vựng liên quan đến công nghệ và máy tính",
    backgroundColor: "bg-purple-100 dark:bg-purple-900/30",
    color: "text-purple-800 dark:text-purple-400",
    totalCards: 15,
    lastStudied: "2023-08-05",
    category: "Công nghệ",
    cardsMastered: 7,
    author: "Tôi",
    favorite: true,
    cards: [
      {
        id: "c9",
        front: "Computer",
        back: "Máy tính",
        example: "I need to buy a new computer.",
        exampleTranslation: "Tôi cần mua một máy tính mới.",
        notes: "Thiết bị điện tử xử lý thông tin",
        lastReviewed: "2023-08-05",
        mastered: true
      },
      {
        id: "c10",
        front: "Software",
        back: "Phần mềm",
        example: "This software helps me work more efficiently.",
        exampleTranslation: "Phần mềm này giúp tôi làm việc hiệu quả hơn.",
        notes: "Các chương trình chạy trên máy tính",
        lastReviewed: "2023-08-04",
        mastered: true
      }
    ]
  }
];

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

const cardVariants = {
  front: { 
    rotateY: 0,
    transition: { duration: 0.5 }
  },
  back: { 
    rotateY: 180,
    transition: { duration: 0.5 }
  }
};

const contentVariants = {
  front: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.5 }
  },
  back: {
    opacity: 0,
    rotateY: 180,
    transition: { duration: 0.5 }
  }
};

export default function FlashcardsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("lastStudied");
  const [view, setView] = useState("decks");
  const [selectedDeck, setSelectedDeck] = useState<any>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddDeckDialog, setShowAddDeckDialog] = useState(false);
  const [filteredDecks, setFilteredDecks] = useState(flashcardDecks);
  const [newDeckData, setNewDeckData] = useState({
    title: "",
    description: "",
    category: "Giao tiếp"
  });
  
  // Filter decks based on search term and category
  useEffect(() => {
    let filtered = flashcardDecks;
    
    if (searchTerm) {
      filtered = filtered.filter(deck => 
        deck.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        deck.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category !== "all") {
      filtered = filtered.filter(deck => deck.category === category);
    }
    
    // Sort decks
    if (sortBy === "lastStudied") {
      filtered = [...filtered].sort((a, b) => new Date(b.lastStudied).getTime() - new Date(a.lastStudied).getTime());
    } else if (sortBy === "totalCards") {
      filtered = [...filtered].sort((a, b) => b.totalCards - a.totalCards);
    } else if (sortBy === "mastery") {
      filtered = [...filtered].sort((a, b) => (b.cardsMastered / b.totalCards) - (a.cardsMastered / a.totalCards));
    }
    
    setFilteredDecks(filtered);
  }, [searchTerm, category, sortBy]);
  
  // Handle deck selection
  const handleDeckSelect = (deck: any) => {
    setSelectedDeck(deck);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setView("study");
  };
  
  // Handle next card
  const handleNextCard = () => {
    if (currentCardIndex < selectedDeck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };
  
  // Handle previous card
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };
  
  // Handle flip card
  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Handle add new deck
  const handleAddDeck = () => {
    // In a real app, you would save this to a database
    console.log("New deck:", newDeckData);
    setShowAddDeckDialog(false);
    // Reset form
    setNewDeckData({
      title: "",
      description: "",
      category: "Giao tiếp"
    });
  };
  
  // Play audio for pronunciation
  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container max-w-7xl py-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {view === "decks" ? (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Thẻ ghi nhớ</h1>
                <p className="text-muted-foreground">Tạo và học với thẻ ghi nhớ của bạn</p>
              </div>
              
              <Dialog open={showAddDeckDialog} onOpenChange={setShowAddDeckDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bộ thẻ mới
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tạo bộ thẻ ghi nhớ mới</DialogTitle>
                    <DialogDescription>
                      Điền thông tin để tạo bộ thẻ ghi nhớ mới của bạn.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="deck-title">Tiêu đề</Label>
                      <Input 
                        id="deck-title" 
                        placeholder="Nhập tiêu đề bộ thẻ" 
                        value={newDeckData.title}
                        onChange={(e) => setNewDeckData({...newDeckData, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="deck-description">Mô tả</Label>
                      <Textarea 
                        id="deck-description" 
                        placeholder="Nhập mô tả bộ thẻ" 
                        value={newDeckData.description}
                        onChange={(e) => setNewDeckData({...newDeckData, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="deck-category">Danh mục</Label>
                      <Select 
                        value={newDeckData.category}
                        onValueChange={(value) => setNewDeckData({...newDeckData, category: value})}
                      >
                        <SelectTrigger id="deck-category">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Giao tiếp">Giao tiếp</SelectItem>
                          <SelectItem value="Du lịch">Du lịch</SelectItem>
                          <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                          <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                          <SelectItem value="Y tế">Y tế</SelectItem>
                          <SelectItem value="Khác">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddDeckDialog(false)}>Hủy</Button>
                    <Button onClick={handleAddDeck} disabled={!newDeckData.title}>Tạo bộ thẻ</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm bộ thẻ..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
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
                      <p className="text-sm font-medium mb-2">Danh mục</p>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tất cả" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Giao tiếp">Giao tiếp</SelectItem>
                          <SelectItem value="Du lịch">Du lịch</SelectItem>
                          <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                          <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                          <SelectItem value="Y tế">Y tế</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-2 border-t">
                      <p className="text-sm font-medium mb-2">Sắp xếp theo</p>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Học gần đây" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lastStudied">Học gần đây</SelectItem>
                          <SelectItem value="totalCards">Số lượng thẻ</SelectItem>
                          <SelectItem value="mastery">Độ thành thạo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                    <DropdownMenuItem>
                      Quản lý danh mục
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Cài đặt hiển thị
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Nhập thẻ từ file
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Xuất thẻ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Tabs defaultValue="myDecks" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="myDecks">Bộ thẻ của tôi</TabsTrigger>
                <TabsTrigger value="shared">Bộ thẻ được chia sẻ</TabsTrigger>
                <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
              </TabsList>
              
              <TabsContent value="myDecks">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredDecks.map(deck => (
                    <motion.div 
                      key={deck.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="cursor-pointer relative"
                      onClick={() => handleDeckSelect(deck)}
                    >
                      <Card className="h-full">
                        <div className={`h-4 w-full ${deck.backgroundColor} rounded-t-lg`}></div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{deck.title}</CardTitle>
                              <CardDescription className="mt-1">{deck.description}</CardDescription>
                            </div>
                            {deck.favorite && (
                              <Bookmark className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className={`${deck.backgroundColor} ${deck.color}`}>
                              {deck.category}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {new Date(deck.lastStudied).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Mức độ thành thạo</span>
                              <span className="font-medium">{Math.round((deck.cardsMastered / deck.totalCards) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${(deck.cardsMastered / deck.totalCards) * 100}%` }}>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <div className="flex items-center gap-1 text-sm">
                            <DivideCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{deck.totalCards} thẻ</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit deck
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete deck
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
                
                {filteredDecks.length === 0 && (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <DivideCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">Không tìm thấy bộ thẻ nào</h3>
                      <p className="text-muted-foreground mb-6">Tạo bộ thẻ mới hoặc thử tìm kiếm với từ khóa khác</p>
                      <Button onClick={() => setShowAddDeckDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tạo bộ thẻ mới
                      </Button>
                    </motion.div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="shared">
                <div className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ExternalLink className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Không có bộ thẻ được chia sẻ</h3>
                    <p className="text-muted-foreground">Bạn chưa được chia sẻ bộ thẻ nào</p>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="favorites">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredDecks.filter(deck => deck.favorite).map(deck => (
                    <motion.div 
                      key={deck.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="cursor-pointer"
                      onClick={() => handleDeckSelect(deck)}
                    >
                      <Card className="h-full">
                        <div className={`h-4 w-full ${deck.backgroundColor} rounded-t-lg`}></div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{deck.title}</CardTitle>
                              <CardDescription className="mt-1">{deck.description}</CardDescription>
                            </div>
                            <Bookmark className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className={`${deck.backgroundColor} ${deck.color}`}>
                              {deck.category}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {new Date(deck.lastStudied).toLocaleDateString()}
                            </p>
                          </
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Mức độ thành thạo</span>
                              <span className="font-medium">{Math.round((deck.cardsMastered / deck.totalCards) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${(deck.cardsMastered / deck.totalCards) * 100}%` }}>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <div className="flex items-center gap-1 text-sm">
                            <DivideCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{deck.totalCards} thẻ</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit deck
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete deck
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
                
                {filteredDecks.filter(deck => deck.favorite).length === 0 && (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BookmarkPlus className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">Không có bộ thẻ yêu thích</h3>
                      <p className="text-muted-foreground">Đánh dấu yêu thích để truy cập nhanh các bộ thẻ thường xuyên sử dụng</p>
                    </motion.div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setView("decks")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thẻ
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`${selectedDeck.backgroundColor} ${selectedDeck.color}`}>
                  {selectedDeck.category}
                </Badge>
                {selectedDeck.favorite && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    <Bookmark className="h-3 w-3 mr-1 fill-current" />
                    Yêu thích
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold">{selectedDeck.title}</h1>
              <p className="text-muted-foreground">{selectedDeck.description}</p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <DivideCircle className="h-4 w-4" />
                  {selectedDeck.totalCards} thẻ
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <RotateCw className="h-4 w-4" />
                  Học gần nhất: {new Date(selectedDeck.lastStudied).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Học bộ thẻ</h2>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Thẻ {currentCardIndex + 1}/{selectedDeck.cards.length}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePrevCard()}
                    disabled={currentCardIndex === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Trước
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleNextCard()}
                    disabled={currentCardIndex === selectedDeck.cards.length - 1}
                  >
                    Tiếp
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              <motion.div
                style={{ perspective: 1000 }}
                className="w-full"
              >
                <motion.div
                  animate={isFlipped ? "back" : "front"}
                  variants={cardVariants}
                  className="relative w-full cursor-pointer"
                  onClick={handleFlipCard}
                >
                  <Card className="h-[280px] sm:h-[320px] w-full backface-hidden">
                    <CardContent className="flex flex-col justify-center items-center h-full p-6">
                      <motion.div
                        variants={contentVariants}
                        animate={isFlipped ? "back" : "front"}
                        className="text-center w-full"
                      >
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudio(selectedDeck.cards[currentCardIndex].front);
                            }}
                          >
                            <Volume2 className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle mark as mastered
                            }}
                          >
                            <Bookmark className={`h-5 w-5 ${selectedDeck.cards[currentCardIndex].mastered ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center h-full">
                          <h3 className="text-3xl font-bold mb-4">{selectedDeck.cards[currentCardIndex].front}</h3>
                          <p className="text-sm text-muted-foreground mb-4">Nhấp để lật thẻ</p>
                          
                          {selectedDeck.cards[currentCardIndex].example && (
                            <div className="mt-6">
                              <p className="text-sm italic text-muted-foreground">
                                "{selectedDeck.cards[currentCardIndex].example}"
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                      
                      <motion.div
                        variants={contentVariants}
                        animate={isFlipped ? "front" : "back"}
                        className="text-center absolute w-full"
                      >
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudio(selectedDeck.cards[currentCardIndex].back);
                            }}
                          >
                            <Volume2 className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle mark as mastered
                            }}
                          >
                            <Bookmark className={`h-5 w-5 ${selectedDeck.cards[currentCardIndex].mastered ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center h-full">
                          <h3 className="text-3xl font-bold mb-4">{selectedDeck.cards[currentCardIndex].back}</h3>
                          <p className="text-sm text-muted-foreground mb-4">Nhấp để lật thẻ</p>
                          
                          {selectedDeck.cards[currentCardIndex].exampleTranslation && (
                            <div className="mt-4">
                              <p className="text-sm italic text-muted-foreground">
                                "{selectedDeck.cards[currentCardIndex].exampleTranslation}"
                              </p>
                            </div>
                          )}
                          
                          {selectedDeck.cards[currentCardIndex].notes && (
                            <div className="mt-6 px-4 py-2 bg-muted rounded-lg text-sm">
                              <p><span className="font-medium">Ghi chú:</span> {selectedDeck.cards[currentCardIndex].notes}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              
              <div className="flex justify-center space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1 max-w-[150px]"
                  onClick={() => {
                    // Mark as needing review
                  }}
                >
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  Chưa nhớ
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 max-w-[150px]"
                  onClick={() => {
                    // Mark as somewhat remembered
                  }}
                >
                  <RotateCw className="h-4 w-4 mr-2 text-yellow-500" />
                  Mơ hồ
                </Button>
                <Button 
                  className="flex-1 max-w-[150px]"
                  onClick={() => {
                    // Mark as mastered and move to next
                    if (currentCardIndex < selectedDeck.cards.length - 1) {
                      handleNextCard();
                    }
                  }}
                >
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Đã nhớ
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}