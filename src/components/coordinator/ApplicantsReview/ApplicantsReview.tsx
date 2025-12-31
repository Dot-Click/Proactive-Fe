import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ReusableTable from "@/Table/ReusableTable"
import type { ColumnDef } from "@tanstack/react-table";
import play from "../../../assets/play.png"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ApplicantsVideo from "./ApplicantsVideo";
import { UsegetallApplication } from "@/hooks/getallApplication";
import { LoaderIcon } from "lucide-react";

type User = {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    tripTitle: string;
    shortIntro: string;
    introVideo: string;
};

// const data: User[] = [
//     { Name: 'Emma Wilson', Trip: 'Wild Weekend Barcelona', Message: 'I love exploring new cultures and meeting like-minded travelers...' },
//     { Name: 'Emma Wilson', Trip: 'Wild Weekend Barcelona', Message: 'I love exploring new cultures and meeting like-minded travelers...' },
//     { Name: 'Emma Wilson', Trip: 'Wild Weekend Barcelona', Message: 'I love exploring new cultures and meeting like-minded travelers...' },
//     { Name: 'Emma Wilson', Trip: 'Wild Weekend Barcelona', Message: 'I love exploring new cultures and meeting like-minded travelers...' },
//     { Name: 'Emma Wilson', Trip: 'Wild Weekend Barcelona', Message: 'I love exploring new cultures and meeting like-minded travelers...' },

// ]

const userData: ColumnDef<User>[] = [
    {
        accessorKey: 'userFirstName',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-6">
                <h1>Name</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>SL</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm text-[#3b3745] text-nowrap">
                            {row.original.userFirstName} {row.original.userLastName}
                        </span>
                        <span className="text-xs text-[#8a8698]">{row.original.userEmail}</span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: 'tripTitle',
        // header: 'Name',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-8">
                <h1>Trip</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 pl-6 w-60">
                    <Button
                        className="bg-[#221E33] text-white hover:bg-[#221E33] cursor-pointer rounded-full
          px-4 py-5 font-semibold"
                    >
                        {row.original.tripTitle}
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: 'shortIntro',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="">
                <h1>Message</h1>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col w-70 whitespace-pre-line">
                    <div className="text-[#666373] text-[14px] w-70">{row.original.shortIntro}</div>
                </div>
            )
        }
    },
    {
        accessorKey: 'Video',
        enableColumnFilter: true,
        enableSorting: true,
        header: () => (
            <div className="pl-4">
                <h1>Video</h1>
            </div>
        ),
        cell: ({ row }) => {
            const video = row.original.introVideo;
            return (
                <div className="w-30">
                    <Dialog>
                        <DialogTrigger>
                            <Button className="bg-[#0DAC87] hover:bg-[#12a180] border border-[#0DAC87] cursor-pointer px-6 h-11 rounded-full text-white font-bold">
                                <img src={play} alt="play" />
                                Play Video
                            </Button>
                        </DialogTrigger>
                        <ApplicantsVideo video={video} />
                    </Dialog>
                </div>
            )
        }
    },
    {
        accessorKey: 'Actions',
        header: () => (
            <div>
                <h1>Actions</h1>
            </div>
        ),
        cell: () => {
            return (
                <div className="flex gap-2">
                    <Button
                        className="rounded-full text-md px-6 py-5 cursor-pointer"
                    >
                        Approve
                    </Button>
                    <Button
                        className="font-bold rounded-full bg-white hover:bg-[#f0ebeb] text-[#9C0000] border border-[#9C0000] text-md px-10 py-5 cursor-pointer"
                    >
                        Reject
                    </Button>
                </div>
            )
        }

    },
]

const ApplicantsReview = () => {
    const { data: applicationdata, isLoading, isError } = UsegetallApplication();

    return (
        <>
            <div className="lg:mt-5">
            {
                isLoading && <div className="w-full flex items-center justify-center py-10">
                    <LoaderIcon className="animate-spin" />
                </div>
            }
            {
                isError && <p className="text-red-500">Error loading data.</p>
            }
                <ReusableTable
                    columns={userData}
                    data={applicationdata ?? []}
                />
            </div>
        </>
    )
}

export default ApplicantsReview