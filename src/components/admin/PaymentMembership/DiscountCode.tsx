import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import {  LoaderIcon, Plus, Trash2,  Tag, Percent, Euro } from "lucide-react"
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
    code: string;
    description: string;
    percentage: string;
    validTill: string;
    maxUsage: string;
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
        accessorKey: 'code',
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
                        <span className="font-bold text-[15px] text-[#221E33]">
                            {row.original.code}
                        </span>
                        <span className="text-[12px] text-[#666373] font-medium">
                            {row.original.description}
                        </span>
                        {row.original.tripTitle && (
                            <span className="text-[10px] bg-[#0DAC87]/10 text-[#0DAC87] px-2 py-0.5 rounded-full w-fit mt-1 font-bold">
                                Trip: {row.original.tripTitle}
                            </span>
                        )}
                        {!row.original.tripId && (
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full w-fit mt-1 font-bold">
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
            return (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-center cursor-pointer">
                        <span className="font-bold text-[14px] text-[#0DAC87]">
                            {Number(row.original.percentage) > 0 ? `${row.original.percentage}%` : `€${Number(row.original.amount).toFixed(2)}`}
                        </span>
                        <span className="text-[11px] text-[#BEBEBE] font-medium">
                            {Number(row.original.percentage) > 0 ? "Percentage discount" : "Fixed amount"}
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
            return (
                <div className="flex flex-col justify-center cursor-pointer pl-2">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {new Date(row.original.validTill).toLocaleDateString("en-Us", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        Created: {new Date(row.original.validTill).toLocaleDateString("en-Us", { year: "numeric", month: "2-digit", day: "2-digit" })}
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
                <h1>Usage</h1>
            </div>
        ),
        cell: ({ row }) => {
        const usagePercentage = (parseInt(row.original.maxUsage) / 100) * 100;
            return (
                <div className="flex flex-col justify-center cursor-pointer gap-1">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {row.original.maxUsage}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        <Progress value={usagePercentage} className="[&>div]:bg-[#16A34A] lg:w-[270%] w-[150px]" />
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'status',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-22">
                <h1>Status</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="pl-16">
                    <Button
                        className={`${row.original.status === "Expired" ? "font-bold rounded-full bg-[#FF3535]/10 text-[#7B0707] border border-[#7B0707] hover:bg-[#FF3535]/20 px-8 py-5" : "font-bold rounded-full bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-8 py-5"} `}
                    >
                        {row.original.status}
                    </Button>
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
                if (!confirm("Delete this discount?")) return;
                try {
                    await deleteDiscount(row.original.id as any);
                    toast.success("Discount deleted");
                    refetch();
                } catch (e) {
                    toast.error("Failed to delete");
                }
            };

            return (
                <div className="flex gap-2 justify-center">
                    <Button 
                        onClick={handleDelete}
                        variant={'outline'} 
                        className="cursor-pointer px-4 h-9 rounded-full border-red-100 text-red-500 hover:text-red-600 hover:bg-red-50 font-bold flex items-center gap-1.5"
                    >
                        <Trash2 size={14} />
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