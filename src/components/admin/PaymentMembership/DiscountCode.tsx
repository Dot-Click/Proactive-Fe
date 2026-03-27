import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import {  LoaderIcon, Plus, Trash2,  Tag, Percent, Euro, Clock } from "lucide-react"
import { useState } from "react";
import { useGetAllDiscounts, useCreateDiscount, useDeleteDiscount } from "@/hooks/useDiscountshook";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsegetTrips } from "@/hooks/gettriphook";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type User = {
    id: string;
    discountCode: string;
    description: string;
    percentage: string;
    validTill: string;
    maxUsage: string;
    currentUsage: number;
    status: string;
    amount: string;
    tripId?: string;
    tripTitle?: string;
};

// const data: User[] = [
//     { Code: 'SUMMER2024', Discount: '15%', ValidUntil: '2024-08-31', ExpiryDate: '89/100', Status: 'Active', Action: 'Pause' },
//     { Code: 'SUMMER2024', Discount: '15%', ValidUntil: '2024-08-31', ExpiryDate: '89/100', Status: 'Expired', Action: 'Activate' },
// ]
const userData: ColumnDef<User>[] = [
    {
        accessorKey: 'discountCode',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-4">
                <h1>Code</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-center cursor-pointer">
                        <div className="flex items-center gap-2">
                             <div className="bg-[#221E33]/5 p-1.5 rounded-lg border border-[#221E33]/10">
                                <Tag size={14} className="text-[#221E33]" />
                            </div>
                            <span className="font-black text-[15px] text-[#221E33] tracking-wider font-mono">
                                {row.original.discountCode}
                            </span>
                        </div>
                        <span className="text-[12px] text-[#666373] font-medium mt-1">
                            {row.original.description}
                        </span>
                        {row.original.tripTitle && (
                            <span className="text-[10px] bg-[#0DAC87]/10 text-[#0DAC87] px-2 py-0.5 rounded-full w-fit mt-1.5 font-bold uppercase tracking-tight">
                                Trip: {row.original.tripTitle}
                            </span>
                        )}
                        {!row.original.tripId && (
                            <span className="text-[10px] bg-[#0DAC87]/5 text-[#565070] px-2 py-0.5 rounded-full w-fit mt-1.5 font-bold uppercase border border-[#0DAC87]/10">
                                Global / Membership
                            </span>
                        )}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'percentage',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div>
                <h1>Discount</h1>
            </div>
        ),
        cell: ({ row }) => {
            const isPercentage = Number(row.original.percentage) > 0;
            return (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-center cursor-pointer">
                        <div className="flex items-center gap-1.5 font-bold text-[18px] text-[#0DAC87]">
                            {isPercentage ? (
                                <>
                                    <span>{row.original.percentage}</span>
                                    <Percent size={14} className="mt-0.5" />
                                </>
                            ) : (
                                <>
                                    <Euro size={14} className="mt-0.5" />
                                    <span>{Number(row.original.amount).toFixed(2)}</span>
                                </>
                            )}
                        </div>
                        <span className="text-[11px] text-[#BEBEBE] font-bold uppercase tracking-wide">
                            {isPercentage ? "Percentage" : "Fixed Amount"}
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'validTill',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-3">
                <h1>Valid Until</h1>
            </div>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.validTill);
            const isToday = new Date().toDateString() === date.toDateString();
            return (
                <div className="flex flex-col justify-center cursor-pointer pl-2">
                    <span className="font-bold text-[14px] text-[#221E33]">
                        {date.toLocaleDateString("en-Us", { year: "numeric", month: "long", day: "2-digit" })}
                    </span>
                    <span className="text-[11px] text-[#666373] mt-0.5 flex items-center gap-1">
                        <Clock size={10} />
                        {isToday ? "Expires today" : "Active status"}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'maxUsage',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div>
                <h1>Usage Tracker</h1>
            </div>
        ),
        cell: ({ row }) => {
            const max = parseInt(row.original.maxUsage) || 0;
            const current = row.original.currentUsage || 0;
            const usagePercentage = max > 0 ? (current / max) * 100 : 0;
            const isFull = current >= max && max > 0;

            return (
                <div className="flex flex-col justify-center cursor-pointer gap-2 min-w-[150px]">
                    <div className="flex justify-between items-end">
                        <span className="font-black text-[15px] text-[#221E33]">
                            {current} <span className="text-[#BEBEBE] font-medium text-xs">/ {max === 0 ? "∞" : max} utilized</span>
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isFull ? 'bg-red-50 text-red-500' : 'bg-[#0DAC87]/5 text-[#0DAC87]'}`}>
                            {Math.round(usagePercentage)}%
                        </span>
                    </div>
                    <Progress 
                        value={max === 0 ? 0 : usagePercentage} 
                        className={`[&>div]:${isFull ? 'bg-red-500' : 'bg-[#0DAC87]'} h-2 bg-gray-100 rounded-full w-full shadow-inner`} 
                    />
                </div>
            )
        }
    },
    {
        accessorKey: 'status',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="text-center">
                <h1>Status</h1>
            </div>
        ),
        cell: ({ row }) => {
            const isExpired = row.original.status?.toLowerCase() === "expired";
            return (
                <div className="flex justify-center">
                    <span
                        className={`inline-flex items-center px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-wide border-2 ${
                            isExpired 
                            ? "bg-[#FF3535]/5 text-[#7B0707] border-[#FF3535]/10" 
                            : "bg-[#35FF62]/5 text-[#077B21] border-[#35FF62]/10"
                        }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${isExpired ? 'bg-[#7B0707]' : 'bg-[#077B21]'}`} />
                        {row.original.status}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'Actions',
        header: () => (
            <div className="text-center">
                <h1>Actions</h1>
            </div>
        ),
        cell: ({ row }) => {
            const { mutateAsync: deleteDiscount } = useDeleteDiscount();
            const { refetch } = useGetAllDiscounts();

            const handleDelete = async () => {
                if (!confirm("Delete this discount code permanently?")) return;
                try {
                    await deleteDiscount(row.original.id as any);
                    toast.success("Discount code removed");
                    refetch();
                } catch (e) {
                    toast.error("Failed to delete discount");
                }
            };

            return (
                <div className="flex gap-2 justify-center">
                    <Button 
                        onClick={handleDelete}
                        variant={'outline'} 
                        className="cursor-pointer h-10 px-5 rounded-full border-red-200 text-[#9C0000] hover:bg-red-50 font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    >
                        <Trash2 size={16} />
                        Delete
                    </Button>
                </div>
            )
        }
    },
]

const DiscountCode = () => {
    const { data: discounts, isLoading, isError, refetch } = useGetAllDiscounts();
    const [pageSize, setPageSize] = useState<number>(10);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    if (isError) {
        return <div className="p-10 text-center text-red-500 font-bold">Error loading discounts.</div>;
    }

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#221E33]">Discount Codes</h2>
                    <p className="text-sm text-gray-500">Manage global and trip-specific discounts</p>
                </div>
                <Button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#0DAC87] hover:bg-[#119b7b] text-white rounded-full px-8 py-6 font-bold flex items-center gap-2 shadow-lg shadow-[#0DAC87]/20"
                >
                    <Plus size={20} />
                    Add Discount Code
                </Button>
            </div>

            <TableHeader
                showSearch
                showFilter={false}
                showSort
                searchPlaceholder="Search Code"
                showColumns={false}
                defaultLimit={pageSize}
                onLimitChange={(limit) => setPageSize(limit)}
            />
            <div className="bg-white rounded-[30px] border border-[#ECECF1] overflow-hidden mt-4 shadow-sm">
                {isLoading ? (
                    <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
                        <LoaderIcon className="animate-spin text-[#0DAC87] w-10 h-10" />
                        <p className="text-gray-400 font-medium animate-pulse">Fetching latest discounts...</p>
                    </div>
                ) : (
                    <ReusableTable 
                        data={discounts ?? []} 
                        columns={userData as any} 
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    />
                )}
            </div>

            <AddDiscountModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    refetch();
                }}
            />
        </div>
    )
}

const AddDiscountModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) => {
    const { data: tripsResp } = UsegetTrips();
    const { mutateAsync: createDiscount, isPending } = useCreateDiscount();
    
    const [formData, setFormData] = useState({
        tripId: "",
        discountCode: "",
        validTill: "",
        description: "",
        discountPercentage: "",
        amount: "",
        maxUsage: "0",
    });

    const trips = tripsResp?.trips || tripsResp || [];

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.discountCode || !formData.validTill) {
            toast.error("Code and Expiry date are required");
            return;
        }

        try {
            await createDiscount({
                ...formData,
                tripId: (formData.tripId === "global" || !formData.tripId) ? null : formData.tripId,
                discountPercentage: formData.discountPercentage ? Number(formData.discountPercentage) : 0,
                amount: formData.amount ? Number(formData.amount) : 0,
                maxUsage: formData.maxUsage ? Number(formData.maxUsage) : 0,
            });
            toast.success("Discount created!");
            onSuccess();
            setFormData({
                tripId: "",
                discountCode: "",
                validTill: "",
                description: "",
                discountPercentage: "",
                amount: "",
                maxUsage: "0",
            });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to create");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] bg-white rounded-[30px] p-8 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Tag className="text-[#0DAC87]" />
                        Create Discount Code
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleCreate} className="space-y-5">
                    <div className="space-y-2">
                        <Label className="font-bold text-[#666373]">ASSIGN TO</Label>
                        <Select onValueChange={(val) => setFormData({ ...formData, tripId: val })}>
                            <SelectTrigger className="h-14 rounded-2xl bg-[#FAFAFE]">
                                <SelectValue placeholder="Select Trip or Global" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="global" className="font-bold text-blue-600">Global (Membership / All Trips)</SelectItem>
                                {trips.map((t: any) => (
                                    <SelectItem key={t.id} value={t.id}>{t.title || t.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-[#666373]">CODE</Label>
                            <Input 
                                placeholder="PROACTIVE10" 
                                className="h-14 rounded-2xl bg-[#FAFAFE]"
                                value={formData.discountCode}
                                onChange={(e) => setFormData({ ...formData, discountCode: e.target.value.toUpperCase() })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-[#666373]">EXPIRY DATE</Label>
                            <Input 
                                type="date"
                                className="h-14 rounded-2xl bg-[#FAFAFE]"
                                value={formData.validTill}
                                onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-[#666373]">DESCRIPTION</Label>
                        <Input 
                            placeholder="Spring Sale 2024" 
                            className="h-14 rounded-2xl bg-[#FAFAFE]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-[#666373]">PERCENTAGE (%)</Label>
                            <div className="relative">
                                <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input 
                                    type="number"
                                    placeholder="10" 
                                    className="h-14 rounded-2xl bg-[#FAFAFE] pl-10"
                                    disabled={!!formData.amount}
                                    value={formData.discountPercentage}
                                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-[#666373]">FIXED AMOUNT (€)</Label>
                            <div className="relative">
                                <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input 
                                    type="number"
                                    placeholder="25" 
                                    className="h-14 rounded-2xl bg-[#FAFAFE] pl-10"
                                    disabled={!!formData.discountPercentage}
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-[#666373]">MAXIMUM USAGE LIMIT (0 for Unlimited)</Label>
                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                                type="number"
                                placeholder="100" 
                                className="h-14 rounded-2xl bg-[#FAFAFE] pl-10"
                                value={formData.maxUsage}
                                onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-bold border-2">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="flex-1 h-14 rounded-2xl font-bold bg-[#0DAC87] hover:bg-[#11b891] text-white">
                            {isPending ? <LoaderIcon className="animate-spin" /> : "Create Discount"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountCode