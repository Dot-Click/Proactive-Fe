import { Button } from "@/components/ui/button";
import { Plus, Check, X, Upload } from "lucide-react";
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
    title: "Accommodation",
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
  onIconChange,
  onDescChange,
  isCustom,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: string;
  title: string;
  desc: string;
  onIconChange?: (file: File) => void;
  onDescChange?: (newDesc: string) => void;
  isCustom?: boolean;
}) => (
  <div
    onClick={onClick}
    className={clsx(
      "relative rounded-[24px] border-2 transition-all flex flex-col items-center min-h-[280px] overflow-hidden group cursor-pointer",
      selected
        ? "border-[#108700] bg-[#F5FFF5] shadow-lg scale-[1.02]"
        : "border-[#ECECF1] bg-white hover:border-[#D1D1D6]"
    )}
  >
    {/* Active Header Color */}
    {selected && (
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#108700]" />
    )}

    {selected && (
      <div className="absolute top-3 right-3 rounded-full bg-[#108700] p-1.5 text-white z-10 shadow-sm animate-in zoom-in-50 duration-300">
        <Check size={14} strokeWidth={3} />
      </div>
    )}

    <div className="flex flex-col gap-4 pt-8 pb-4 justify-center items-center text-center relative z-10 w-full px-4">
      <div className="w-16 h-12 flex items-center justify-center mb-1">
        {icon ? (
            <img src={icon} alt={title} className="max-w-full max-h-full object-contain" />
        ) : (
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center opacity-20">
                <Plus size={24} />
            </div>
        )}
      </div>
      <h4 className={clsx("font-bold text-sm tracking-tight font-quicksand", selected ? "text-[#108700]" : "text-[#221E33]")}>{title}</h4>
      
      {selected ? (
        <textarea
          value={desc}
          onChange={(e) => onDescChange?.(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="w-full text-[12px] p-3 rounded-xl border border-[#108700]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#108700]/20 font-quicksand resize-none h-24 text-[#606066] leading-relaxed mb-2"
          placeholder="Enter item description..."
        />
      ) : (
        <span className="text-[#646464] text-[11px] leading-relaxed font-quicksand px-2 h-14 overflow-hidden line-clamp-3">
          {desc}
        </span>
      )}
    </div>

    {selected && (
      <div className="relative z-20 mt-auto pb-4 w-full flex justify-center gap-2">
           <input
            type="file"
            id={`icon-upload-${title.replace(/\s+/g, "-")}`}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onIconChange) onIconChange(file);
            }}
            />
            <label
            htmlFor={`icon-upload-${title.replace(/\s+/g, "-")}`}
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer bg-white/80 backdrop-blur-sm border border-[#108700] text-[#108700] text-[10px] px-4 py-1.5 rounded-full hover:bg-[#108700] hover:text-white transition-all flex items-center gap-1.5 font-bold uppercase tracking-wider shadow-sm"
            >
            <Upload size={10} strokeWidth={3} /> Icon
            </label>
      </div>
    )}
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
                <div className="relative">
                  <input
                    type="file"
                    id="new-included-icon-upload"
                    className="hidden"
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
                  <label
                    htmlFor="new-included-icon-upload"
                    className="cursor-pointer bg-white border border-[#108700] text-[#108700] text-sm px-4 py-2 rounded-md hover:bg-[#108700] hover:text-white transition-colors flex items-center gap-2 font-medium shadow-sm"
                  >
                    <Upload size={16} /> Choose Image
                  </label>
                </div>
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
              render={({ field, fieldState }) => {
                const values = Array.isArray(field.value) ? field.value : [];
                const hasNone = values.some((v: any) => (typeof v === "string" ? v : v.id) === "none");
                
                return (
                  <div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* None Option */}
                      <SelectCard
                        selected={hasNone}
                        onClick={() => {
                          if (hasNone) {
                            field.onChange([]);
                          } else {
                            field.onChange([{ id: "none", title: "None", description: "No items included.", icon: "" }]);
                          }
                        }}
                        title="None"
                        desc="Select this if nothing is included."
                      />

                      {INCLUDED_ITEMS.map((item) => {
                        const existingIdx = values.findIndex((v: any) =>
                          (typeof v === "string" ? v : v.id) === item.id
                        );
                        const isSelected = existingIdx !== -1;
                        const existing = isSelected ? values[existingIdx] : null;
                        const displayIcon = (existing && typeof existing === 'object' && existing.icon) || item.icon;
                        const displayDesc = (existing && typeof existing === 'object' && existing.description) || (existing && typeof existing === 'object' && existing.desc) || item.desc;

                        return (
                          <div key={item.id} className={clsx(hasNone && "opacity-40 pointer-events-none")}>
                            <SelectCard
                              selected={isSelected}
                              onClick={() => {
                                if (isSelected) {
                                  field.onChange(values.filter((v: any) => (typeof v === "string" ? v : v.id) !== item.id));
                                } else {
                                  field.onChange([...values, { id: item.id, title: item.title, description: item.desc, icon: item.icon }]);
                                }
                              }}
                              onDescChange={(newDesc) => {
                                const newValues = [...values];
                                newValues[existingIdx] = { ...(typeof existing === 'string' ? { id: existing } : existing), description: newDesc };
                                field.onChange(newValues);
                              }}
                              icon={displayIcon}
                              title={item.title}
                              desc={displayDesc}
                              onIconChange={(file) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const newValues = values.map((v: any) => {
                                    if ((typeof v === "string" ? v : v.id) === item.id) {
                                      return { ...item, description: displayDesc, icon: reader.result, iconFile: file };
                                    }
                                    return v;
                                  });
                                  field.onChange(newValues);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </div>
                        );
                      })}
                      {customIncluded.map((item) => {
                        const existingIdx = values.findIndex((v: any) =>
                          (v.id === item.id || v.title === item.title)
                        );
                        const isSelected = existingIdx !== -1;
                        const existing = isSelected ? values[existingIdx] : null;
                        const displayIcon = (existing && existing.icon) || item.icon;
                        const displayDesc = (existing && (existing.description || existing.desc)) || item.desc;

                        return (
                          <div key={item.id} className={clsx("relative group", hasNone && "opacity-40 pointer-events-none")}>
                            <SelectCard
                              selected={isSelected}
                              isCustom={true}
                              onClick={() => {
                                if (isSelected) {
                                  field.onChange(values.filter((v: any) => (v.id !== item.id && v.title !== item.title)));
                                } else {
                                  field.onChange([...values, { id: item.id, title: item.title, description: item.desc, icon: item.icon }]);
                                }
                              }}
                              onDescChange={(newDesc) => {
                                const newValues = [...values];
                                newValues[existingIdx] = { ...existing, description: newDesc };
                                field.onChange(newValues);
                              }}
                              icon={displayIcon}
                              title={item.title}
                              desc={displayDesc}
                              onIconChange={(file) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const newValues = values.map((v: any) => {
                                    if (v.id === item.id || v.title === item.title) {
                                      return { ...v, icon: reader.result, iconFile: file };
                                    }
                                    return v;
                                  });
                                  field.onChange(newValues);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeCustomItem(item.id, true)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors z-30 shadow-md opacity-0 group-hover:opacity-100"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    {fieldState.error && (
                      <FormMessage className="mt-2">{fieldState.error.message}</FormMessage>
                    )}
                  </div>
                );
              }}
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
                <div className="relative">
                  <input
                    type="file"
                    id="new-not-included-icon-upload"
                    className="hidden"
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
                  <label
                    htmlFor="new-not-included-icon-upload"
                    className="cursor-pointer bg-white border border-[#D40004] text-[#D40004] text-sm px-4 py-2 rounded-md hover:bg-[#D40004] hover:text-white transition-colors flex items-center gap-2 font-medium shadow-sm"
                  >
                    <Upload size={16} /> Choose Image
                  </label>
                </div>
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
              render={({ field, fieldState }) => {
                const values = Array.isArray(field.value) ? field.value : [];
                const hasNone = values.some((v: any) => (typeof v === "string" ? v : v.id) === "none");

                return (
                  <div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* None Option */}
                      <SelectCard
                        selected={hasNone}
                        onClick={() => {
                          if (hasNone) {
                            field.onChange([]);
                          } else {
                            field.onChange([{ id: "none", title: "None", description: "No items listed here.", icon: "" }]);
                          }
                        }}
                        title="None"
                        desc="Select this if no items category is empty."
                      />

                      {NOT_INCLUDED_ITEMS.map((item) => {
                        const existingIdx = values.findIndex((v: any) =>
                          (typeof v === "string" ? v : v.id) === item.id
                        );
                        const isSelected = existingIdx !== -1;
                        const existing = isSelected ? values[existingIdx] : null;
                        const displayIcon = (existing && typeof existing === 'object' && existing.icon) || item.icon;
                        const displayDesc = (existing && (existing.description || existing.desc)) || item.desc;

                        return (
                          <div key={item.id} className={clsx(hasNone && "opacity-40 pointer-events-none")}>
                            <SelectCard
                              selected={isSelected}
                              onClick={() => {
                                if (isSelected) {
                                  field.onChange(values.filter((v: any) => (typeof v === "string" ? v : v.id) !== item.id));
                                } else {
                                  field.onChange([...values, { id: item.id, title: item.title, description: item.desc, icon: item.icon }]);
                                }
                              }}
                              onDescChange={(newDesc) => {
                                const newValues = [...values];
                                newValues[existingIdx] = { ...(typeof existing === 'string' ? { id: existing } : existing), description: newDesc };
                                field.onChange(newValues);
                              }}
                              icon={displayIcon}
                              title={item.title}
                              desc={displayDesc}
                              onIconChange={(file) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const newValues = values.map((v: any) => {
                                    if ((typeof v === "string" ? v : v.id) === item.id) {
                                      return { ...item, description: displayDesc, icon: reader.result, iconFile: file };
                                    }
                                    return v;
                                  });
                                  field.onChange(newValues);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </div>
                        );
                      })}
                      {customNotIncluded.map((item) => {
                        const existingIdx = values.findIndex((v: any) =>
                          (v.id === item.id || v.title === item.title)
                        );
                        const isSelected = existingIdx !== -1;
                        const existing = isSelected ? values[existingIdx] : null;
                        const displayIcon = (existing && existing.icon) || item.icon;
                        const displayDesc = (existing && (existing.description || existing.desc)) || item.desc;

                        return (
                          <div key={item.id} className={clsx("relative group", hasNone && "opacity-40 pointer-events-none")}>
                            <SelectCard
                              selected={isSelected}
                              isCustom={true}
                              onClick={() => {
                                if (isSelected) {
                                  field.onChange(values.filter((v: any) => (v.id !== item.id && v.title !== item.title)));
                                } else {
                                  field.onChange([...values, { id: item.id, title: item.title, description: item.desc, icon: item.icon }]);
                                }
                              }}
                              onDescChange={(newDesc) => {
                                const newValues = [...values];
                                newValues[existingIdx] = { ...existing, description: newDesc };
                                field.onChange(newValues);
                              }}
                              icon={displayIcon}
                              title={item.title}
                              desc={displayDesc}
                              onIconChange={(file) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const newValues = values.map((v: any) => {
                                    if (v.id === item.id || v.title === item.title) {
                                      return { ...v, icon: reader.result, iconFile: file };
                                    }
                                    return v;
                                  });
                                  field.onChange(newValues);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeCustomItem(item.id, false)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors z-30 shadow-md opacity-0 group-hover:opacity-100"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    {fieldState.error && (
                      <FormMessage className="mt-2">{fieldState.error.message}</FormMessage>
                    )}
                  </div>
                );
              }}
            />
          )}
      </div>

    </form>
  );
};

export default Included;
