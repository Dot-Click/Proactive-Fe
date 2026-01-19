import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState, useRef } from "react"
import { socket, connectSocket } from "@/Socket"
import { Usegetmessagebyid } from "@/hooks/getmessagehook"
import { LoaderIcon } from "lucide-react"
import send from "@/assets/sidebaricon/send.png"
import api from "@/config/axios"

interface MessageCoordinatorProps {
  coordinator: {
    id?: string
    fullName?: string
    email?: string
    profilePicture?: string
    CoordinatorName?: string
    CoordinatorPhoto?: string
  }
  tripId?: string
  tripTitle?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MessageCoordinator = ({ coordinator, tripId, tripTitle, open, onOpenChange }: MessageCoordinatorProps) => {
  const loggedInUserId = localStorage.getItem("userId")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<any>>([])
  const [chatId, setChatId] = useState<string | null>(null)
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const coordinatorId = coordinator.id
  const coordinatorName = coordinator.fullName || coordinator.CoordinatorName || "Coordinator"
  const coordinatorImage = coordinator.profilePicture || coordinator.CoordinatorPhoto

  useEffect(() => {
    if (open && coordinatorId && loggedInUserId && tripId) {
      setIsLoadingChat(true)

      const createOrFindChat = async () => {
        try {
          const chatsResponse = await api.get("/api/chat/")
          const chats = chatsResponse.data.data || []

          const existingChat = chats.find((chat: any) => {
            if (chat.tripId !== tripId && chat.trip?.id !== tripId) return false

            const hasCoordinator = chat.participants?.some((p: any) =>
              p.userId === coordinatorId ||
              p.user?.id === coordinatorId ||
              p._id === coordinatorId ||
              p.id === coordinatorId
            )

            const hasCurrentUser = chat.participants?.some((p: any) =>
              p.userId === loggedInUserId ||
              p.user?.id === loggedInUserId ||
              p._id === loggedInUserId ||
              p.id === loggedInUserId
            )

            return hasCoordinator && hasCurrentUser
          })

          if (existingChat) {
            setChatId(existingChat.id || existingChat._id)
            setIsLoadingChat(false)
            return
          }

          const createResponse = await api.post("/api/chat/", {
            participantIds: [coordinatorId],
            tripId: tripId
          })

          const chat = createResponse.data.data || createResponse.data
          setChatId(chat.id || chat._id)
          setIsLoadingChat(false)
        } catch (error: any) {
          console.error("Error creating/fetching chat:", error)
          setIsLoadingChat(false) 
        }
      }

      createOrFindChat()
    } else {
      setChatId(null)
      setMessages([])
    }
  }, [open, coordinatorId, loggedInUserId, tripId])

  const { data: messagesData } = Usegetmessagebyid(chatId || "")

  useEffect(() => {
    if (messagesData && Array.isArray(messagesData)) {
      setMessages((prev) => {
        const optimisticMessages = prev.filter(m => m.isOptimistic)
        
        if (optimisticMessages.length > 0) {
          const fetchedIds = new Set(messagesData.map((m: any) => m.id || m._id))
          const merged = [...messagesData]
          
          optimisticMessages.forEach(optMsg => {
            const hasReal = fetchedIds.has(optMsg.content) || 
                          messagesData.some((m: any) => 
                            m.content === optMsg.content && 
                            (m.senderId === optMsg.senderId || m.sender?.id === optMsg.senderId)
                          )
            if (!hasReal) {
              merged.push(optMsg)
            }
          })
          
          return merged
        }
        
        return messagesData
      })
    }
  }, [messagesData])

  useEffect(() => {
    if (messagesEndRef.current && open) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open])

  useEffect(() => {
    if (!open || !chatId || !socket) return

    connectSocket()

    const handleConnect = () => {
      if (socket?.id) {
        socket.emit("join_chat", { chatId })
      }
    }

    const handleMessageReceived = (message: any) => {
      if (message.chatId === chatId) {
        setMessages((prev) => {
          const existsById = prev.some(m => 
            (m.id === message.id || m._id === message._id) && 
            !m.isOptimistic
          )
          
          if (existsById) {
            return prev
          }
          
          const isOwnMessage = (message.senderId === loggedInUserId) || 
                              (message.sender?.id === loggedInUserId) ||
                              (message.sender?._id === loggedInUserId)
          
          if (isOwnMessage) {
            const hasOptimistic = prev.some(m => 
              m.isOptimistic && 
              m.content === message.content && 
              (m.senderId === loggedInUserId || m.sender?.id === loggedInUserId)
            )
            
            if (hasOptimistic) {
              return prev.map(m => {
                if (m.isOptimistic && 
                    m.content === message.content && 
                    (m.senderId === loggedInUserId || m.sender?.id === loggedInUserId)) {
                  return message
                }
                return m
              })
            }
          }
          
          if (!isOwnMessage && socket.connected) {
            socket.emit("mark_as_read", {
              chatId: chatId,
              messageId: message.id || message._id
            })
          }
          
          return [...prev, message]
        })
      }
    }

    const handleUserTyping = (data: any) => {
      if (data.chatId === chatId && data.userId !== loggedInUserId) {
        setIsTyping(data.isTyping)
      }
    }

    const handleMessageRead = (data: any) => {
      if (data.chatId === chatId) {
      } 
    }

    if (socket.connected) {
      socket.emit("join_chat", { chatId })
    }

    socket.on("connect", handleConnect)
    socket.on("message_received", handleMessageReceived)
    socket.on("user_typing", handleUserTyping)
    socket.on("message_read", handleMessageRead)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("message_received", handleMessageReceived)
      socket.off("user_typing", handleUserTyping)
      socket.off("message_read", handleMessageRead)
      if (socket.connected && chatId) {
        socket.emit("leave_chat", { chatId })
        socket.emit("typing_stop", { chatId })
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      setIsTyping(false)
    }
  }, [open, chatId, socket])

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId || isSending) return

    setIsSending(true)
    const messageContent = message.trim()
    setMessage("")
    
    const tempId = `temp-${Date.now()}-${Math.random()}`
    const optimisticMessage = {
      id: tempId,
      _id: tempId,
      content: messageContent,
      message: messageContent,
      senderId: loggedInUserId,
      sender: { id: loggedInUserId, _id: loggedInUserId },
      chatId: chatId,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    }
    
    setMessages((prev) => [...prev, optimisticMessage])
    
    try {
      const response = await api.post(`/api/chat/${chatId}/messages`, {
        content: messageContent,
      })

      const newMessage = response.data.data || response.data
      if (newMessage) {
        setMessages((prev) => {
          const hasOptimistic = prev.some(m => 
            (m.id === tempId || m._id === tempId) && m.isOptimistic
          )
          
          if (hasOptimistic) {
            return prev.map(m => {
              if ((m.id === tempId || m._id === tempId) && m.isOptimistic) {
                return newMessage
              }
              if ((m.id === newMessage.id || m._id === newMessage._id) && !m.isOptimistic) {
                return m
              }
              return m
            })
          }
          
          const exists = prev.some(m => 
            (m.id === newMessage.id || m._id === newMessage._id) && !m.isOptimistic
          )
          if (exists) return prev
          return [...prev, newMessage]
        })
      }
      
    } catch (error: any) {
      console.error("Error sending message:", error)
      setMessages((prev) => prev.filter(m => m.id !== tempId && m._id !== tempId))
      setMessage(messageContent)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
      if (socket.connected && chatId) {
        socket.emit("typing_stop", { chatId })
      }
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)

    if (socket.connected && chatId) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      if (value.trim().length > 0) {
        socket.emit("typing_start", { chatId })
      } else {
        socket.emit("typing_stop", { chatId })
      }

      typingTimeoutRef.current = setTimeout(() => {
        if (socket.connected && chatId) {
          socket.emit("typing_stop", { chatId })
        }
      }, 3000)
    }
  }

  useEffect(() => {
    if (open && chatId && messages.length > 0 && socket.connected) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage && 
          (lastMessage.senderId !== loggedInUserId && 
           lastMessage.sender?.id !== loggedInUserId &&
           lastMessage.sender?._id !== loggedInUserId)) {
        socket.emit("mark_as_read", {
          chatId: chatId,
          messageId: lastMessage.id || lastMessage._id
        })
      }
    }
  }, [open, chatId, messages.length])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
            Message {coordinatorName}
            {tripTitle && (
              <span className="font-medium text-[16px] block mt-1">
                ({tripTitle})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 border border-[#E0E1E2] rounded-[10px] bg-[#FAFAFE] mb-4">
            {isLoadingChat ? (
              <div className="flex items-center justify-center py-10">
                <LoaderIcon className="animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-[#666373] py-10">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg: any, index: number) => {
                const isSender = msg.senderId === loggedInUserId ||
                  msg.sender?.id === loggedInUserId ||
                  msg.sender?._id === loggedInUserId

                const senderName = msg.sender?.name ||
                  msg.sender?.fullName ||
                  (msg.sender?.firstName && msg.sender?.lastName
                    ? `${msg.sender.firstName} ${msg.sender.lastName}`
                    : msg.sender?.email?.split('@')[0]) ||
                  msg.senderName ||
                  "Unknown"

                const displayName = isSender ? (senderName || "You") : (senderName || coordinatorName)
                const messageTime = msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })
                  : ""

                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${isSender ? "justify-end" : "justify-start"}`}
                  >
                    {!isSender && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={coordinatorImage} alt={coordinatorName} />
                        <AvatarFallback>{coordinatorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex flex-col ${isSender ? "items-end max-w-[70%]" : "items-start max-w-[70%]"}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${isSender
                            ? "bg-[#0DAC87] text-white rounded-br-none"
                            : "bg-white border border-[#EFEFEF] rounded-bl-none"
                          }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[14px] font-bold ${isSender ? "text-white" : "text-[#000000]"}`}>
                            {displayName}
                          </span>
                          {messageTime && (
                            <span className={`text-[10px] mt-1 ${isSender ? "text-[#DBD9E4]" : "text-[#666373]"}`}>
                              {messageTime}
                            </span>
                          )}
                        </div>
                        <p className={`text-[14px] leading-relaxed ${isSender ? "text-white" : "text-[#221E33]"}`}>
                          {msg.content || msg.message}
                        </p>
                      </div>
                    </div>
                    {isSender && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt="You" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                )
              })
            )}
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#666373] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[#666373] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[#666373] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-[#666373] text-[12px] italic">
                  {coordinatorName} is typing...
                </span>
              </div>
            )}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="flex gap-3 items-end">
            <Textarea
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 bg-[#FAFAFE] border border-[#EFEFEF] min-h-[80px] placeholder:text-[#221E33] px-4 py-3 resize-none"
              disabled={!chatId || isSending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || !chatId || isSending}
              className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-6 disabled:opacity-50"
            >
              <img src={send} alt="send" className="mr-2" />
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MessageCoordinator
