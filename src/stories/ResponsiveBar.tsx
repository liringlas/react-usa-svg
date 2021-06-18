import * as React from "react";
import { ResponsiveBar as _ResponsiveBar } from "@nivo/bar";
import { getRandomArbitrary } from "../utils/getRandomArbitrary";

export let data = [
  {
    country: "Group Label",
    alpha: getRandomArbitrary(128, 256).toFixed(),
    beta: getRandomArbitrary(64, 128).toFixed(),
    gamma: getRandomArbitrary(256, 512).toFixed(),
  },
];

const commonProps = {
  height: 96,
  margin: { left: 16, right: 16 },
  data,
  keys: ["alpha", "beta", "gamma"],
  indexBy: "country",
  padding: 0.2,
  labelTextColor: "inherit:darker(1.4)",
  labelSkipWidth: 16,
  labelSkipHeight: 16,
};

export let ResponsiveBar = () => {
  return (
    <>
      <div style={{ height: 12 }}>
        <_ResponsiveBar
          {...commonProps}
          axisTop={null}
          axisBottom={null}
          axisLeft={null}
          axisRight={null}
          layout="horizontal"
          enableGridY={false}
          enableGridX={false}
        />
      </div>
    </>
  );
};
