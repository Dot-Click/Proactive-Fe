// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
import { UsegetCoordinator } from "@/hooks/getCoordinatorhook";
// import { Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { TripFormType } from "./tripschema";
import { X, Plus } from "lucide-react";

const Coordinator = () => {
  const { control, setValue, watch } = useFormContext<TripFormType>();
  const coordinatorsValue = watch("coordinators") || [];
  const [, setProfile] = useState("");
  const [show, setShow] = useState(false);
  const hasAutoExpanded = useRef(false);
  const { data } = UsegetCoordinator();

  // Auto-expand coordinator section once when editing with existing coordinator data
  useEffect(() => {
    if (coordinatorsValue.length > 0 && !hasAutoExpanded.current) {
      hasAutoExpanded.current = true;
      setShow(true);
    }
  }, [coordinatorsValue]);

  // Handle adding a coordinator
  const handleAddCoordinator = (coordinatorId: string) => {
    if (!coordinatorsValue.includes(coordinatorId)) {
      const newCoordinators = [...coordinatorsValue, coordinatorId];
      setValue("coordinators", newCoordinators);
    }
  };

  // Handle removing a coordinator
  const handleRemoveCoordinator = (coordinatorId: string) => {
    const newCoordinators = coordinatorsValue.filter(id => id !== coordinatorId);
    setValue("coordinators", newCoordinators);
  };

  // Get coordinator details by ID
  const getCoordinatorById = (id: string) => {
    return data?.coordinators?.find((coord: any) => coord.userId === id);
  };

  // Get available coordinators (not already selected)
  const getAvailableCoordinators = () => {
    return data?.coordinators?.filter((coord: any) =>
      !coordinatorsValue.includes(coord.userId)
    ) || [];
  };

  return (
    <div>
      <div className="grid grid-cols-2 bg-white px-6 py-6">
        <div className="flex flex-col ">
          <span className="text-[#221E33] font-bold">Trip Coordinators</span>
          <span className="text-[#221E33] font-medium text-[14px]">
            Multiple Coordinators Supported
          </span>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => setShow(!show)}
            className="rounded-full bg-[#FD8B3A] px-5 py-5 cursor-pointer hover:bg-[#ff8832] w-auto"
          >
            {show ? "Hide Coordinators" : "Add Coordinators"}
          </Button>
        </div>
      </div>

      <div className="bg-white px-6 py-6">
        {show && (
          <>
            {/* Selected Coordinators Display */}
            {coordinatorsValue.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[#221E33] font-semibold mb-4">Selected Coordinators ({coordinatorsValue.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coordinatorsValue.map((coordinatorId) => {
                    const coordinator = getCoordinatorById(coordinatorId);
                    return (
                      <div key={coordinatorId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <img
                            src={coordinator?.profilePicture || "https://via.placeholder.com/40x40?text=C"}
                            alt={coordinator?.fullName || "Coordinator"}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-[#221E33]">{coordinator?.fullName || "Unknown Coordinator"}</p>
                            <p className="text-sm text-gray-600">{coordinator?.email || ""}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRemoveCoordinator(coordinatorId)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add Coordinator Section */}
            <div className="mt-6">
              <h3 className="text-[#221E33] font-semibold mb-4">Add Coordinator</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name="coordinators"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#242E2F] font-semibold">
                        Select Coordinator
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            handleAddCoordinator(value);
                          }}
                          value=""
                        >
                          <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                            <SelectValue placeholder="Choose a coordinator to add" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableCoordinators().map((coordinator: any) => (
                              <SelectItem
                                key={coordinator.id}
                                value={coordinator.userId}
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={coordinator.profilePicture || "https://via.placeholder.com/24x24?text=C"}
                                    alt={coordinator.fullName}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  {coordinator.fullName}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Coordinator details info */}
              {coordinatorsValue.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Selected Coordinators: {coordinatorsValue.length}</strong>
                  </p>
                  <p className="text-sm text-blue-700">
                    Coordinator details will be automatically populated from their profiles when the trip is created.
                    Each coordinator will be displayed with their photo in the trip details page.
                  </p>
                </div>
              )}

              {coordinatorsValue.length === 0 && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    Please select at least one coordinator for this trip.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Coordinator;
