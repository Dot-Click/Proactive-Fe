import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import api from '../../../config/axios';

interface CategoryStat {
  name: string;
  value: number;
  fill?: string;
  count?: number;
}

interface ApiResponseItem {
  category?: string;
  name?: string;
  value: number;
  percentage: number;
  count?: number;
}

const Tripcategories = () => {
  const [stats, setStats] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const COLORS = ['#0C038B', '#038B6B', '#814500', '#3B82F6', '#8B5CF6', '#EC4899'];

  useEffect(() => {
    fetchCategoryStats();
  }, []);

  const fetchCategoryStats = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get<ApiResponseItem[]>('/api/categories/stats');
      
      const data: CategoryStat[] = response.data.map((item, index) => ({
        name: item.category || item.name || `Category ${index + 1}`,
        value: item.percentage || item.value,
        fill: COLORS[index % COLORS.length],
        count: item.count
      }));
      
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load statistics');
      
      // Updated fallback data with generic categories
      const fallbackData: CategoryStat[] = [
        { name: 'Adventure', value: 55, fill: COLORS[0] },
        { name: 'Business', value: 25, fill: COLORS[1] },
        { name: 'Leisure', value: 15, fill: COLORS[2] },
        { name: 'Family', value: 5, fill: COLORS[3] },
      ];
      setStats(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg min-w-[140px]">
          <p className="font-semibold text-gray-800 mb-1 text-sm">{data.name}</p>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }} />
            <span className="text-base font-bold text-gray-900">{data.value}%</span>
          </div>
          {data.count !== undefined && (
            <p className="text-xs text-gray-500 mt-1">Trips: {data.count.toLocaleString()}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const totalTrips = stats[0]?.count !== undefined
    ? stats.reduce((sum, item) => sum + (item.count || 0), 0)
    : undefined;

  if (loading) {
    return (
      <div className="px-4 py-5 rounded-[25px] bg-white lg:mt-3 shadow-sm min-w-[280px] h-full">
        <h1 className="font-medium text-[16px] mb-6">Trip Categories</h1>
        <div className="flex flex-col items-center justify-center h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 rounded-[25px] bg-white lg:mt-3 shadow-sm min-w-[280px] h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-medium text-[16px]">Trip Categories</h1>
        {totalTrips !== undefined && (
          <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            Total: {totalTrips.toLocaleString()}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-2 h-[180px]">
        {error && stats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-red-500 mb-3">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2 text-center">{error}</p>
            <button 
              onClick={fetchCategoryStats}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${value}%`}
                  outerRadius="85%"
                  innerRadius="40%"
                  paddingAngle={1}
                  dataKey="value"
                >
                  {stats.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill || COLORS[index % COLORS.length]} 
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 mb-1">
        {/* {stats.map((item, index) => (
          <div key={index} className="flex gap-1 items-center">
            <div 
              className="w-4 h-4 border rounded-full" 
              style={{ 
                borderColor: item.fill || COLORS[index % COLORS.length],
                backgroundColor: `${item.fill || COLORS[index % COLORS.length]}10`
              }} 
            />
            <p className="text-[#666373] font-quickSand text-[12px] text-nowrap">
              {item.name} ({item.value}%)
            </p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Tripcategories;