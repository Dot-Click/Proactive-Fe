import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import {  LoaderIcon, Plus, Trash2,  Tag, Percent, Euro, Clock, Edit2, AlertTriangle } from "lucide-react"
import { useState } from "react";
import { useGetAllDiscounts, useCreateDiscount, useDeleteDiscount, useUpdateDiscount } from "@/hooks/useDiscountshook";
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
        cell: ({ row }) => <ActionCell discount={row.original} />
    },
]

const ActionCell = ({ discount }: { discount: User }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { mutateAsync: deleteDiscount, isPending: isDeleting } = useDeleteDiscount();
    const { refetch } = useGetAllDiscounts();

    const handleDelete = async () => {
        try {
            await deleteDiscount(discount.id);
            toast.success("Discount code removed successfully");
            setIsDeleteOpen(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete discount");
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            <Button 
                onClick={() => setIsEditOpen(true)}
                variant="outline" 
                className="h-10 w-10 p-0 rounded-full border-[#0DAC87]/20 text-[#0DAC87] hover:bg-[#0DAC87]/5 hover:border-[#0DAC87] transition-all"
                title="Edit Discount"
            >
                <Edit2 size={16} />
            </Button>
            <Button 
                onClick={() => setIsDeleteOpen(true)}
                variant="outline" 
                className="h-10 w-10 p-0 rounded-full border-red-100 text-[#FF4d4f] hover:bg-red-50 hover:border-red-200 transition-all"
                title="Delete Discount"
            >
                <Trash2 size={16} />
            </Button>

            <EditDiscountModal 
                isOpen={isEditOpen} 
                onClose={() => setIsEditOpen(false)} 
                discount={discount}
                onSuccess={() => {
                    setIsEditOpen(false);
                    refetch();
                }}
            />

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[450px] bg-white rounded-[30px] p-8 border-none shadow-2xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle size={40} className="text-red-500" />
                        </div>
                        <h3 className="text-2xl font-black text-[#221E33] mb-2">Delete Discount Code?</h3>
                        <p className="text-[#666373] mb-8">
                            Are you sure you want to delete <span className="font-bold text-[#221E33]">"{discount.discountCode}"</span>? This action cannot be undone and will prevent users from using this code.
                        </p>
                        <div className="flex gap-3 w-full">
                            <Button 
                                variant="outline" 
                                onClick={() => setIsDeleteOpen(false)}
                                className="flex-1 h-14 rounded-2xl font-bold border-2"
                                disabled={isDeleting}
                            >
                                No, Keep it
                            </Button>
                            <Button 
                                onClick={handleDelete}
                                className="flex-1 h-14 rounded-2xl font-bold bg-[#FF4d4f] hover:bg-[#ff7875] text-white shadow-lg shadow-red-500/20"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

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

const EditDiscountModal = ({ isOpen, onClose, onSuccess, discount }: { isOpen: boolean, onClose: () => void, onSuccess: () => void, discount: User }) => {
    const { data: tripsResp } = UsegetTrips();
    const { mutateAsync: updateDiscount, isPending } = useUpdateDiscount();
    
    const [formData, setFormData] = useState({
        tripId: discount.tripId || "global",
        discountCode: discount.discountCode,
        validTill: discount.validTill ? new Date(discount.validTill).toISOString().split('T')[0] : "",
        description: discount.description,
        discountPercentage: discount.percentage,
        amount: discount.amount,
        maxUsage: discount.maxUsage || "0",
        status: discount.status,
    });

    const trips = tripsResp?.trips || tripsResp || [];

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateDiscount({
                id: discount.id,
                data: {
                    ...formData,
                    tripId: formData.tripId === "global" ? null : formData.tripId,
                    discountPercentage: formData.discountPercentage ? Number(formData.discountPercentage) : 0,
                    amount: formData.amount ? Number(formData.amount) : 0,
                    maxUsage: formData.maxUsage ? Number(formData.maxUsage) : 0,
                }
            });
            toast.success("Discount code updated!");
            onSuccess();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] bg-white rounded-[30px] p-8 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Edit2 className="text-[#0DAC87]" size={24} />
                        Edit Discount Code
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div className="space-y-2">
                        <Label className="font-bold text-[#666373]">ASSIGN TO</Label>
                        <Select value={formData.tripId} onValueChange={(val) => setFormData({ ...formData, tripId: val })}>
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
                            <Label className="font-bold text-[#666373]">STATUS</Label>
                            <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                                <SelectTrigger className="h-14 rounded-2xl bg-[#FAFAFE] font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="active" className="text-green-600 font-bold">Active</SelectItem>
                                    <SelectItem value="inactive" className="text-gray-500 font-bold">Inactive</SelectItem>
                                    <SelectItem value="expired" className="text-red-600 font-bold">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-[#666373]">MAX USAGE</Label>
                            <Input 
                                type="number"
                                className="h-14 rounded-2xl bg-[#FAFAFE]"
                                value={formData.maxUsage}
                                onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-[#666373]">PERCENTAGE (%)</Label>
                            <div className="relative">
                                <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input 
                                    type="number"
                                    className="h-14 rounded-2xl bg-[#FAFAFE] pl-10"
                                    disabled={Number(formData.amount) > 0}
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
                                    className="h-14 rounded-2xl bg-[#FAFAFE] pl-10"
                                    disabled={Number(formData.discountPercentage) > 0}
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl font-bold border-2">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="flex-1 h-14 rounded-2xl font-bold bg-[#221E33] hover:bg-[#322c4b] text-white">
                            {isPending ? <LoaderIcon className="animate-spin" /> : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountCode;