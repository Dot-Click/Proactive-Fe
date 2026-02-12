import { useParams, useNavigate } from "react-router-dom";
import { UsegetCoordinatorbyId } from "@/hooks/getCoordinatorhookid";
import { LoaderIcon, ArrowLeft, MapPin, Clock, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CoordinatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = UsegetCoordinatorbyId(id || "");

  const coordinator = data?.coordinator;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md text-center">
          <LoaderIcon className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-[#221E33] flex-shrink-0" />
          <p className="text-[#666373] text-sm sm:text-base md:text-lg">Loading coordinator details...</p>
        </div>
      </div>
    );
  }

  if (isError || !coordinator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#221E33] mb-4">Coordinator Not Found</h2>
          <p className="text-[#666373] mb-6">The coordinator you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/travel-coordinator")}
            className="rounded-full bg-[#0DAC87] hover:bg-[#09a07d] text-white font-bold px-8 py-3 transition-colors"
          >
            Back to Coordinators
          </button>
        </div>
      </div>
    );
  }

  const tripsCompleted = coordinator?.completedTrips || coordinator?.totalTrips || 0;
  const hobbies = (coordinator as any).hobbies || "";
  const countriesVisited = (coordinator as any).countriesVisited || (coordinator as any).paisesVisitados || "";
  const idiomasText =
    Array.isArray(coordinator.languages) && coordinator.languages.length > 0
      ? coordinator.languages.join(", ")
      : "";

  // API Stats from modal
  const formatStats = [
    { Name: 'Total Trips Led', Number: coordinator?.totalTrips?.toString() || '0' },
    { Name: 'Completed Trips', Number: coordinator?.completedTrips?.toString() || '0' },
    { Name: 'Success Rate', Number: `${Math.round(coordinator?.successRate ?? 0)}%` },
    { Name: 'Repeat Customers', Number: coordinator?.repeatCustomers?.toString() || '0' },
  ];

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-[#E0E1E2] sticky top-0 z-50 shadow-sm w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4">
          <button
            onClick={() => navigate("/travel-coordinator")}
            className="flex items-center gap-1.5 sm:gap-2 text-[#221E33] hover:text-[#0DAC87] transition-colors font-medium text-xs sm:text-sm md:text-base"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
            <span className="whitespace-nowrap">Back to Coordinators</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Profile Picture & Trip Count */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
            {/* Profile Picture */}
            <Avatar className="h-40 w-40 xs:h-48 xs:w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 mb-4 sm:mb-6 border-4 border-white shadow-lg flex-shrink-0">
              <AvatarImage src={coordinator.profilePicture} alt={coordinator.fullName} className="object-cover" />
              <AvatarFallback className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-br from-[#221E33] to-[#565070] text-white">
                {coordinator.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Viajes Realizados Section */}
            <div className="w-full max-w-xs lg:max-w-none">
              <p className="text-[#666373] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3 text-center lg:text-left">
                VIAJES REALIZADOS
              </p>
              <div className="bg-[#F5F5F5] rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-center lg:text-left">
                <span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[#221E33]">
                  {tripsCompleted}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full min-w-0">
            {/* Name and Role - At the top */}
            <div className="w-full">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#221E33] mb-2 break-words uppercase leading-tight">
                {coordinator.fullName}
              </h1>
              <p className="text-[#666373] text-sm sm:text-base md:text-lg">
                {coordinator.type || "Coordinador de Huakai"}
              </p>
            </div>

            {/* BIOGRAFÍA Section - At the top after name */}
            {coordinator.bio && (
              <div className="w-full">
                <h2 className="text-[#221E33] font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide mb-3 sm:mb-4">
                  BIOGRAFÍA
                </h2>
                <div className="text-[#221E33] text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line break-words">
                  {coordinator.bio}
                </div>
              </div>
            )}

            {/* INFORMACIÓN PERSONAL Section */}
            <div className="w-full">
              <h2 className="text-[#221E33] font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide mb-3 sm:mb-4">
                INFORMACIÓN PERSONAL
              </h2>
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Hobbies */}
                {hobbies && (
                  <div>
                    <p className="text-[#221E33] font-medium mb-2 text-sm sm:text-base">Hobbies</p>
                    <p className="text-[#221E33] text-sm sm:text-base leading-relaxed">{hobbies}</p>
                  </div>
                )}

                {/* Países Visitados */}
                {countriesVisited && (
                  <div>
                    <p className="text-[#221E33] font-medium mb-2 text-sm sm:text-base">Países visitados</p>
                    <p className="text-[#221E33] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {countriesVisited}
                    </p>
                  </div>
                )}

                {/* Idiomas */}
                {idiomasText && (
                  <div>
                    <p className="text-[#221E33] font-medium mb-2 text-sm sm:text-base">Idiomas</p>
                    <p className="text-[#221E33] text-sm sm:text-base">{idiomasText}</p>
                  </div>
                )}

                {/* Specialties (if no hobbies/countries) */}
                {!hobbies && !countriesVisited && coordinator.specialities && coordinator.specialities.length > 0 && (
                  <div>
                    <p className="text-[#221E33] font-medium mb-2 text-sm sm:text-base">Especialidades</p>
                    <p className="text-[#221E33] text-sm sm:text-base">
                      {coordinator.specialities.join(", ")}
                    </p>
                  </div>
                )}

                {/* Location & Experience */}
                <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-[#221E33] pt-2 border-t border-[#EDEDED]">
                  {coordinator.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#666373] flex-shrink-0" />
                      <span>{coordinator.location}</span>
                    </div>
                  )}
                  {coordinator.yearsOfExperience && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#666373] flex-shrink-0" />
                      <span>{coordinator.yearsOfExperience} years experience</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                    <span className="font-medium">4.5 (23)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - API Stats & Earnings (from modal) */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-[#E0E1E2]">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 w-full">
            {formatStats.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-lg sm:rounded-xl px-3 sm:px-4 py-4 sm:py-6 lg:py-8 bg-[#FAFAFE] border border-[#E0E1E2] hover:shadow-md transition-all duration-300"
              >
                <span className="font-bold text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text mb-1 sm:mb-2">
                  {item.Number}
                </span>
                <span className="text-[#666373] text-xs sm:text-sm lg:text-base text-center leading-tight">
                  {item.Name}
                </span>
              </div>
            ))}
          </div>

          {/* Revenue & Performance Section */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Total Revenue */}
            {coordinator?.totalRevenue !== undefined && (
              <div className="bg-[#FAFAFE] border border-[#E0E1E2] rounded-lg sm:rounded-xl p-6 sm:p-8">
                <h3 className="text-[#221E33] font-semibold text-base sm:text-lg mb-4">Total Revenue</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#221E33] to-[#565070] text-transparent bg-clip-text">
                    €{coordinator.totalRevenue}
                  </span>
                </div>
              </div>
            )}

            {/* Performance Metrics */}
            {(coordinator?.overallPerformance !== undefined || 
              coordinator?.successRate !== undefined || 
              coordinator?.customerSatisfaction !== undefined) && (
              <div className="bg-[#FAFAFE] border border-[#E0E1E2] rounded-lg sm:rounded-xl p-6 sm:p-8">
                <h3 className="text-[#221E33] font-semibold text-base sm:text-lg mb-4">Performance Metrics</h3>
                <div className="flex flex-col gap-4 sm:gap-6">
                  {coordinator?.overallPerformance !== undefined && (
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-[#666373]">Overall Performance</span>
                        <span className="text-[#221E33] font-semibold">
                          {Math.round(coordinator.overallPerformance)}%
                        </span>
                      </div>
                      <Progress value={Math.round(coordinator.overallPerformance)} className="h-2" />
                    </div>
                  )}

                  {coordinator?.successRate !== undefined && (
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-[#666373]">Success Rate</span>
                        <span className="text-[#221E33] font-semibold">
                          {Math.round(coordinator.successRate)}%
                        </span>
                      </div>
                      <Progress value={Math.round(coordinator.successRate)} className="h-2" />
                    </div>
                  )}

                  {coordinator?.customerSatisfaction !== undefined && (
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-[#666373]">Customer Satisfaction</span>
                        <span className="text-[#221E33] font-semibold">
                          {(coordinator.customerSatisfaction ?? 0).toFixed(2)}/5.0
                        </span>
                      </div>
                      <Progress value={(coordinator.customerSatisfaction ?? 0) * 20} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Professional Information Card */}
          {(coordinator.specialities?.length > 0 || coordinator.languages?.length > 0 || coordinator.certificateLvl) && (
            <div className="mt-6 sm:mt-8 bg-[#FAFAFE] border border-[#E0E1E2] rounded-lg sm:rounded-xl p-6 sm:p-8">
              <h3 className="text-[#221E33] font-semibold text-base sm:text-lg mb-4">Professional Information</h3>
              <div className="flex flex-col gap-4 sm:gap-6">
                {coordinator.specialities && coordinator.specialities.length > 0 && (
                  <div>
                    <span className="text-[#666373] text-sm font-medium block mb-2">Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      {coordinator.specialities.map((spec: string, i: number) => (
                        <Badge
                          key={i}
                          className="bg-[#F5F5F5] text-[#727272] hover:bg-[#F5F5F5] border-none px-3 sm:px-4 py-1.5 text-xs sm:text-sm"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {coordinator.languages && coordinator.languages.length > 0 && (
                  <div>
                    <span className="text-[#666373] text-sm font-medium block mb-2">Languages:</span>
                    <div className="flex flex-wrap gap-2">
                      {coordinator.languages.map((lang: string, i: number) => (
                        <Badge
                          key={i}
                          className="bg-[#F5F5F5] text-[#727272] hover:bg-[#F5F5F5] border-none px-3 sm:px-4 py-1.5 text-xs sm:text-sm"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {coordinator.certificateLvl && (
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-[#EDEDED]">
                    <span className="text-[#666373]">Certification Level</span>
                    <span className="text-[#221E33] font-semibold">{coordinator.certificateLvl}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDetailPage;
