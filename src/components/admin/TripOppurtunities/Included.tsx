import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import included1 from "../../../assets/included1.png";
import included2 from "../../../assets/included2.png";
import included3 from "../../../assets/included3.png";
import included4 from "../../../assets/included4.png";
import included5 from "../../../assets/included5.png";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";

const formSchemaIncluded = z.object({
  included: z.array(z.string()).min(1, "Select at least one included item"),
  notIncluded: z
    .array(z.string())
    .min(1, "Select at least one not included item"),
});

type FormSchemaType = z.infer<typeof formSchemaIncluded>;

const INCLUDED_ITEMS = [
  {
    id: "camp",
    title: "3 Nights Camp Stay",
    desc: "Boutique camp accommodation with cozy shared spaces.",
    icon: included1,
  },
  {
    id: "breakfast",
    title: "Daily Breakfasts",
    desc: "Fresh and healthy breakfasts included throughout the trip",
    icon: included2,
  },
  {
    id: "transfer",
    title: "Airport Transfers",
    desc: "Arrival & departure transfers for a smooth start & end.",
    icon: included3,
  },
  {
    id: "coordinator",
    title: "Trip Coordinator",
    desc: "Professional English-speaking coordinator for full guidance.",
    icon: included4,
  },
  {
    id: "tour",
    title: "Sagrada Familia Tour",
    desc: "Skip-the-line entry with guided experience.",
    icon: included5,
  },
];

const NOT_INCLUDED_ITEMS = [
  {
    id: "flight",
    title: "International Flights",
    desc: "Flights to/from Barcelona not covered.",
    icon: included1,
  },
  {
    id: "insurance",
    title: "Travel Insurance",
    desc: "Personal insurance must be arranged separately.",
    icon: included2,
  },
  {
    id: "shopping",
    title: "Shopping & Souvenirs",
    desc: "Personal purchases not included.",
    icon: included3,
  },
];

const SelectCard = ({
  selected,
  onClick,
  icon,
  title,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  desc: string;
}) => (
  <div
    onClick={onClick}
    className={clsx(
      "relative cursor-pointer rounded-[15px] border px-2 py-4 transition-all",
      selected
        ? "border-[#108700] ring-2 ring-[#108700]/20 bg-[#F5FFF5]"
        : "border-[#C1C1C1] bg-white"
    )}
  >
    {selected && (
      <span className="absolute top-2 right-2 rounded-full bg-[#108700] p-1 text-white">
        <Check size={14} />
      </span>
    )}
    <div className="flex flex-col gap-4 py-4 justify-center items-center text-center">
      <img src={icon} alt={title} className="w-10 h-8" />
      <h4 className="font-semibold">{title}</h4>
      <span className="text-[#606066] text-[11px]">{desc}</span>
    </div>
  </div>
);

const Included = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchemaIncluded),
    defaultValues: {
      included: [],
      notIncluded: [],
    },
  });

  const toggleValue = (
    values: string[],
    value: string,
    onChange: (v: string[]) => void
  ) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };
  const [ShowIncludedItems, setShowIncludedItems] = useState<boolean>(true);
  const [ShownotIncludedItems, setShowNotIncludedItems] = useState<boolean>(true);

  return (
    <form className="mb-20 space-y-8">
      <div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-[#108700] font-medium">What’s Included</span>
          <Button
            type="button"
            className="text-[#666373] rounded-full border border-[#666373] w-30 py-5 cursor-pointer"
            variant="outline"
            onClick={() => setShowIncludedItems(!ShowIncludedItems)}
          >
            <Plus /> Add Item
          </Button>
        </div>
        {
          ShowIncludedItems && (
            <Controller
              control={form.control}
              name="included"
              render={({ field, fieldState }) => (
                <>
                  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 py-4">
                    {INCLUDED_ITEMS.map((item) => (
                      <SelectCard
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                        selected={field.value.includes(item.id)}
                        onClick={() =>
                          toggleValue(field.value, item.id, field.onChange)
                        }
                      />
                    ))}
                  </div>
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          )
        }
      </div>

      <div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-[#D40004] font-medium">What’s Not Included</span>
          <Button
            type="button"
            className="text-[#666373] rounded-full border border-[#666373] w-30 py-5 cursor-pointer"
            variant="outline"
            onClick={() => setShowNotIncludedItems(!ShownotIncludedItems)}
          >
            <Plus /> Add Item
          </Button>
        </div>
        {
          ShownotIncludedItems && (
            <Controller
              control={form.control}
              name="notIncluded"
              render={({ field, fieldState }) => (
                <>
                  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 py-4">
                    {NOT_INCLUDED_ITEMS.map((item) => (
                      <SelectCard
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                        selected={field.value.includes(item.id)}
                        onClick={() =>
                          toggleValue(field.value, item.id, field.onChange)
                        }
                      />
                    ))}
                  </div>
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          )}
      </div>

    </form>
  );
};

export default Included;
