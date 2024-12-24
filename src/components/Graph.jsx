import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { LegacyCard, Select, ButtonGroup, Button } from '@shopify/polaris';

const Graph = ({ contests }) => {
  const [chartType, setChartType] = useState('line');
  const [sortBy, setSortBy] = useState('name');

  const graphData = contests.map((contest) => ({
    name: contest.name.substring(0, 13) + (contest.name.length > 13 ? '...' : ''),
    duration: +(contest.durationSeconds / 3600).toFixed(2),
    type: contest.type
  })).sort((a, b) => 
    sortBy === 'duration' ? b.duration - a.duration : a.name.localeCompare(b.name)
  );

  const renderChart = () => {
    const CommonProps = {
      data: graphData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    return chartType === 'line' ? (
      <LineChart {...CommonProps}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis label={{ value: 'Duration (hours)', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          formatter={(value, name) => [value + ' hours', 'Duration']}
          labelStyle={{ color: '#000' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="duration" 
          stroke="#008060" 
          activeDot={{ r: 8 }}
          name="Duration (hours)"
        />
      </LineChart>
    ) : (
      <BarChart {...CommonProps}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis label={{ value: 'Duration (hours)', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          formatter={(value, name) => [value + ' hours', 'Duration']}
          labelStyle={{ color: '#000' }}
        />
        <Legend />
        <Bar 
          dataKey="duration" 
          fill="#008060" 
          name="Duration (hours)"
        />
      </BarChart>
    );
  };

  return (
    <LegacyCard
      title={
        <span className="text-xl font-bold">Contest Duration Analysis</span>
      }
      sectioned
    >
      <div className="mb-4 flex justify-between items-center">
        <ButtonGroup segmented>
          <Button
            pressed={chartType === 'line'}
            onClick={() => setChartType('line')}
          >
            Line Chart
          </Button>
          <Button
            pressed={chartType === 'bar'}
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </Button>
        </ButtonGroup>
        <Select
          options={[
            {label: 'Sort by Name', value: 'name'},
            {label: 'Sort by Duration', value: 'duration'}
          ]}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
      <div style={{ height: 400 }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </LegacyCard>
  );
};

export default Graph;