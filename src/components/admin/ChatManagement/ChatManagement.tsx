import { Switch } from "@/components/ui/switch"
import message from "@/assets/sidebaricon/message.png"
import TableHeader from "@/Table/TableHeader"
import { Download, FileText, LoaderIcon } from "lucide-react"
import ReusableTable from "@/Table/ReusableTable"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import MessageModal from "./MessageModal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Usegetchat } from "@/hooks/getchathook"
import { Badge } from "@/components/ui/badge"
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type ChatData = {
  id: string;
  User: string;
  Coordinator: string;
  trip: string;
  LastMessage: string;
  Status: string;
  chat: any;
};

const ChatManagement = () => {
  const [, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null)
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'csv' | null>(null);
  
  const { data: chatsData, isLoading } = Usegetchat()
  const chats = chatsData || []

  const tableData: ChatData[] = chats.map((chat: any) => {
    const user = chat.participants?.find((p: any) => 
      p.user?.type === 'user' || 
      (p.userId && !chat.participants?.some((p2: any) => p2.user?.type === 'coordinator' && p2.userId === p.userId))
    )
    const coordinator = chat.participants?.find((p: any) => 
      p.user?.type === 'coordinator' || 
      (p.userId && chat.participants?.some((p2: any) => p2.user?.type === 'user' && p2.userId !== p.userId))
    )
    
    const userName = user?.user?.fullName || user?.user?.name || user?.user?.email?.split('@')[0] || 'Unknown User'
    const coordinatorName = coordinator?.user?.fullName || coordinator?.user?.name || coordinator?.user?.email?.split('@')[0] || 'Unknown Coordinator'
    const tripName = chat.trip?.title || chat.tripId || 'No Trip'
    const lastMessageTime = chat.lastMessage?.createdAt 
      ? new Date(chat.lastMessage.createdAt).toLocaleString()
      : chat.updatedAt 
      ? new Date(chat.updatedAt).toLocaleString()
      : 'N/A'
    const status = chat.trip?.status === 'closed' ? 'Closed' : 'Open'

    return {
      id: chat.id || chat._id,
      User: userName,
      Coordinator: coordinatorName,
      trip: tripName,
      LastMessage: lastMessageTime,
      Status: status,
      chat: chat
    }
  })

  const userData: ColumnDef<ChatData>[] = [
  {
    accessorKey: 'User',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-4">
        <h1>User</h1>
      </div>
    ),
    cell: ({ row }) => {
      const chat = row.original.chat
      const user = chat?.participants?.find((p: any) => 
        p.user?.type === 'user' || 
        (p.userId && !chat.participants?.some((p2: any) => p2.user?.type === 'coordinator' && p2.userId === p.userId))
      )
      const userAvatar = user?.user?.profilePicture || user?.user?.avatar || ""
      const userInitials = row.original.User.charAt(0).toUpperCase()
      
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={userAvatar} alt={row.original.User} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.User}
            </span>
            <span className="text-[12px] text-[#666373]">
              {user?.user?.email || 'User'}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Coordinator',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-">
        <h1>Coordinator</h1>
      </div>
    ),
    cell: ({ row }) => {
      const chat = row.original.chat
      const coordinator = chat?.participants?.find((p: any) => 
        p.user?.type === 'coordinator' || 
        (p.userId && chat.participants?.some((p2: any) => p2.user?.type === 'user' && p2.userId !== p.userId))
      )
      
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-center cursor-pointer">
            <span className="font-semibold text-[14px] text-[#666373]">
              {row.original.Coordinator}
            </span>
            <span className="text-[12px] text-[#666373]">
              {coordinator?.user?.email || 'Coordinator'}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'Trip',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-1">
        <h1>Trip</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center cursor-pointer pl-2">
          <span className="font-semibold text-[14px] text-[#666373]">
            {row.original.trip}
          </span>
          <span className="text-[12px] text-[#666373]">
            ID: trip-001
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'LastMessage',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div>
        <h1>Last Message</h1>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center cursor-pointer ">
          <span className="font-semibold text-[14px] text-[#666373]">
            {row.original.LastMessage}
          </span>
          <span className="text-[12px] text-[#666373]">
            by user
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'Status',
    enableColumnFilter: true,
    enableSorting: true,
    header: () => (
      <div className="pl-6">
        <h1>Status</h1>
      </div>
    ),
    cell: ({ row }) => {
      const isOpen = row.original.Status === 'Open'
      return (
        <Badge 
          className={`rounded-full px-3 py-1 ${
            isOpen 
              ? "bg-[#1DBA4C]/10 border border-[#1DBA4C] text-[#1DBA4C]" 
              : "bg-[#BA1D1D]/10 border border-[#BA1D1D] text-[#BA1D1D]"
          }`}
        >
          {row.original.Status}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'Actions',
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setSelectedChat(row.original.chat)
                  setIsDialogOpen(true)
                }}
                className="cursor-pointer px-4 h-10 rounded-full"
              >
                View Message
              </Button>
            </DialogTrigger>
            <MessageModal chat={selectedChat || row.original.chat} />
          </Dialog>
          <Button variant={'outline'} className="cursor-pointer px-7 h-10 rounded-full border border-[#9C0000] text-[#9C0000] hover:text-[#9C0000] font-bold">Close</Button>
        </div>
      )
    }
  },
]

  // Function to export chat data to PDF
  const handleExportToPDF = () => {
    if (!tableData?.length) {
      alert("No chat data to export");
      return;
    }

    setExportLoading(true);
    setExportType('pdf');

    try {
      const doc = new jsPDF("landscape", "pt", "a4");
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(34, 30, 51); // #221E33 color
      doc.text("Chat Management Report", doc.internal.pageSize.width / 2, 40, {
        align: "center",
      });

      // Add export info
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Exported: ${new Date().toLocaleDateString()} | Total Chats: ${tableData.length}`,
        doc.internal.pageSize.width / 2,
        60,
        { align: "center" }
      );

      // Add summary stats
      doc.setFontSize(12);
      doc.setTextColor(34, 30, 51);
      doc.text("Summary", 20, 90);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      const openChats = tableData.filter(chat => chat.Status === 'Open').length;
      const closedChats = tableData.filter(chat => chat.Status === 'Closed').length;
      
      doc.text(`Total Chats: ${tableData.length}`, 20, 110);
      doc.text(`Open Chats: ${openChats}`, 20, 125);
      doc.text(`Closed Chats: ${closedChats}`, 20, 140);

      // Prepare table data
      const tableExportData = tableData.map(
        (chat: ChatData, index: number) => {
          const chatDetails = chat.chat;
          const user = chatDetails?.participants?.find((p: any) => 
            p.user?.type === 'user' || 
            (p.userId && !chatDetails.participants?.some((p2: any) => p2.user?.type === 'coordinator' && p2.userId === p.userId))
          );
          const coordinator = chatDetails?.participants?.find((p: any) => 
            p.user?.type === 'coordinator' || 
            (p.userId && chatDetails.participants?.some((p2: any) => p2.user?.type === 'user' && p2.userId !== p.userId))
          );

          return [
            (index + 1).toString(),
            chat.User,
            user?.user?.email || 'N/A',
            chat.Coordinator,
            coordinator?.user?.email || 'N/A',
            chat.trip,
            chat.LastMessage,
            chat.Status,
          ];
        }
      );

      // Define table columns
      const tableColumns = [
        "#",
        "User Name",
        "User Email",
        "Coordinator",
        "Coordinator Email",
        "Trip",
        "Last Message",
        "Status",
      ];

      // Add autoTable
      autoTable(doc, {
        head: [tableColumns],
        body: tableExportData,
        startY: 160,
        theme: "striped",
        headStyles: {
          fillColor: [34, 30, 51], // #221E33 color
          textColor: 255,
          fontSize: 10,
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [80, 80, 80],
          halign: "left",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { left: 20, right: 20 },
        styles: {
          overflow: "linebreak",
          cellPadding: 5,
        },
        didDrawPage: function (data) {
          // Add page number
          const pageCount = doc.getNumberOfPages();
          doc.setFontSize(9);
          doc.setTextColor(150, 150, 150);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 20,
            { align: "center" }
          );
        },
      });

      // Save the PDF
      doc.save(`chat-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setExportLoading(false);
      setExportType(null);
    }
  };

  // Function to export as CSV
  const handleExportToCSV = () => {
    if (!tableData?.length) {
      alert("No chat data to export");
      return;
    }

    setExportLoading(true);
    setExportType('csv');

    try {
      const headers = [
        "Chat ID",
        "User Name",
        "User Email",
        "Coordinator Name",
        "Coordinator Email",
        "Trip",
        "Last Message",
        "Status",
        "Created At"
      ];

      const csvData = tableData.map((chat: ChatData) => {
        const chatDetails = chat.chat;
        const user = chatDetails?.participants?.find((p: any) => 
          p.user?.type === 'user' || 
          (p.userId && !chatDetails.participants?.some((p2: any) => p2.user?.type === 'coordinator' && p2.userId === p.userId))
        );
        const coordinator = chatDetails?.participants?.find((p: any) => 
          p.user?.type === 'coordinator' || 
          (p.userId && chatDetails.participants?.some((p2: any) => p2.user?.type === 'user' && p2.userId !== p.userId))
        );

        return [
          `"${chat.id}"`,
          `"${chat.User}"`,
          `"${user?.user?.email || ''}"`,
          `"${chat.Coordinator}"`,
          `"${coordinator?.user?.email || ''}"`,
          `"${chat.trip}"`,
          `"${chat.LastMessage}"`,
          `"${chat.Status}"`,
          chatDetails?.createdAt ? new Date(chatDetails.createdAt).toISOString() : ""
        ];
      });

      const csvContent = [
        headers.join(","),
        ...csvData.map((row: any) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `chat-data-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV:", error);
      alert("Failed to generate CSV. Please try again.");
    } finally {
      setExportLoading(false);
      setExportType(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="bg-[#FFFFFF] mt-3 rounded-[25px] px-5 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex flex-col gap-1">
            <span className="text-center md:text-start bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold">Chat Widget Control</span>
            <span className="text-[#A19EAE] text-center md:text-start">Enable or disable the floating chat widget on all trip pages</span>
          </div>
          <div className="bg-[#FAFAFA] px-6 py-4 rounded-full flex justify-between gap-2 mt-4 md:mt-0 items-center md:w-auto w-full">
            <span className="bg-linear-to-r from-[#221E33] to-[#565070]  text-transparent bg-clip-text font-bold">Chat Widget</span>
            <Switch className="w-12" />
          </div>
        </div>
        <div className="bg-[#221E33]/5 mt-4 px-4 py-3 rounded-[10px] flex gap-2 items-center md:w-210">
          <img src={message} alt="message" className="h-10" />
          <span className="text-[12px] text-[#221E33]/50">All user-coordinator chats are securely stored. Admins can monitor conversations, disable the chat widget, or step in when needed. Chat widget is currently enabled - users can start new conversations.</span>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-2 mb-3 mt-4">
        <Button
          onClick={handleExportToPDF}
          disabled={exportLoading || !tableData?.length}
          className="bg-[#221E33] hover:bg-[#2d2742] text-white"
        >
          {exportLoading && exportType === 'pdf' ? (
            <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Export PDF
        </Button>
        
        <Button
          onClick={handleExportToCSV}
          disabled={exportLoading || !tableData?.length}
          variant="outline"
          className="border-[#221E33] text-[#221E33] hover:bg-[#221E33]/10"
        >
          {exportLoading && exportType === 'csv' ? (
            <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <FileText className="h-4 w-4 mr-2" />
          )}
          Export CSV
        </Button>
      </div>

      <TableHeader
        showSearch
        showFilter={false}
        showSort
        searchPlaceholder="Search Message"
        defaultLimit={pageSize}
        limitOptions={[5, 10, 20, 30, 50]}
        onLimitChange={(limit) => setPageSize(limit)}
      />
      <div className="bg-white rounded-[25px] mt-3">
        <ReusableTable 
          data={tableData} 
          columns={userData} 
          onExposeColumns={(payload) => setColumnsMenu(payload)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </>
  )
}

export default ChatManagement