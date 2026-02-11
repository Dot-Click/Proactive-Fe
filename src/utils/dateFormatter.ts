/**
 * Format date range in Spanish format
 * Examples:
 * - Same month: "14 - 28 marzo"
 * - Different months: "14 marzo - 3 abril"
 */
export const formatDateRange = (startDate: string | Date, endDate: string | Date): string => {
    if (!startDate || !endDate) return "";
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const startDay = start.getDate();
    const startMonth = start.getMonth();
    const endDay = end.getDate();
    const endMonth = end.getMonth();
  
    const monthNames = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    if (startMonth === endMonth) {
      // Same month: "14 - 28 marzo"
      return `${startDay} - ${endDay} ${monthNames[startMonth]}`;
    } else {
      // Different months: "14 marzo - 3 abril"
      return `${startDay} ${monthNames[startMonth]} - ${endDay} ${monthNames[endMonth]}`;
    }
  };
  