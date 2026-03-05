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

const Coordinator = () => {
  const { control, setValue, watch } = useFormContext<TripFormType>();
  const coordinatorNameValue = watch("CoordinatorName");
  // const coordinatorPhotoValue = watch("CoordinatorPhoto");
  const [, setProfile] = useState("");
  const [show, setShow] = useState(false);
  const hasAutoExpanded = useRef(false);
  const { data } = UsegetCoordinator();

  // Auto-expand coordinator section once when editing with existing coordinator data
  useEffect(() => {
    if (coordinatorNameValue && !hasAutoExpanded.current) {
      hasAutoExpanded.current = true;
      setShow(true);
    }
  }, [coordinatorNameValue]);

  // const HandleuploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setProfile(URL.createObjectURL(file));
  //     setValue("CoordinatorPhoto", file);
  //   } else {
  //     setProfile("");
  //     setValue("CoordinatorPhoto", null);
  //   }
  // };

  // Handle coordinator selection change
  const handleCoordinatorChange = (coordinatorId: string) => {
    const selectedCoordinator = data?.coordinators?.find((coord: any) => coord.userId === coordinatorId);
    
    if (selectedCoordinator) {
      // Auto-populate coordinator details
      setValue("CoordinatorBio", selectedCoordinator.bio || "");
      setValue("CoordinatorPhoto", selectedCoordinator.profilePicture || null);
      setProfile(selectedCoordinator.profilePicture || "");
      
      // Note: Social links are not stored in coordinator profile, so they remain empty
      // They can be filled manually if needed
      setValue("CoordinatorInstagram", "");
      setValue("CoordinatorLinkedin", "");
    }
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
            Add Coordinator
          </Button>
        </div>
      </div>

      <div className="bg-white px-6 py-6">
        {show && (
          <>
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="CoordinatorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#242E2F] font-semibold">
                      Coordinator Name
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleCoordinatorChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-[#FAFAFE] border border-[#EFEFEF] px-4 py-6">
                          <SelectValue placeholder="Select Coordinator" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.coordinators?.map((coordinator: any) => (
                            <SelectItem
                              key={coordinator.id}
                              value={coordinator.userId}
                            >
                              {coordinator.fullName}
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

            {/* Coordinator details are auto-populated when selected */}
            {coordinatorNameValue && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Coordinator details will be automatically populated from their profile.
                </p>
                <div className="text-sm">
                  <strong>Bio:</strong> {watch("CoordinatorBio") || "No bio available"}
                </div>
              </div>
            )}

            <div className="flex justify-start mt-4">
              <Button
                onClick={() => setShow(false)}
                type="button"
                variant={"outline"}
                className="text-[#9C0000] rounded-full px-8 py-4 border border-[#9C0000] cursor-pointer"
              >
                Remove
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Coordinator;
