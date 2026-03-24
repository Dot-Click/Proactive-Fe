import Pastadventures from "@/components/userSide/OpenOppurtunities/PastAdventure/Pastadventures"
import Showtrips from "@/components/userSide/OpenOppurtunities/Showtrip/Showtrips"
import { type TabId } from "@/components/userSide/OpenOppurtunities/Tabs/Tabs"
import Upcomingtrips from "@/components/userSide/OpenOppurtunities/Upcomingtrip/Upcomingtrips"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const OpenOppurtunitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabId>("all")
  const [showActiveOnly, setShowActiveOnly] = useState(false)

  const handleResetFilters = () => {
    setSearchQuery("")
    setShowActiveOnly(false)
    setActiveTab("all")
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <div className="max-w-[1600px] mx-auto pt-8 md:pt-28 pb-20 px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-[320px] flex-shrink-0">
            <div className="bg-white border border-[#EDEDED] rounded-[32px] p-8 sticky top-28 shadow-sm">
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                        placeholder="Search Expedition..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 py-6 rounded-2xl border-[#EDEDED] bg-[#FAFAFA] focus:ring-red-500 font-quicksand"
                    />
                </div>

                <div className="mb-10">
                    <h2 className="text-[#D40004] font-bold text-3xl mb-6 tracking-tight">Expediciones</h2>
                    
                    <div className="flex items-center space-x-3 mb-8">
                        <Checkbox 
                            id="active-enrollment" 
                            checked={showActiveOnly}
                            onCheckedChange={(checked) => setShowActiveOnly(!!checked)}
                            className="w-5 h-5 border-[#EDEDED] data-[state=checked]:bg-[#D40004] data-[state=checked]:border-[#D40004] rounded-md transition-all"
                        />
                        <label htmlFor="active-enrollment" className="text-sm font-semibold text-[#221E33] cursor-pointer" onClick={() => setShowActiveOnly(!showActiveOnly)}>
                            Inscripción abierta
                        </label>
                    </div>

                    <div className="space-y-4 text-gray-400">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest pl-1">Filtrar por estado</label>
                            <Select value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
                                <SelectTrigger className="w-full bg-[#FAFAFA] border-[#EDEDED] py-6 rounded-2xl font-bold text-[#221E33]">
                                    <SelectValue placeholder="Estado de expedición" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl shadow-xl border-[#EDEDED]">
                                    <SelectItem value="all">Todas las expediciones</SelectItem>
                                    <SelectItem value="open">Abiertas</SelectItem>
                                    <SelectItem value="coming-soon">Próximamente</SelectItem>
                                    <SelectItem value="closed">Finalizadas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <Button 
                    onClick={handleResetFilters}
                    className="w-full py-7 rounded-2xl bg-[#D40004] hover:bg-[#b00003] text-white font-bold text-lg shadow-lg shadow-red-100 transition-all hover:scale-[1.02] cursor-pointer"
                >
                    Ver todas
                </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <Showtrips 
                view="grid" 
                searchQuery={searchQuery} 
                category="" 
                activeTab={activeTab}
                activeOnly={showActiveOnly}
            />
            
            <div className="mt-20 space-y-20">
                <Upcomingtrips searchQuery={searchQuery} setSearchQuery={setSearchQuery} category="" />
                <Pastadventures />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default OpenOppurtunitiesPage