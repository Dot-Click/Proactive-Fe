import Pastadventures from "@/components/Adventureoppurtunities/Pastadventures";
import Searchbar from "@/components/Adventureoppurtunities/Searchbar";
import Showtrips from "@/components/Adventureoppurtunities/Showtrips";
import Tabs, { type TabId } from "@/components/Adventureoppurtunities/Tabs";
import Upcomingtrips from "@/components/Adventureoppurtunities/Upcomingtrips";
import Carousel from "@/components/userDashboard/Carousel/Carousel";
import { useState } from "react";

import { UsegetCurrentUser } from "@/hooks/getCurrentUserhook";
import { useTranslation } from "react-i18next";

const AdventureOppurtunitiesPage = () => {
  const { t } = useTranslation();
  const { data: userData } = UsegetCurrentUser();
  const userName = userData?.data?.user?.FirstName || t("profile.user");
  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("all");

  return (
    <>
      <div className="md:px-16 px-4 overflow-x-hidden">
        <Carousel
          UserName={userName}
          subHeading={t("dashboard.discoverAmazingDestinations")}
        />
      </div>
      <div>
        <Searchbar
          view={view}
          setView={setView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
        />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <Showtrips view={view} searchQuery={searchQuery} category={category} activeTab={activeTab} />
        <Upcomingtrips activeTab={activeTab} />
        <Pastadventures />
      </div>
    </>
  );
};

export default AdventureOppurtunitiesPage;
