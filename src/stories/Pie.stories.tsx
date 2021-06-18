import * as React from "react";

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { ResponsivePie } from "./ResponsivePie";

export default {
  title: "Pie",
  component: ResponsivePie,
} as Meta;

const TemplatePie: Story<any> = (args) => <ResponsivePie {...args} />;

export let PieCanvas = TemplatePie.bind({});
PieCanvas.args = {};
