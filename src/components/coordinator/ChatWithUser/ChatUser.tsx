import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import send from "@/assets/sidebaricon/send.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, useRef } from "react"
import { socket, connectSocket } from "@/Socket"
import { Usegetchat } from "@/hooks/getchathook"
import { Usegetmessagebyid } from "@/hooks/getmessagehook"
import { LoaderIcon } from "lucide-react"
import api from "@/config/axios"

const ChatUser = () => {
  const loggedInUserId = localStorage.getItem("userId");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<any>>([])
  const [isSending, setIsSending] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data: chatsData, isLoading: isLoadingChats } = Usegetchat()
  const chats = chatsData || []

  useEffect(() => {
    const initializeSocketConnection = async () => {
      try {
        await connectSocket()
      } catch (error) {
        console.error("Failed to initialize socket:", error)
      }
    }

    initializeSocketConnection()
  }, [])

  const { data: messagesData } = Usegetmessagebyid(selectedChatId || "")

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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const selectedChat = chats.find((chat: any) => chat.id === selectedChatId || chat._id === selectedChatId)
  const selectedUser = selectedChat?.user || null
  const selectedUserName = selectedUser?.name || selectedUser?.fullName || "User"
  const selectedUserAvatar = selectedUser?.avatar || selectedUser?.profilePicture || ""

  useEffect(() => {
    if (!selectedChatId || !socket) return

    const initializeSocket = async () => {
      try {
        await connectSocket()

        if (socket.connected && socket.id) {
          socket.emit("join_chat", { chatId: selectedChatId })
        }
      } catch (error) {
        console.error("Failed to initialize socket:", error)
      }
    }

    initializeSocket()

    const handleConnect = () => {
      if (socket?.id && selectedChatId) {
        socket.emit("join_chat", { chatId: selectedChatId })
      }
    }

    const handleDisconnect = () => {
      console.log("Socket disconnected")
    }

    const handleConnectError = (error: Error) => {
      console.error("Socket connection error:", error)
    }

    const handleMessageReceived = (message: any) => {
      if (message.chatId === selectedChatId) {
        setMessages((prev) => {
          const existsById = prev.some(m =>
            (m.id === message.id || m._id === message._id) &&
            !m.isOptimistic
          )

          if (existsById) {
            console.log("Duplicate message prevented (by ID):", message)
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
              chatId: selectedChatId,
              messageId: message.id || message._id
            })
          }

          return [...prev, message]
        })
      }
    }

    const handleUserTyping = (data: any) => {
      if (data.chatId === selectedChatId && data.userId !== loggedInUserId) {
        setTypingUsers((prev) => {
          const newSet = new Set(prev)
          if (data.isTyping) {
            newSet.add(data.userId)
          } else {
            newSet.delete(data.userId)
          }
          return newSet
        })
      }
    }

    const handleMessageRead = (data: any) => {
      if (data.chatId === selectedChatId) {
      }
    }

    if (socket.connected && socket.id) {
      socket.emit("join_chat", { chatId: selectedChatId })
    }

    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)
    socket.on("connect_error", handleConnectError)
    socket.on("message_received", handleMessageReceived)
    socket.on("user_typing", handleUserTyping)
    socket.on("message_read", handleMessageRead)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
      socket.off("connect_error", handleConnectError)
      socket.off("message_received", handleMessageReceived)
      socket.off("user_typing", handleUserTyping)
      socket.off("message_read", handleMessageRead)
      if (socket.connected && selectedChatId) {
        socket.emit("leave_chat", { chatId: selectedChatId })
        socket.emit("typing_stop", { chatId: selectedChatId })
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      setTypingUsers(new Set())
    }
  }, [selectedChatId])

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChatId || isSending) return

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
      chatId: selectedChatId,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    }

    // Add optimistic message immediately
    setMessages((prev) => [...prev, optimisticMessage])

    try {
      // Send message via API endpoint (this is the reliable method)
      const response = await api.post(`/api/chat/${selectedChatId}/messages`, {
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
      if (socket.connected && selectedChatId) {
        socket.emit("typing_stop", { chatId: selectedChatId })
      }
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)

    if (socket.connected && selectedChatId) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      if (value.trim().length > 0) {
        socket.emit("typing_start", { chatId: selectedChatId })
      } else {
        socket.emit("typing_stop", { chatId: selectedChatId })
      }

      typingTimeoutRef.current = setTimeout(() => {
        if (socket.connected && selectedChatId) {
          socket.emit("typing_stop", { chatId: selectedChatId })
        }
      }, 3000)
    }
  }

  useEffect(() => {
    if (selectedChatId && messages.length > 0 && socket.connected) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage &&
        (lastMessage.senderId !== loggedInUserId &&
          lastMessage.sender?.id !== loggedInUserId &&
          lastMessage.sender?._id !== loggedInUserId)) {
        socket.emit("mark_as_read", {
          chatId: selectedChatId,
          messageId: lastMessage.id || lastMessage._id
        })
      }
    }
  }, [selectedChatId, messages.length])

  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-3">

      <div className="bg-white lg:mt-6 rounded-[25px]">

        <div className="bg-[#FAFAFA] rounded-tl-[25px] rounded-tr-[25px] px-5 py-4">
          <div className="flex justify-between items-center">
            <span className="text-[#221E33] font-bold text-[18px]">All Chats</span>
            <Search strokeWidth={1} />
          </div>
        </div>

        <div className="py-3 px-3 flex flex-col gap-3 overflow-y-auto h-[80vh]">
          {isLoadingChats ? (
            <div className="flex items-center justify-center py-10">
              <LoaderIcon className="animate-spin" />
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center text-[#666373] py-10">
              <p>No chats available</p>
            </div>
          ) : (
            chats.map((chat: any) => {
              const chatId = chat.id || chat._id
              const isSelected = selectedChatId === chatId
              const userName = chat.user?.name || chat.user?.fullName || "User"
              const userInitials = userName.charAt(0).toUpperCase()
              const lastMessage = chat.lastMessage?.content || chat.lastMessage?.message || ""
              const hasMessages = lastMessage.trim().length > 0
              const lastMessagePreview = hasMessages
                ? (lastMessage.length > 35
                  ? lastMessage.substring(0, 35) + "..."
                  : lastMessage)
                : ""
              const isChatOpen = chat.trip?.status !== "closed"

              return (
                <div
                  key={chatId}
                  onClick={() => setSelectedChatId(chatId)}
                  className={`flex justify-between items-center gap-2 px-2 py-2 rounded-[8px] cursor-pointer transition-colors ${isSelected ? "bg-[#0DAC87]/10 border border-[#0DAC87]" : "bg-[#FAFAFE] hover:bg-[#F0F0F0]"
                    }`}
                >
                  <div className="flex gap-3 items-center flex-1 min-w-0">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={chat.user?.avatar || chat.user?.profilePicture || ""} alt={userName} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[#221E33] font-bold text-[12px] truncate">{userName}</span>
                      {hasMessages && (
                        <span className="text-[#666373] text-[10px] truncate">{lastMessagePreview}</span>
                      )}
                    </div>
                  </div>
                  <Badge className={`rounded-full px-3 py-1 flex-shrink-0 ${isChatOpen
                      ? "bg-[#1DBA4C]/10 border border-[#1DBA4C] text-[#1DBA4C]"
                      : "bg-[#BA1D1D]/10 border border-[#BA1D1D] text-[#BA1D1D]"
                    }`}>
                    {isChatOpen ? "Open" : "Close"}
                  </Badge>
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="bg-white lg:mt-6 flex flex-col md:h-[100vh] h-[140vh] rounded-[25px]">

        <div className="bg-[#FAFAFA] rounded-tl-[25px] rounded-tr-[25px] px-8 py-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-4 border border-[#D9D9D9]">
          {selectedChat ? (
            <div className="flex gap-3 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedUserAvatar} alt={selectedUserName} />
                <AvatarFallback>{selectedUserName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-medium">{selectedUserName}</span>
                <span className="text-[#666373] text-[14px]">User</span>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <span className="text-[#666373] text-[14px]">Select a chat to start messaging</span>
            </div>
          )}
        </div>

        <div className="px-4 py-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          {!selectedChatId ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#666373] text-center">Select a chat to view messages</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#666373] text-center">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg: any, index: number) => {
              const msgId = msg.id || msg._id || index
              const isMe = msg.senderId === loggedInUserId ||
                msg.sender?.id === loggedInUserId ||
                msg.sender?._id === loggedInUserId

              const senderName = msg.sender?.name ||
                msg.sender?.fullName ||
                (msg.sender?.firstName && msg.sender?.lastName
                  ? `${msg.sender.firstName} ${msg.sender.lastName}`
                  : msg.sender?.email?.split('@')[0]) ||
                "Unknown"

              const displayName = isMe ? "You" : (senderName || selectedUserName)

              const messageTime = msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })
                : ""

              return (
                <div
                  key={msgId}
                  className={`flex items-start gap-3 ${isMe ? "justify-end" : "justify-start"}`}
                >
                  {!isMe && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={msg.sender?.avatar || msg.sender?.profilePicture || selectedUserAvatar} alt={senderName} />
                      <AvatarFallback>{(senderName || selectedUserName).charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${isMe
                          ? "bg-[#0DAC87] text-white rounded-br-none"
                          : "bg-[#FAFAFE] border border-[#EFEFEF] rounded-bl-none"
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[14px] font-bold ${isMe ? "text-white" : "text-[#000000]"}`}>
                          {displayName}
                        </span>
                        {messageTime && (
                          <span className={`text-[10px] ${isMe ? "text-[#DBD9E4]" : "text-[#666373]"}`}>
                            {messageTime}
                          </span>
                        )}
                      </div>
                      <p className={`text-[14px] leading-relaxed ${isMe ? "text-white" : "text-[#221E33]"}`}>
                        {msg.content || msg.message}
                      </p>
                    </div>
                  </div>
                  {isMe && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={msg.sender?.avatar || msg.sender?.profilePicture || ""} alt="You" />
                      <AvatarFallback>YC</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })
          )}
          {typingUsers.size > 0 && (
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#666373] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#666373] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#666373] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-[#666373] text-[12px] italic">
                {selectedUserName} is typing...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex md:flex-row flex-col gap-4 justify-between items-center mt-8 px-5 py-4 inset-shadow-sm rounded-bl-[25px] rounded-br-[25px]">
          <Textarea
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="bg-[#FAFAFE] border border-[#EFEFEF] h-24 placeholder:text-[#221E33] px-5 py-4 resize-none"
            disabled={!selectedChatId || isSending}
          />

          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || !selectedChatId || isSending}
                className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10 disabled:opacity-50">
                <img src={send} alt="send" className="mr-2" />
                Send
              </Button>
              <Button
                variant={'outline'}
                onClick={() => setSelectedChatId(null)}
                className="cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">
                Close Chat
              </Button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default ChatUser
