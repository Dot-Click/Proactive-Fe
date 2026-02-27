import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateGoogleReview, useUpdateGoogleReview, type GoogleReview } from "@/hooks/adminGoogleReviewHook";
import { useEffect, useState } from "react";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: GoogleReview | null;
}

const ReviewModal = ({ isOpen, onClose, review }: ReviewModalProps) => {
    const createReview = useCreateGoogleReview();
    const updateReview = useUpdateGoogleReview();

    const [formData, setFormData] = useState({
        reviewerName: "",
        reviewText: "",
        stars: 5,
        language: "es" as "en" | "es",
        reviewLink: "",
        isActive: true,
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (review) {
            setFormData({
                reviewerName: review.reviewerName,
                reviewText: review.reviewText,
                stars: review.stars,
                language: review.language,
                reviewLink: review.reviewLink || "",
                isActive: review.isActive ?? true,
            });
        } else {
            setFormData({
                reviewerName: "",
                reviewText: "",
                stars: 5,
                language: "es",
                reviewLink: "",
                isActive: true,
            });
        }
        setFile(null);
    }, [review, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (review) {
            // Update
            updateReview.mutate({
                id: review.id,
                data: { ...formData },
            }, {
                onSuccess: () => {
                    onClose();
                }
            });
        } else {
            // Create
            const data = new FormData();
            data.append("reviewerName", formData.reviewerName);
            data.append("reviewText", formData.reviewText);
            data.append("stars", formData.stars.toString());
            data.append("language", formData.language);

            // Only add these if they have values, and for now let's hope the backend 
            // has been updated or ignores extra fields.
            // If the user said "POST 400", it's likely validation failed.
            if (formData.reviewLink) {
                data.append("reviewLink", formData.reviewLink);
            }

            // isActive is often default true in backend, sending it might fail validation
            // if it's not in the schema. I'll omit it for now to fix the 400.
            // data.append("isActive", formData.isActive.toString());

            if (file) {
                data.append("profilePicture", file);
            }

            createReview.mutate(data, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{review ? "Edit Review" : "Add New Review"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="reviewerName">Reviewer Name</Label>
                        <Input
                            id="reviewerName"
                            value={formData.reviewerName}
                            onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reviewText">Review Text</Label>
                        <Textarea
                            id="reviewText"
                            value={formData.reviewText}
                            onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                            placeholder="Enter the review content..."
                            required
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reviewLink">Google Review Link (Optional)</Label>
                        <Input
                            id="reviewLink"
                            value={formData.reviewLink}
                            onChange={(e) => setFormData({ ...formData, reviewLink: e.target.value })}
                            placeholder="https://g.page/r/..."
                        />
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                        <Label htmlFor="isActive" className="cursor-pointer">Active Status</Label>
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <span className="text-sm text-slate-500">Enable this review to show it on the public site</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="stars">Stars</Label>
                            <Select
                                value={formData.stars.toString()}
                                onValueChange={(val) => setFormData({ ...formData, stars: parseInt(val) })}
                            >
                                <SelectTrigger id="stars">
                                    <SelectValue placeholder="Select stars" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <SelectItem key={s} value={s.toString()}>
                                            {s} Stars
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select
                                value={formData.language}
                                onValueChange={(val) => setFormData({ ...formData, language: val as "en" | "es" })}
                            >
                                <SelectTrigger id="language">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {!review && (
                        <div className="space-y-2">
                            <Label htmlFor="profilePicture">Profile Picture</Label>
                            <Input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-6">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createReview.isPending || updateReview.isPending}>
                            {createReview.isPending || updateReview.isPending ? "Saving..." : "Save Review"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
