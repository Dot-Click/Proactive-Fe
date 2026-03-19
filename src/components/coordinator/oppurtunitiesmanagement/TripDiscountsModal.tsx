import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetTripDiscounts, useCreateDiscount, useDeleteDiscount } from "@/hooks/useDiscountshook";
import { Loader2, Trash2, Tag, Calendar, Percent, Euro } from "lucide-react";
import { toast } from "sonner";

interface TripDiscountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  tripName: string;
}

const TripDiscountsModal = ({
  isOpen,
  onClose,
  tripId,
  tripName,
}: TripDiscountsModalProps) => {
  const { data: discounts, isLoading, refetch } = useGetTripDiscounts(tripId);
  const { mutateAsync: createDiscount, isPending: isCreating } = useCreateDiscount();
  const { mutateAsync: deleteDiscount } = useDeleteDiscount();

  const [formData, setFormData] = useState({
    discountCode: "",
    validTill: "",
    description: "",
    discountPercentage: "",
    amount: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.discountCode || !formData.validTill || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.discountPercentage && !formData.amount) {
      toast.error("Please provide either a percentage or an amount");
      return;
    }

    try {
      await createDiscount({
        tripId,
        discountCode: formData.discountCode,
        validTill: formData.validTill,
        description: formData.description,
        discountPercentage: formData.discountPercentage ? Number(formData.discountPercentage) : 0,
        amount: formData.amount ? Number(formData.amount) : 0,
      });
      toast.success("Discount created successfully");
      refetch();
      setFormData({
        discountCode: "",
        validTill: "",
        description: "",
        discountPercentage: "",
        amount: "",
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create discount");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this discount code?")) return;
    try {
      await deleteDiscount(id);
      toast.success("Discount deleted");
      refetch();
    } catch (error: any) {
      toast.error("Failed to delete discount");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[30px] p-0 border-none shadow-2xl bg-white">
        <div className="p-8">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#0DAC87]/10 p-2 rounded-lg">
                <Tag className="text-[#0DAC87] w-6 h-6" />
              </div>
              <DialogTitle className="text-2xl font-bold text-[#221E33]">
                Manage Discounts
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-500 font-medium capitalize">
               {tripName}
            </DialogDescription>
          </DialogHeader>

          {/* Create New Discount Form */}
          <form onSubmit={handleCreate} className="space-y-6 bg-[#FAFAFE] p-6 rounded-2xl border border-[#ECECF1] mb-8">
            <h3 className="font-bold text-[#221E33] text-sm uppercase tracking-wider flex items-center gap-2">
              Create New Code
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#666373]">DISCOUNT CODE</Label>
                <Input
                  placeholder="WILD2025"
                  className="bg-white border-[#ECECF1] h-12 rounded-xl"
                  value={formData.discountCode}
                  onChange={(e) => setFormData({ ...formData, discountCode: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#666373]">EXPIRES ON</Label>
                <Input
                  type="date"
                  className="bg-white border-[#ECECF1] h-12 rounded-xl"
                  value={formData.validTill}
                  onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-[#666373]">DESCRIPTION</Label>
              <Input
                placeholder="Summer Sale 2025"
                className="bg-white border-[#ECECF1] h-12 rounded-xl"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#666373]">PERCENTAGE (%)</Label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="20"
                    disabled={!!formData.amount}
                    className="pl-10 bg-white border-[#ECECF1] h-12 rounded-xl"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#666373]">OR FIXED AMOUNT (€)</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="50"
                    disabled={!!formData.discountPercentage}
                    className="pl-10 bg-white border-[#ECECF1] h-12 rounded-xl"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isCreating}
              className="w-full bg-[#0DAC87] hover:bg-[#119b7b] h-12 rounded-xl font-bold shadow-lg shadow-[#0DAC87]/20 flex items-center justify-center gap-2"
            >
              {isCreating ? <Loader2 className="animate-spin" /> : "Create Discount Code"}
            </Button>
          </form>

          {/* Active Discounts List */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#221E33] text-sm uppercase tracking-wider">
              Active Discounts
            </h3>
            
            {isLoading ? (
              <div className="py-10 flex justify-center">
                <Loader2 className="animate-spin text-[#0DAC87]" />
              </div>
            ) : discounts && discounts.length > 0 ? (
              <div className="space-y-3">
                {discounts.map((d: any) => (
                  <div key={d.id} className="flex items-center justify-between p-4 bg-white border border-[#ECECF1] rounded-2xl hover:border-[#0DAC87]/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#0DAC87]/5 p-3 rounded-full">
                        <Tag className="text-[#0DAC87] w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-black text-[#221E33] leading-tight">{d.discountCode}</p>
                        <p className="text-xs text-gray-400 font-medium">{d.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-[#0DAC87] text-sm">
                          {d.discountPercentage > 0 ? `-${d.discountPercentage}%` : `-€${d.amount}`}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1 justify-end">
                          <Calendar size={10} />
                          {new Date(d.validTill).toLocaleDateString()}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDelete(d.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No discount codes created yet.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-8 pt-6 border-t border-[#ECECF1]">
            <Button variant="outline" onClick={onClose} className="rounded-xl px-10 h-12 border-2 font-bold hover:bg-gray-50">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripDiscountsModal;
