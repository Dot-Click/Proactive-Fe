import { Button } from "@/components/ui/button";
import { Plus, Check, X } from "lucide-react";
import included1 from "../../../assets/included1.png";
import included2 from "../../../assets/included2.png";
import included3 from "../../../assets/included3.png";
import included4 from "../../../assets/included4.png";
import included5 from "../../../assets/included5.png";
import { Controller, useFormContext } from "react-hook-form";
import { FormMessage } from "@/components/ui/form";
import clsx from "clsx";
import { useState, useEffect } from "react";
import type { TripFormType } from "./tripschema";



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
  icon?: string;
  title: string;
  desc: string;
}) => (
  <div
    onClick={onClick}
    className={clsx(
      "relative cursor-pointer rounded-[15px] border px-2 py-4 transition-all ",
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
      {icon && <img src={icon} alt={title} className="w-10 h-8" />}
      <h4 className="font-semibold">{title}</h4>
      <span className="text-[#606066] text-[11px]">{desc}</span>
    </div>
  </div>
);

const Included = () => {
  const [ShowIncludedItems] = useState<boolean>(true);
  const [ShownotIncludedItems] = useState<boolean>(true);
  const { control } = useFormContext<TripFormType>();

  // Persistent custom items stored in localStorage
  const [customIncluded, setCustomIncluded] = useState<{ id: string; title: string; desc: string; icon: string }[]>([]);
  const [customNotIncluded, setCustomNotIncluded] = useState<{ id: string; title: string; desc: string; icon: string }[]>([]);

  // Add item dialog states
  const [showAddIncludedDialog, setShowAddIncludedDialog] = useState(false);
  const [showAddNotIncludedDialog, setShowAddNotIncludedDialog] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  // icon file/preview for the custom item being created
  const [, setNewItemIconFile] = useState<File | null>(null);
  const [newItemIconPreview, setNewItemIconPreview] = useState("");

  // Load custom items from localStorage on mount
  useEffect(() => {
    const savedIncluded = localStorage.getItem("customIncludedItems");
    const savedNotIncluded = localStorage.getItem("customNotIncludedItems");

    if (savedIncluded) {
      try {
        setCustomIncluded(JSON.parse(savedIncluded));
      } catch (e) {
        console.error("Error loading custom included items:", e);
      }
    }

    if (savedNotIncluded) {
      try {
        setCustomNotIncluded(JSON.parse(savedNotIncluded));
      } catch (e) {
        console.error("Error loading custom not included items:", e);
      }
    }
  }, []);

  // Save custom items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("customIncludedItems", JSON.stringify(customIncluded));
  }, [customIncluded]);

  useEffect(() => {
    localStorage.setItem("customNotIncludedItems", JSON.stringify(customNotIncluded));
  }, [customNotIncluded]);

  const addCustomItem = (forIncluded: boolean) => {
    // clear previous dialog state
    setNewItemName("");
    setNewItemIconFile(null);
    setNewItemIconPreview("");
    if (forIncluded) {
      setShowAddIncludedDialog(true);
    } else {
      setShowAddNotIncludedDialog(true);
    }
  };

  const confirmAddItem = (forIncluded: boolean) => {
    if (!newItemName.trim()) return;

    const id = `custom-${Date.now()}`;
    const newItem = {
      id,
      title: newItemName.trim(),
      desc: "",
      icon: newItemIconPreview || "",
    };

    if (forIncluded) {
      setCustomIncluded((prev) => [...prev, newItem]);
      setShowAddIncludedDialog(false);
    } else {
      setCustomNotIncluded((prev) => [...prev, newItem]);
      setShowAddNotIncludedDialog(false);
    }

    // reset fields
    setNewItemName("");
    setNewItemIconFile(null);
    setNewItemIconPreview("");
  };

  const removeCustomItem = (id: string, forIncluded: boolean) => {
    if (forIncluded) {
      setCustomIncluded((prev) => prev.filter(item => item.id !== id));
    } else {
      setCustomNotIncluded((prev) => prev.filter(item => item.id !== id));
    }
  };

  return (
    <form className="">
      <div className="bg-white px-6 py-6">
        <div className="flex justify-between items-center mt-6 mb-6">
          <span className="text-[#108700] font-medium">What’s Included</span>
          <Button
            type="button"
            className="text-[#666373] rounded-full border border-[#666373] w-30 py-5 cursor-pointer"
            variant="outline"
            onClick={() => addCustomItem(true)}
          >
            <Plus /> Add Item
          </Button>
        </div>

        {/* Add Item Dialog for Included */}
        {showAddIncludedDialog && (
          <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex flex-col gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter item name..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#108700]"
                onKeyPress={(e) => e.key === 'Enter' && confirmAddItem(true)}
              />
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) {
                      setNewItemIconFile(null);
                      setNewItemIconPreview("");
                      return;
                    }
                    setNewItemIconFile(file);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setNewItemIconPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                {newItemIconPreview && (
                  <img
                    src={newItemIconPreview}
                    alt="icon preview"
                    className="h-10 w-10 object-contain rounded"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => confirmAddItem(true)}
                  className="bg-[#108700] hover:bg-[#0a5d00] text-white px-4 py-2 rounded-md"
                >
                  Add
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddIncludedDialog(false);
                    setNewItemName("");
                    setNewItemIconFile(null);
                    setNewItemIconPreview("");
                  }}
                  variant="outline"
                  className="px-4 py-2"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {
          ShowIncludedItems && (
            <Controller
              name="included"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    {INCLUDED_ITEMS.map((item) => (
                      <SelectCard
                        key={item.id}
                        selected={field.value.some((v: any) => (typeof v === "string" ? v : v.id) === item.id)}
                        onClick={() => {
                          const isSelected = field.value.some((v: any) => (typeof v === "string" ? v : v.id) === item.id);
                          field.onChange(
                            isSelected
                              ? field.value.filter((v: any) => (typeof v === "string" ? v : v.id) !== item.id)
                              : [...field.value, item.id]
                          )
                        }}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                      />
                    ))}
                    {customIncluded.map((item) => (
                      <div key={item.id} className="relative">
                        <SelectCard
                          selected={field.value.some((v: any) => (typeof v === "string" ? v === item.title : (v.id === item.id || v.title === item.title)))}
                          onClick={() => {
                            const isSelected = field.value.some((v: any) => (typeof v === "string" ? v === item.title : (v.id === item.id || v.title === item.title)));
                            field.onChange(
                              isSelected
                                ? field.value.filter((v: any) => (typeof v === "string" ? v !== item.title : (v.id !== item.id && v.title !== item.title)))
                                : [...field.value, { id: item.id, title: item.title, description: item.desc, icon: item.icon }]
                            )
                          }}
                          icon={item.icon}
                          title={item.title}
                          desc={item.desc}
                        />
                        <button
                          type="button"
                          onClick={() => removeCustomItem(item.id, true)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {fieldState.error && (
                    <FormMessage className="mt-2">{fieldState.error.message}</FormMessage>
                  )}
                </div>
              )}
            />
          )
        }
      </div>

      <div className="bg-white px-6 py-6">
        <div className="flex justify-between items-center mt-6 mb-6">
          <span className="text-[#D40004] font-medium">What’s Not Included</span>
          <Button
            type="button"
            className="text-[#666373] rounded-full border border-[#666373] w-30 py-5 cursor-pointer"
            variant="outline"
            onClick={() => addCustomItem(false)}
          >
            <Plus /> Add Item
          </Button>
        </div>

        {/* Add Item Dialog for Not Included */}
        {showAddNotIncludedDialog && (
          <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex flex-col gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter item name..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D40004]"
                onKeyPress={(e) => e.key === 'Enter' && confirmAddItem(false)}
              />
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) {
                      setNewItemIconFile(null);
                      setNewItemIconPreview("");
                      return;
                    }
                    setNewItemIconFile(file);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setNewItemIconPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                {newItemIconPreview && (
                  <img
                    src={newItemIconPreview}
                    alt="icon preview"
                    className="h-10 w-10 object-contain rounded"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => confirmAddItem(false)}
                  className="bg-[#D40004] hover:bg-[#b30003] text-white px-4 py-2 rounded-md"
                >
                  Add
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddNotIncludedDialog(false);
                    setNewItemName("");
                    setNewItemIconFile(null);
                    setNewItemIconPreview("");
                  }}
                  variant="outline"
                  className="px-4 py-2"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {
          ShownotIncludedItems && (
            <Controller
              name="notIncluded"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    {NOT_INCLUDED_ITEMS.map((item) => (
                      <SelectCard
                        key={item.id}
                        selected={field.value.some((v: any) => (typeof v === "string" ? v : v.id) === item.id)}
                        onClick={() => {
                          const isSelected = field.value.some((v: any) => (typeof v === "string" ? v : v.id) === item.id);
                          field.onChange(
                            isSelected
                              ? field.value.filter((v: any) => (typeof v === "string" ? v : v.id) !== item.id)
                              : [...field.value, item.id]
                          )
                        }}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                      />
                    ))}
                    {customNotIncluded.map((item) => (
                      <div key={item.id} className="relative">
                        <SelectCard
                          selected={field.value.some((v: any) => (typeof v === "string" ? v === item.title : (v.id === item.id || v.title === item.title)))}
                          onClick={() => {
                            const isSelected = field.value.some((v: any) => (typeof v === "string" ? v === item.title : (v.id === item.id || v.title === item.title)));
                            field.onChange(
                              isSelected
                                ? field.value.filter((v: any) => (typeof v === "string" ? v !== item.title : (v.id !== item.id && v.title !== item.title)))
                                : [...field.value, { id: item.id, title: item.title, description: item.desc, icon: item.icon }]
                            )
                          }}
                          icon={item.icon}
                          title={item.title}
                          desc={item.desc}
                        />
                        <button
                          type="button"
                          onClick={() => removeCustomItem(item.id, false)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {fieldState.error && (
                    <FormMessage className="mt-2">{fieldState.error.message}</FormMessage>
                  )}
                </div>
              )}
            />
          )}
      </div>

    </form>
  );
};

export default Included;
