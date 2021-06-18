import * as React from "react";

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { USA } from "./USA";
import { Alabama } from "../us_states/Alabama";
import { USAProps } from "../index.d";

export default {
  title: "USA SVG Map",
  component: USA,
} as Meta;

const Template_1: Story<USAProps> = (args) => <USA {...args} />;
const Template_2: Story<any> = (_) => {
  let svg_props = { fill: "purple" };

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Alabama {...svg_props} />
    </div>
  );
};

export const Tooltips = Template_1.bind({});
export const USState = Template_2.bind({});

Tooltips.args = {};
USState.args = {};
