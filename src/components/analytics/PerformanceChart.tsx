import React, { useRef, useEffect } from 'react';
import { TimePerformanceData } from '../../types';

interface PerformanceChartProps {
  data: TimePerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    // This is a placeholder for chart rendering
    // In a real application, you would use a charting library like Chart.js or Recharts
    // For this example, we'll create a simple visual representation with HTML/CSS
    
    renderBasicChart();
  }, [data]);

  const renderBasicChart = () => {
    if (!chartRef.current) return;

    // Clear previous chart
    chartRef.current.innerHTML = '';

    // Find max values for scaling
    const maxImpressions = Math.max(...data.map(d => d.impressions));
    // We'll keep maxEngagements for future reference when implementing a proper chart library
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    // Create chart container with grid
    const chartContainer = document.createElement('div');
    chartContainer.className = 'relative h-full flex';
    
    // Create y-axis
    const yAxis = document.createElement('div');
    yAxis.className = 'pr-4 flex flex-col justify-between text-xs text-gray-500';
    
    // Add y-axis labels (impressions scale)
    for (let i = 5; i >= 0; i--) {
      const label = document.createElement('div');
      label.textContent = Math.round(maxImpressions * i / 5).toLocaleString();
      yAxis.appendChild(label);
    }
    
    chartContainer.appendChild(yAxis);
    
    // Create chart area
    const chartArea = document.createElement('div');
    chartArea.className = 'flex-1 relative';
    
    // Add horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const gridLine = document.createElement('div');
      gridLine.className = 'absolute w-full border-t border-gray-200';
      gridLine.style.bottom = `${i * 20}%`;
      chartArea.appendChild(gridLine);
    }
    
    // Create bars container with x-axis
    const barsContainer = document.createElement('div');
    barsContainer.className = 'absolute inset-0 flex items-end';
    
    // Calculate bar width based on number of data points
    const barWidth = 100 / data.length;
    
    // Create bars and x-axis labels
    data.forEach((item) => {
      const barGroup = document.createElement('div');
      barGroup.className = 'flex flex-col items-center';
      barGroup.style.width = `${barWidth}%`;
      
      // Container for the bars
      const bars = document.createElement('div');
      bars.className = 'w-full flex justify-center items-end h-[calc(100%-20px)]';
      
      // Impressions bar
      const impressionsBar = document.createElement('div');
      const impressionsHeight = (item.impressions / maxImpressions) * 100;
      impressionsBar.className = 'w-3 bg-primary-200 rounded-t';
      impressionsBar.style.height = `${impressionsHeight}%`;
      impressionsBar.title = `Impressions: ${item.impressions.toLocaleString()}`;
      
      // Engagements bar
      const engagementsBar = document.createElement('div');
      const engagementsHeight = (item.engagements / maxImpressions) * 100;
      engagementsBar.className = 'w-3 bg-primary-600 rounded-t ml-1';
      engagementsBar.style.height = `${engagementsHeight}%`;
      engagementsBar.title = `Engagements: ${item.engagements.toLocaleString()}`;
      
      bars.appendChild(impressionsBar);
      bars.appendChild(engagementsBar);
      barGroup.appendChild(bars);
      
      // X-axis label
      const dateLabel = document.createElement('div');
      dateLabel.className = 'text-xs text-gray-500 mt-1';
      dateLabel.textContent = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      barGroup.appendChild(dateLabel);
      
      barsContainer.appendChild(barGroup);
    });
    
    chartArea.appendChild(barsContainer);
    chartContainer.appendChild(chartArea);
    
    // Create legend
    const legend = document.createElement('div');
    legend.className = 'flex justify-center space-x-6 mt-4';
    
    // Impressions legend item
    const impressionsLegend = document.createElement('div');
    impressionsLegend.className = 'flex items-center';
    
    const impressionsColor = document.createElement('div');
    impressionsColor.className = 'w-3 h-3 bg-primary-200 rounded';
    
    const impressionsText = document.createElement('span');
    impressionsText.className = 'ml-2 text-sm text-gray-700';
    impressionsText.textContent = 'Impressions';
    
    impressionsLegend.appendChild(impressionsColor);
    impressionsLegend.appendChild(impressionsText);
    
    // Engagements legend item
    const engagementsLegend = document.createElement('div');
    engagementsLegend.className = 'flex items-center';
    
    const engagementsColor = document.createElement('div');
    engagementsColor.className = 'w-3 h-3 bg-primary-600 rounded';
    
    const engagementsText = document.createElement('span');
    engagementsText.className = 'ml-2 text-sm text-gray-700';
    engagementsText.textContent = 'Engagements';
    
    engagementsLegend.appendChild(engagementsColor);
    engagementsLegend.appendChild(engagementsText);
    
    legend.appendChild(impressionsLegend);
    legend.appendChild(engagementsLegend);
    
    // Add everything to the chart ref
    chartRef.current.appendChild(chartContainer);
    chartRef.current.appendChild(legend);
  };

  return (
    <div className="w-full h-full">
      <p className="text-sm text-gray-500 mb-4">
        Note: In a production environment, this chart would be implemented using a proper chart library like Chart.js or Recharts.
      </p>
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

export default PerformanceChart;