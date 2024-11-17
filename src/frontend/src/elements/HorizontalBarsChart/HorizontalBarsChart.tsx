import React from 'react';

export interface IHorizontalBarsChartProps {
  className?: string;
  [key: string]: unknown;
}

const HorizontalBarsChart: React.FC<IHorizontalBarsChartProps> = ({
  className = '',
  ...props
}) => <div className={`${className}`}>Dashboard</div>;

export default HorizontalBarsChart;
