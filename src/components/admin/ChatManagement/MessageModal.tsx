import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, LoaderIcon } from "lucide-react"
import send from "@/assets/sidebaricon/send.png"
import { useEffect, useState, useRef } from "react"
import { Usegetmessagebyid } from "@/hooks/getmessagehook"
import api from "@/config/axios"

interface MessageModalProps {
  chat: any;
}

const MessageModal = ({ chat }: MessageModalProps) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<any>>([])
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatId = chat?.id || chat?._id

  const user = chat?.participants?.find((p: any) => 
    p.user?.type === 'user' || 
    (p.userId && !chat.participants?.some((p2: any) => p2.user?.type === 'coordinator' && p2.userId === p.userId))
  )
  const coordinator = chat?.participants?.find((p: any) => 
    p.user?.type === 'coordinator' || 
    (p.userId && chat.participants?.some((p2: any) => p2.user?.type === 'user' && p2.userId !== p.userId))
  )

  const userName = user?.user?.fullName || user?.user?.name || user?.user?.email?.split('@')[0] || 'Unknown User'
  const coordinatorName = coordinator?.user?.fullName || coordinator?.user?.name || coordinator?.user?.email?.split('@')[0] || 'Unknown Coordinator'
  const userAvatar = user?.user?.profilePicture || user?.user?.avatar || ""
  const coordinatorAvatar = coordinator?.user?.profilePicture || coordinator?.user?.avatar || ""
  const tripTitle = chat?.trip?.title || chat?.trip?.name || 'No Trip'

  const { data: messagesData, isLoading, refetch, error } = Usegetmessagebyid(chatId || "")

  useEffect(() => {
    if (chatId) {
      setMessages([])
      setTimeout(() => {
        refetch()
      }, 100)
    } else {
      setMessages([])
    }
  }, [chatId, refetch])

  // useEffect(() => {
  //   if (chatId) {
  //     console.log("MessageModal - chat:", chat)
  //     console.log("MessageModal - chatId:", chatId)
  //     console.log("MessageModal - messagesData:", messagesData)
  //     console.log("MessageModal - messages count:", messages.length)
  //     console.log("MessageModal - isLoading:", isLoading)
  //     if (error) {
  //       console.error("MessageModal - error:", error)
  //     }
  //   }
  // }, [chat, chatId, messagesData, messages.length, isLoading, error])

  useEffect(() => {
    if (messagesData) {
      if (Array.isArray(messagesData)) {
        setMessages(messagesData)
      } else if (messagesData.data && Array.isArray(messagesData.data)) {
        setMessages(messagesData.data)
      } else {
        setMessages([])
      }
    } else {
      setMessages([])
    }
  }, [messagesData])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId || isSending) return

    setIsSending(true)
    const messageContent = message.trim()
    setMessage("")

    try {
      const response = await api.post(`/api/chat/${chatId}/messages`, {
        content: messageContent,
      })

      const newMessage = response.data.data || response.data
      if (newMessage) {
        setMessages((prev) => {
          const exists = prev.some(m => 
            (m.id === newMessage.id || m._id === newMessage._id)
          )
          if (exists) return prev
          return [...prev, newMessage]
        })
      }
    } catch (error: any) {
      console.error("Error sending message:", error)
      setMessage(messageContent)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!chat || !chatId) {
    return (
      <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px]">
        <div className="flex items-center justify-center py-10">
          <p className="text-[#666373]">Loading chat...</p>
        </div>
      </DialogContent>
    )
  }

  return (
    <div>
      <DialogContent className="sm:max-w-[880px] max-h-[90vh] border-[6px] border-[#E3E3E3] rounded-[20px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-[24px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
            Conversation{" "}
            <span className="font-medium text-[16px] bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
              ({tripTitle})
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="border border-[#E0E1E2] rounded-[10px] overflow-hidden">
          <div className="bg-[#FAFAFA] px-5 py-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-4">
            <div className="flex gap-3 items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-medium">{userName}</span>
                <span className="text-[#666373] text-[14px]">User</span>
              </div>
            </div>
            <ArrowRight size={18} strokeWidth={3} className="md:flex hidden" />
            <div className="flex gap-3 items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={coordinatorAvatar} alt={coordinatorName} />
                <AvatarFallback>{coordinatorName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[#221E33] font-medium">{coordinatorName}</span>
                <span className="text-[#666373] text-[14px]">Coordinator</span>
              </div>
            </div>
          </div>

          <div className="border-b border-[#EDEDED]" />

          <div className="px-5 py-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <LoaderIcon className="animate-spin" />
                <span className="ml-2 text-[#666373]">Loading messages...</span>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-10">
                <p>Error loading messages. ChatId: {chatId}</p>
                <p className="text-sm mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-[#666373] py-10">
                <p>No messages yet.</p>
                {chatId && <p className="text-xs mt-2">Chat ID: {chatId}</p>}
              </div>
            ) : (
              messages.map((msg: any, index: number) => {
                const isFromUser = (msg.senderId === user?.userId || 
                                   msg.senderId === user?.user?.id ||
                                   msg.sender?.id === user?.userId ||
                                   msg.sender?.id === user?.user?.id)
                
                const senderName = msg.sender?.fullName || 
                                  msg.sender?.name || 
                                  (msg.sender?.firstName && msg.sender?.lastName 
                                    ? `${msg.sender.firstName} ${msg.sender.lastName}` 
                                    : msg.sender?.email?.split('@')[0]) || 
                                  (isFromUser ? userName : coordinatorName)
                
                const messageTime = msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : ""

                return (
                  <div
                    key={msg.id || msg._id || index}
                    className={`flex items-start gap-3 ${isFromUser ? "" : "justify-end"}`}
                  >
                    <div className={`flex flex-col ${isFromUser ? "max-w-[70%]" : "max-w-[70%] items-end"}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        isFromUser
                          ? "bg-[#FAFAFE] border border-[#EFEFEF] rounded-bl-none"
                          : "bg-[#0DAC87] text-white rounded-br-none"
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[14px] font-bold ${isFromUser ? "text-[#000000]" : "text-white"}`}>
                            {senderName}
                          </span>
                          {messageTime && (
                            <span className={`text-[10px] ${isFromUser ? "text-[#666373]" : "text-[#DBD9E4]"}`}>
                              {messageTime}
                            </span>
                          )}
                        </div>
                        <p className={`text-[14px] leading-relaxed ${isFromUser ? "text-[#221E33]" : "text-white"}`}>
                          {msg.content || msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex md:flex-row flex-col gap-4 justify-between items-center mt-8 border-t border-[#EDEDED] px-5 py-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Reply as Admin"
              className="bg-[#FAFAFE] border border-[#EFEFEF] min-h-[80px] placeholder:text-[#221E33] px-5 py-4 resize-none"
              disabled={!chatId || isSending}
            />
            <DialogFooter className="w-full md:w-auto">
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || !chatId || isSending}
                  className="font-bold rounded-full bg-[#000000] cursor-pointer h-12 px-10 disabled:opacity-50"
                >
                  <img src={send} alt="send" className="mr-2" />
                  Send
                </Button>
                <Button variant={'outline'} className="cursor-pointer font-bold rounded-full h-12 px-10 border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000]">Close Chat</Button>
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </div>
  )
}

export default MessageModal
