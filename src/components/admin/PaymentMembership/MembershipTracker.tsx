import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable"
import TableHeader from "@/Table/TableHeader"
import type { ColumnDef } from "@tanstack/react-table";
import { Download, LoaderIcon, FileText } from "lucide-react"
import TotalUsers from "@/assets/sidebaricon/totalusers.png"
import Coordinator from "@/assets/sidebaricon/coordinators.png"
import ActiveTrips from "@/assets/sidebaricon/activetrips.png"
import CloseTrips from "@/assets/sidebaricon/closetrips.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { UsegetPayment } from "@/hooks/getPaymenthook";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import { Badge } from "@/components/ui/badge";

type User = any;

const userData: ColumnDef<User>[] = [
    {
        accessorKey: 'user',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-4">
                <h1>User</h1>
            </div>
        ),
        cell: ({ row }) => {
            const u = row.original.user;
            const displayName = u ? (u.firstName || u.nickName ? `${u.firstName || ''} ${u.lastName || ''}`.trim() : u.email) : 'Unknown';
            const email = u?.email || '';
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center cursor-pointer">
                        <span className="font-semibold text-[14px] text-[#666373]">
                            {displayName}
                        </span>
                        <span className="text-[12px] text-[#666373]">
                            {email}
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'Membership Type',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-">
                <h1>Membership Type</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-center bg-[#FD8B3A] text-white hover:bg-[#FD8B3A] cursor-pointer rounded-full w-20 py-3 font-semibold">
                    {row.original.membershipType || 'N/A'}
                </div>
            )
        }
    },
    {
        accessorKey: 'Start Date',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-3">
                <h1>Start Date</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col justify-center cursor-pointer pl-2">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {row.original.createdAt ? new Date(row.original.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }) : 'N/A'}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'Expiry Date',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div>
                <h1>Expiry Date</h1>
            </div>
        ),
        cell: ({ row }) => {
            const expiryDate = row.original.membershipExpiry;
            const daysLeft = expiryDate ? Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
            return (
                <div className="flex flex-col justify-center cursor-pointer ">
                    <span className="font-semibold text-[14px] text-[#666373]">
                        {expiryDate ? new Date(expiryDate).toLocaleString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }) : 'N/A'}
                    </span>
                    <span className="text-[12px] text-[#666373]">
                        {expiryDate ? `${daysLeft} days left` : 'N/A'}
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
            <div className="pl-6">
                <h1>Status</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <Button
                    className='rounded-full bg-[#35FF62]/10 text-[#077B21] border border-[#077B21] hover:bg-[#35FF62]/20 px-8 py-5'
                >
                    {row.original.status}
                </Button>
            )
        }
    },
    {
        accessorKey: 'Actions',
        enableColumnFilter: true,
        enableSorting: true,
        cell: () => {
            return (
                <div className="flex gap-2">
                    <Button className="cursor-pointer px-6 h-10 rounded-full">View Detail</Button>
                    <Button variant={'outline'} className="cursor-pointer px-7 h-10 rounded-full border border-[#9C0000] text-[#9C0000] font-bold">Cancel</Button>
                </div>
            )
        }
    },
]

const MembershipTracker = () => {
    const { data: MembershipData, isLoading, isError } = UsegetPayment();
    const membershipPaymentsData = MembershipData?.membershipPayments?.payments;
    const membershipPaymentsStats = MembershipData?.membershipPayments?.keyStates;
    const [columnsMenu, setColumnsMenu] = useState<{ items: { id: string; label?: string; checked: boolean }[], toggle: (id: string, v: boolean) => void } | null>(null);
    const [pageSize, setPageSize] = useState<number>(10);
    const [exportLoading, setExportLoading] = useState(false);
    const [exportType, setExportType] = useState<'pdf' | 'csv' | null>(null);

    const stats = [
        {
            id: 1,
            name: 'Total Active Memberships',
            value: isLoading ? 'Loading...' : membershipPaymentsStats?.totalActiveMemberships,
            icon: TotalUsers,
            change: '+5%',
        },
        {
            id: 2,
            name: 'Expiring Soon',
            value: isLoading ? 'Loading...' : membershipPaymentsStats?.expiringSoon,
            icon: Coordinator,
            change: '+10%'
        },
        {
            id: 3,
            name: 'Average Duration',
            value: isLoading ? 'Loading...' : membershipPaymentsStats?.averageDuration,
            icon: ActiveTrips,
            change: '+8%'
        },
        {
            id: 4,
            name: 'Monthly Renewals',
            value: isLoading ? 'Loading...' : membershipPaymentsStats?.monthlyRenewals,
            icon: CloseTrips,
            change: '-12%'
        }
    ];

    // Function to export membership data to PDF
    const handleExportToPDF = () => {
        if (!membershipPaymentsData?.length) {
            alert("No membership data to export");
            return;
        }

        setExportLoading(true);
        setExportType('pdf');

        try {
            const doc = new jsPDF("landscape", "pt", "a4");
            
            // Add title
            doc.setFontSize(20);
            doc.setTextColor(34, 30, 51); // #221E33 color
            doc.text("Membership Report", doc.internal.pageSize.width / 2, 40, {
                align: "center",
            });

            // Add export info
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(
                `Exported: ${new Date().toLocaleDateString()} | Total Memberships: ${membershipPaymentsData.length}`,
                doc.internal.pageSize.width / 2,
                60,
                { align: "center" }
            );

            // Add summary stats
            doc.setFontSize(12);
            doc.setTextColor(34, 30, 51);
            doc.text("Summary Statistics", 20, 90);
            
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            stats.forEach((stat, index) => {
                const yPos = 110 + (index * 20);
                doc.text(`${stat.name}: ${stat.value}`, 20, yPos);
            });

            // Prepare table data
            const tableData = membershipPaymentsData.map(
                (member: any, index: number) => {
                    const user = member.user;
                    const displayName = user
                        ? user.firstName || user.nickName
                            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                            : user.email
                        : "Unknown";
                    const email = user?.email || "";
                    const membershipType = member.membershipType || "N/A";
                    const startDate = member.createdAt
                        ? new Date(member.createdAt).toLocaleDateString()
                        : "N/A";
                    const expiryDate = member.membershipExpiry
                        ? new Date(member.membershipExpiry).toLocaleDateString()
                        : "N/A";
                    const daysLeft = member.membershipExpiry ? 
                        Math.ceil((new Date(member.membershipExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
                    const status = member.status || "N/A";

                    return [
                        (index + 1).toString(),
                        displayName,
                        email,
                        membershipType,
                        startDate,
                        expiryDate,
                        `${daysLeft} days left`,
                        status,
                    ];
                }
            );

            // Define table columns
            const tableColumns = [
                "#",
                "User Name",
                "Email",
                "Membership Type",
                "Start Date",
                "Expiry Date",
                "Days Left",
                "Status",
            ];

            // Add autoTable
            autoTable(doc, {
                head: [tableColumns],
                body: tableData,
                startY: 200,
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
                    fillColor: [246, 246, 255], // #F6F6FF color
                },
                margin: { left: 20, right: 20 },
                styles: {
                    overflow: "linebreak",
                    cellPadding: 5,
                },
                columnStyles: {
                    3: { fillColor: [253, 139, 58] } // #FD8B3A color for membership type column
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
            doc.save(`membership-report-${new Date().toISOString().slice(0, 10)}.pdf`);
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
        if (!membershipPaymentsData?.length) {
            alert("No membership data to export");
            return;
        }

        setExportLoading(true);
        setExportType('csv');

        try {
            const headers = [
                "User Name",
                "Email",
                "Membership Type",
                "Start Date",
                "Expiry Date",
                "Days Left",
                "Status",
                "Created At"
            ];

            const csvData = membershipPaymentsData.map((member: any) => {
                const user = member.user;
                const displayName = user
                    ? user.firstName || user.nickName
                        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                        : user.email
                    : "Unknown";
                const expiryDate = member.membershipExpiry;
                const daysLeft = expiryDate ? 
                    Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
                
                return [
                    `"${displayName}"`,
                    `"${user?.email || ""}"`,
                    `"${member.membershipType || "N/A"}"`,
                    member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "N/A",
                    expiryDate ? new Date(expiryDate).toLocaleDateString() : "N/A",
                    daysLeft,
                    `"${member.status || "N/A"}"`,
                    member.createdAt ? new Date(member.createdAt).toISOString() : ""
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
            link.setAttribute("download", `membership-data-${new Date().toISOString().slice(0, 10)}.csv`);
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

    if (isError) {
        return <div>Error loading membership data.</div>;
    }
    
    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center py-10">
                <LoaderIcon className="animate-spin" />
            </div>
        )
    }
    
    return (
        <div>
            <div className="px-6 py-4 bg-white rounded-[20px] mt-3">
                <h1 className="text-[#221E33] mb-4">Key States</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-2 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.id}>
                            <div className="cursor-pointer flex flex-col justify-center py-5 px-5 bg-[#F6F6FF] rounded-[20px] hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-[12px]">{stat.name}</p>
                                    <div className="bg-black p-2 rounded-full flex items-center justify-center shrink-0">
                                        <img src={stat.icon} alt={stat.name} className="w-5 h-5 object-contain" />
                                    </div>
                                </div>

                                <p className="text-[30px] font-bold bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Export Buttons */}
            <div className="flex justify-end gap-2 mb-3 mt-4">
                <Button
                    onClick={handleExportToPDF}
                    disabled={exportLoading || !membershipPaymentsData?.length}
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
                    disabled={exportLoading || !membershipPaymentsData?.length}
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
                searchPlaceholder="Search Membership"
                showColumns
                columnsMenuItems={columnsMenu?.items ?? []}
                onColumnMenuToggle={(id, v) => columnsMenu?.toggle(id, v)}
                defaultLimit={pageSize}
                limitOptions={[5, 10, 20, 30, 50]}
                onLimitChange={(limit) => setPageSize(limit)}
            />
            <div className="bg-white rounded-[25px] mt-3">
                <ReusableTable 
                    data={membershipPaymentsData ?? []} 
                    columns={userData} 
                    onExposeColumns={(payload) => setColumnsMenu(payload)}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </div>
        </div>
    )
}

export default MembershipTracker