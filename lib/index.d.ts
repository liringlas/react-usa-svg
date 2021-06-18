import { SVGProps } from "react";
import { STATES_LIST } from "./STATES_LIST";

// declare module "react-usa-svg" {}

export type StatesListRendererMap = Omit<
  {
    [key in keyof typeof STATES_LIST]: (p: RendererProps) => React.ReactElement;
  },
  "AS" | "GU" | "MH" | "MP" | "VI"
>;

export type RendererProps = {
  svg_props: React.SVGProps<SVGPathElement>;
};
export interface USAProps {
  HOC?: (props: {
    renderer: React.FC<RendererProps>;
    svg_props?: SVGProps<SVGPathElement>;
    abbr: keyof StatesListRendererMap;
  }) => JSX.Element;
  getSVGProps?: (abbr: keyof StatesListRendererMap) => SVGProps<SVGPathElement>;
  SVGFilters?: Array<React.FC<React.SVGProps<SVGFilterElement>>>;
  framesStroke?: string;
  framesStrokeWidth?: string | number;
}

export type StateSVGPathProps = React.SVGProps<SVGPathElement>;

export function USA(props: USAProps): JSX.Element;

export function Alabama(props: StateSVGPathProps): JSX.Element;
export function Alaska(props: StateSVGPathProps): JSX.Element;
export function Arizona(props: StateSVGPathProps): JSX.Element;
export function Arkansas(props: StateSVGPathProps): JSX.Element;
export function California(props: StateSVGPathProps): JSX.Element;
export function Colorado(props: StateSVGPathProps): JSX.Element;
export function Connecticut(props: StateSVGPathProps): JSX.Element;
export function Delaware(props: StateSVGPathProps): JSX.Element;
export function Florida(props: StateSVGPathProps): JSX.Element;
export function Georgia(props: StateSVGPathProps): JSX.Element;
export function Hawaii(props: StateSVGPathProps): JSX.Element;
export function Idaho(props: StateSVGPathProps): JSX.Element;
export function Illinois(props: StateSVGPathProps): JSX.Element;
export function Indiana(props: StateSVGPathProps): JSX.Element;
export function Iowa(props: StateSVGPathProps): JSX.Element;
export function Kansas(props: StateSVGPathProps): JSX.Element;
export function Kentucky(props: StateSVGPathProps): JSX.Element;
export function Louisiana(props: StateSVGPathProps): JSX.Element;
export function Maine(props: StateSVGPathProps): JSX.Element;
export function Maryland(props: StateSVGPathProps): JSX.Element;
export function Massachusetts(props: StateSVGPathProps): JSX.Element;
export function Michigan(props: StateSVGPathProps): JSX.Element;
export function Minnesota(props: StateSVGPathProps): JSX.Element;
export function Mississippi(props: StateSVGPathProps): JSX.Element;
export function Missouri(props: StateSVGPathProps): JSX.Element;
export function Montana(props: StateSVGPathProps): JSX.Element;
export function Nebraska(props: StateSVGPathProps): JSX.Element;
export function Nevada(props: StateSVGPathProps): JSX.Element;
export function NewHampshire(props: StateSVGPathProps): JSX.Element;
export function NewJersey(props: StateSVGPathProps): JSX.Element;
export function NewMexico(props: StateSVGPathProps): JSX.Element;
export function NewYork(props: StateSVGPathProps): JSX.Element;
export function NorthCarolina(props: StateSVGPathProps): JSX.Element;
export function NorthDakota(props: StateSVGPathProps): JSX.Element;
export function Ohio(props: StateSVGPathProps): JSX.Element;
export function Oklahoma(props: StateSVGPathProps): JSX.Element;
export function Oregon(props: StateSVGPathProps): JSX.Element;
export function Pennsylvania(props: StateSVGPathProps): JSX.Element;
export function RhodeIsland(props: StateSVGPathProps): JSX.Element;
export function SouthCarolina(props: StateSVGPathProps): JSX.Element;
export function SouthDakota(props: StateSVGPathProps): JSX.Element;
export function Tennessee(props: StateSVGPathProps): JSX.Element;
export function Texas(props: StateSVGPathProps): JSX.Element;
export function Utah(props: StateSVGPathProps): JSX.Element;
export function Vermont(props: StateSVGPathProps): JSX.Element;
export function Virginia(props: StateSVGPathProps): JSX.Element;
export function Washington(props: StateSVGPathProps): JSX.Element;
export function WestVirginia(props: StateSVGPathProps): JSX.Element;
export function Wisconsin(props: StateSVGPathProps): JSX.Element;
export function Wyoming(props: StateSVGPathProps): JSX.Element;
