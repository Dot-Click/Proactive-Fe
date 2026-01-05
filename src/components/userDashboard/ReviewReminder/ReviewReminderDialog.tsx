import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const ReviewReminderDialog = () => {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Write Review</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-1">
                    <Label htmlFor="name-1">Review</Label>
                    <Textarea id="name-1" name="name" placeholder="Write Your Review"/>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer bg-[#0DAC87] hover:bg-[#0fa381]">Submit Review</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default ReviewReminderDialog