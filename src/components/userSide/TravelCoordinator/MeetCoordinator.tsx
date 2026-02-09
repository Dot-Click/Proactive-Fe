import Coordinatordetailmodal from "@/components/admin/CoordinatorManagement/Coordinatordetailmodal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UsegetCoordinator } from "@/hooks/getCoordinatorhook";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MeetCoordinator = () => {
  const { t } = useTranslation();
  const { data: coordinatorData } = UsegetCoordinator();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="bg-[#FAFAFA] py-20">
      {/* Header */}
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-center bg-linear-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text font-bold text-4xl">
          {t('travelCoordinator.meetCoordinator.title')}
        </h1>
        <p className="text-center text-[#221E33]" dangerouslySetInnerHTML={{ __html: t('travelCoordinator.meetCoordinator.subtitle').replace(/\n/g, '<br />') }} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Coordinators Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 px-4 sm:px-8 lg:px-12 py-12">
          {coordinatorData?.coordinators?.map((item: any, index: number) => (
            <DialogTrigger asChild key={item.id ?? index}>
              <button
                type="button"
                onClick={() => setSelectedId(item.id)}
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#E5E5E5] text-center shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#221E33]/20 focus:ring-offset-2"
              >
                {/* Coordinator Image */}
                <img
                  src={item.profilePicture || "https://github.com/shadcn.png"}
                  alt={item.fullName}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Centered Overlay with Name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
                  <span className="text-lg font-semibold text-white drop-shadow-md text-center px-2">
                    {item.fullName}
                  </span>
                </div>
              </button>
            </DialogTrigger>
          ))}
        </div>

        {/* Coordinator Detail Modal */}
        {selectedId && (
          <Coordinatordetailmodal coordinatorId={selectedId} role="user" />
        )}
      </Dialog>
    </div>
  );
};

export default MeetCoordinator;
