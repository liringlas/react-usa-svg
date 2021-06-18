import * as React from "react";

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { ResponsiveBar } from "./ResponsiveBar";

export default {
  title: "Bar",
  component: ResponsiveBar,
} as Meta;

const TemplatePie: Story<any> = (args) => <ResponsiveBar {...args} />;

export let ResponsiveBarCanvas = TemplatePie.bind({});
ResponsiveBarCanvas.args = {};
