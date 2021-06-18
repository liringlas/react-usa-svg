import * as React from "react";
import { ResponsivePie as _ResponsivePie } from "@nivo/pie";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { arc } from "d3-shape";
import { getRandomArbitrary } from "../utils/getRandomArbitrary";

export let data = [
  {
    id: "African American/Black",
    label: "African American/Black",
    value: getRandomArbitrary(128, 256),
    color: "#D0166C",
  },

  {
    id: "American Indian or Alaskan Native",
    label: "American Indian or Alaskan Native",
    value: getRandomArbitrary(128, 256),
    color: "#519BDE",
  },

  {
    id: "Asian",
    label: "Asian",
    value: getRandomArbitrary(128, 256),
    color: "#FFA55A",
  },

  {
    id: "Native Hawaiian or Other Pacific Islander",
    label: "Native Hawaiian or Other Pacific Islander",
    value: getRandomArbitrary(128, 256),
    color: "#7A0048",
  },

  {
    id: "White",
    label: "White",
    value: getRandomArbitrary(128, 256),
    color: "#F171A0",
  },

  {
    id: "Other",
    label: "Other",
    value: getRandomArbitrary(64, 128),
    color: "#FFC8C0",
  },

  {
    id: "Not Recorded",
    label: "Not Recorded",
    value: getRandomArbitrary(64, 128),
    color: "#28537A",
  },
];

let TooltipCustom = ({ datum, total }: any) => {
  let { id, value, color } = datum;
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "relative",
        padding: "12px 12px 8px",
        boxShadow: "-1px -1px 10px -2px rgba(0, 0, 0, 0.5)",
        border: `1px solid ${color}`,
      }}
    >
      <Typography variant={"body1"}>
        {id}
        <br />
        {((value / total) * 100).toFixed(1)}%
      </Typography>
      <div
        style={{
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "10px 7.5px 0 7.5px",
          borderColor: "#ffffff transparent transparent transparent",
          position: "absolute",
          top: "calc(100% - 1px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "12px 8px 0 8px",
          borderColor: `${color} transparent transparent transparent`,
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />
    </div>
  );
};
type LayerProps = any;

let LayerPieExtra = (
  layerProps: LayerProps & { activeSector: string | null }
) => {
  let classes = useLayerPieExtraStyles();
  let { dataWithArc, centerX, centerY, radius, activeSector } = layerProps;
  let arcsGenerated: any = [];

  let ownArcGenerator = arc()
    .outerRadius(radius + 32)
    .innerRadius(radius + 16)
    .cornerRadius(0);

  dataWithArc.forEach((datum: any, index: number) => {
    if (datum.data.id === activeSector) {
      arcsGenerated.push(
        <path
          key={index}
          d={ownArcGenerator(datum.arc) || undefined}
          fill={datum.color}
          className={classes.section}
        />
      );
    }
  });

  return (
    <g
      transform={`translate(${centerX}, ${centerY})`}
      style={{ opacity: 0.35 }}
    >
      {arcsGenerated}
    </g>
  );
};

let useLayerPieExtraStyles = makeStyles((theme) => {
  return {
    "@keyframes animationMouseEnter": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
    section: {
      transition: "opacity 1s",
      animation: `$animationMouseEnter 0.5s ease-out`,
    },
  };
});

export let ResponsivePie = () => {
  let total = data.reduce((acc, { value }) => acc + value, 0);
  let [activeSector, setActiveSector] = React.useState<string | null>(null);

  let _LayerPieExtra = React.useCallback(
    (layerProps) => (
      <LayerPieExtra {...layerProps} activeSector={activeSector} />
    ),
    [activeSector]
  );

  return (
    <>
      <div style={{ height: 420 }}>
        <_ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          enableRadialLabels={false}
          enableSliceLabels={false}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={0}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          layers={["slices", "sliceLabels", "radialLabels", _LayerPieExtra]}
          colors={(datum) => {
            return datum.data.color;
          }}
          tooltip={({ datum }) => <TooltipCustom datum={datum} total={total} />}
          onMouseEnter={(data) => {
            setActiveSector(data.data.id);
          }}
          onMouseLeave={(data) => {
            setActiveSector(null);
          }}
        />
      </div>
      <div
        style={{
          maxWidth: 640,
          margin: "auto",
        }}
      >
        <Grid container>
          {data.map((dataItem) => {
            return (
              <Grid item xs={12} md={6} lg={3} key={dataItem.id} spacing={2}>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div
                    style={{
                      flex: "0 0 16px",
                      height: 16,
                      backgroundColor: dataItem.color,
                      borderRadius: "50%",
                      marginRight: 12,
                      position: "relative",
                      top: 2,
                    }}
                  />
                  <Typography>{dataItem.label}</Typography>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
