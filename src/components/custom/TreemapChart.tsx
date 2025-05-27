"use client";

import { ResponsiveTreeMap } from "@nivo/treemap";
import { BasicTooltip } from "@nivo/tooltip";

type ChartData = {
  chartData: object;
};

export default function TreemapChart({ chartData }: ChartData) {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveTreeMap
        data={chartData}
        identity="name"
        value="value"
        innerPadding={3}
        outerPadding={3}
        labelSkipSize={12}
        labelTextColor="#333"
        parentLabelTextColor="#999"
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        tile="squarify"
        label="id"
        motionConfig="wobbly"
      />
    </div>
  );
}
