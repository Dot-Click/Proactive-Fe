import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable";
import TableHeader from "@/Table/TableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2, Pencil, Trash2, Globe } from "lucide-react";
import { useState, useMemo } from "react";
import { useAdminGoogleReviews, useDeleteGoogleReview, type GoogleReview } from "@/hooks/adminGoogleReviewHook";
import ReviewModal from "./ReviewModal";

const GoogleReviews = () => {
    const { data: reviews, isLoading, isError } = useAdminGoogleReviews();
    const { mutate: deleteReview } = useDeleteGoogleReview();
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<GoogleReview | null>(null);
    const [langFilter, setLangFilter] = useState<"all" | "en" | "es">("all");

    const columns: ColumnDef<GoogleReview>[] = [
        {
            accessorKey: "reviewerName",
            header: "Reviewer",
            cell: ({ row }) => {
                const name = String(row.original.reviewerName || "Unknown");
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-100">
                            <AvatarImage src={row.original.profilePicture} alt={name} />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-slate-800">{name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "reviewText",
            header: "Review",
            cell: ({ row }) => (
                <p className="max-w-md truncate text-slate-500 italic text-sm">
                    "{String(row.original.reviewText || "")}"
                </p>
            ),
        },
        {
            accessorKey: "stars",
            header: "Stars",
            cell: ({ row }) => (
                <span className="font-bold text-[#34AB7F] flex items-center gap-1">
                    {Number(row.original.stars || 0)} <span className="text-yellow-400">★</span>
                </span>
            ),
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => (
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block border ${row.original.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-400 border-slate-200"
                    }`}>
                    {row.original.isActive ? "ACTIVE" : "INACTIVE"}
                </div>
            ),
        },
        {
            accessorKey: "reviewLink",
            header: "Link",
            cell: ({ row }) => row.original.reviewLink ? (
                <a
                    href={String(row.original.reviewLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-medium hover:underline block truncate max-w-[100px]"
                >
                    Link
                </a>
            ) : <span className="text-slate-400 text-xs">-</span>,
        },
        {
            accessorKey: "language",
            header: "Lang",
            cell: ({ row }) => (
                <span className="uppercase font-bold px-2 py-0.5 rounded bg-slate-50 text-[10px] text-slate-500 border border-slate-200">
                    {String(row.original.language || "es")}
                </span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-[#34AB7F]"
                        onClick={() => {
                            setEditingReview(row.original);
                            setIsModalOpen(true);
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this review?")) {
                                deleteReview(row.original.id);
                            }
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const filteredReviews = useMemo(() => {
        if (!reviews || !Array.isArray(reviews)) return [];
        if (langFilter === "all") return reviews;
        return reviews.filter(r => r && r.language === langFilter);
    }, [reviews, langFilter]);

    const hasTotalReviews = reviews && Array.isArray(reviews) && reviews.length > 0;

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="p-4 md:p-6 min-h-screen bg-slate-50/30">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Google Reviews</h1>
                <p className="text-slate-500 text-sm">Manage reviews displayed in the landing page marquee.</p>
            </div>

            <div className="space-y-4">
                <TableHeader
                    showSearch={false}
                    showAddButton={true}
                    addButtonLabel="Add Review"
                    onAddClick={() => {
                        setEditingReview(null);
                        setIsModalOpen(true);
                    }}
                    defaultLimit={pageSize}
                    onLimitChange={(limit) => setPageSize(limit)}
                    showFilter={true}
                    onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
                />

                {isFilterOpen && (
                    <div className="flex items-center justify-end animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            <Globe className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Displaying:</span>
                            <select
                                value={langFilter}
                                onChange={(e) => setLangFilter(e.target.value as any)}
                                className="text-xs font-bold bg-transparent border-none focus:ring-0 cursor-pointer outline-none text-slate-800"
                            >
                                <option value="all">Every Language</option>
                                <option value="en">English (EN)</option>
                                <option value="es">Spanish (ES)</option>
                            </select>
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex h-64 items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200">
                        <Loader2 className="h-8 w-8 animate-spin text-[#34AB7F]" />
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-red-50/50 rounded-2xl border border-red-100">
                        <p className="text-red-500 font-semibold mb-2">Error loading reviews</p>
                        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                ) : !hasTotalReviews ? (
                    <div className="flex flex-col items-center justify-center h-80 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <Trash2 className="h-10 w-10 text-slate-200" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No reviews found</h3>
                        <p className="text-slate-500 max-w-sm mt-2 mb-6">
                            You haven't added any Google Reviews yet. Start by adding your first customer testimonial.
                        </p>
                        <Button
                            onClick={() => {
                                setEditingReview(null);
                                setIsModalOpen(true);
                            }}
                            className="rounded-full px-8 bg-[#34AB7F] hover:bg-[#2c8e68]"
                        >
                            Add First Review
                        </Button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <ReusableTable
                            columns={columns}
                            data={filteredReviews}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                        />
                        {filteredReviews.length === 0 && (
                            <div className="p-16 text-center bg-slate-50/50">
                                <Globe className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No reviews found for the selected language.</p>
                                <button
                                    onClick={() => setLangFilter("all")}
                                    className="text-[#34AB7F] text-sm mt-2 font-bold hover:underline"
                                >
                                    Show all reviews
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                review={editingReview}
            />
        </div>
    );
};

export default GoogleReviews;
