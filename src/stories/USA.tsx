import * as React from "react";
import {
  Grid,
  Paper,
  CssBaseline,
  ButtonBase,
  Divider,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { USA as ComponentUSA } from "../index";
import { USAProps, StatesListRendererMap } from "../index.d";
import { STATES_LIST } from "../STATES_LIST";

import { throttle } from "../utils/throttle";
import { getRandomArbitrary } from "../utils/getRandomArbitrary";

import { HtmlTooltip } from "./HtmlTooltip";

// type StateKeys = keoyf StatesListRendererMap
let DataMap = new Map<keyof StatesListRendererMap, { count: number | null }>();

Object.keys(STATES_LIST).forEach((abbr: keyof StatesListRendererMap) => {
  DataMap.set(abbr, { count: getRandomArbitrary(0, 128) });
});

let getFillColor = (count: number | null | undefined) => {
  if (count == null) {
    return "#DDDDDD";
  }

  if (10 > count && count >= 0) {
    return "#C7E4FF";
  }
  if (50 > count && count >= 10) {
    return "#95CCFF";
  }
  if (100 > count && count >= 50) {
    return "#519BDE";
  }
  if (count >= 100) {
    return "#28537A";
  }
};

let getSVGProps = (key: keyof StatesListRendererMap) => {
  let dataObject = DataMap.get(key);
  let count = dataObject?.count;

  // Filter and nullify n/a states
  if (key === "HI" || key === "AK" || key === "NY") {
    count = null;
  }

  return {
    fill: getFillColor(count),
  };
};

type EventElementData = {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientWidth: number;
  clientHeight: number;
};

export function USA(props: USAProps) {
  let [width, setWidth] = React.useState<"100%" | "200%" | "350%" | "500%">(
    "100%"
  );

  let [activeState, setActiveState] = React.useState<
    keyof typeof STATES_LIST | null
  >(null);

  let refFrame = React.useRef<HTMLDivElement | null>(null);

  let [scrollData, setScrollData] = React.useState<EventElementData>({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientWidth: 0,
    clientHeight: 0,
  });
  let [refScroll, setRefScroll] = React.useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
  });
  let classes = useStyles({ width });

  let throttled = React.useMemo(() => {
    return throttle((data: EventElementData) => {
      setScrollData(data);
    }, 128);
  }, [setScrollData, refFrame]);

  let onFrameScroll = React.useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      let element: HTMLDivElement = ev.target as any;

      let clientWidth = element.clientWidth;
      let clientHeight = element.clientHeight;

      let scrollTop = element.scrollTop;
      let scrollLeft = element.scrollLeft;

      let scrollHeight = element.scrollHeight;
      let scrollWidth = element.scrollWidth;

      throttled({
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientWidth,
        clientHeight,
      });
    },
    [setScrollData, throttled, refFrame]
  );

  let _props: USAProps = {
    ...props,
    SVGFilters: [
      () => (
        <filter id="filterDropShadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="1" />
        </filter>
      ),
    ],
    HOC: ({ renderer: Renderer, svg_props: _svg_props, abbr }) => {
      let svg_props = _svg_props != null ? _svg_props : {};

      /* Key point: Need <g> for Tooltip to pass ref*/
      return (
        <HtmlTooltip
          title={
            <div
              style={{
                padding: 12,
                background: "white",
                border: `1px solid ${svg_props.fill || "grey"}`,
                position: "relative",
                borderRadius: 4,
              }}
            >
              <Typography variant={"body1"} color={"textPrimary"}>
                {STATES_LIST[abbr]}
              </Typography>
              <div className={"arrow"} />
              <div
                className={"arrow-underlay"}
                style={{ color: svg_props.fill }}
              />
            </div>
          }
          placement={"top"}
        >
          <g>
            <Renderer
              svg_props={{
                ...svg_props,
                onMouseEnter: () => {
                  setActiveState(abbr);
                },
                onMouseLeave: () => {
                  setActiveState(null);
                },
                stroke: activeState === abbr ? `white` : undefined,
                strokeWidth: activeState === abbr ? `2px` : undefined,
                filter:
                  activeState === abbr ? "url(#filterDropShadow)" : undefined,
              }}
            />
          </g>
        </HtmlTooltip>
      );
    },
    getSVGProps,
  };

  let onZoomIn = () => {
    switch (width) {
      case "100%": {
        setWidth("200%");
        setRefScroll({
          ...scrollData,
          scrollTop: scrollData.scrollTop * 2 + scrollData.clientHeight / 4,
          scrollLeft: scrollData.scrollLeft * 2 + scrollData.clientWidth / 4,
        });

        break;
      }
      case "200%": {
        setWidth("350%");
        setRefScroll({
          ...scrollData,
          scrollTop:
            (scrollData.scrollTop * 3.5) / 2 + scrollData.clientHeight / 4,
          scrollLeft:
            (scrollData.scrollLeft * 3.5) / 2 + scrollData.clientWidth / 4,
        });

        break;
      }
      case "350%": {
        setWidth("500%");
        setRefScroll({
          ...scrollData,
          scrollTop:
            (scrollData.scrollTop * 5) / 3.5 + scrollData.clientHeight / 4,
          scrollLeft:
            (scrollData.scrollLeft * 5) / 3.5 + scrollData.clientWidth / 4,
        });

        break;
      }
      default: {
        break;
      }
    }
  };

  let onZoomOut = () => {
    switch (width) {
      case "200%": {
        setWidth("100%");
        setRefScroll({
          ...scrollData,
          scrollTop: scrollData.scrollTop / 2 - scrollData.clientHeight / 4,
          scrollLeft: scrollData.scrollLeft / 2 - scrollData.clientWidth / 4,
        });

        break;
      }
      case "350%": {
        setWidth("200%");
        setRefScroll({
          ...scrollData,
          scrollTop:
            (scrollData.scrollTop * 2) / 3.5 - scrollData.clientHeight / 4,
          scrollLeft:
            (scrollData.scrollLeft * 2) / 3.5 - scrollData.clientWidth / 4,
        });

        break;
      }
      case "500%": {
        setWidth("350%");
        setRefScroll({
          ...scrollData,
          scrollTop:
            (scrollData.scrollTop * 3.5) / 5 - scrollData.clientHeight / 4,
          scrollLeft:
            (scrollData.scrollLeft * 3.5) / 5 - scrollData.clientWidth / 4,
        });

        break;
      }
      default: {
        break;
      }
    }
  };

  React.useEffect(() => {
    if (refFrame.current != null) {
      refFrame.current.scrollTop = refScroll.scrollTop;
      refFrame.current.scrollLeft = refScroll.scrollLeft;
    }
  }, [refScroll, refFrame]);

  return (
    <Grid container>
      <CssBaseline />

      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                className={classes.frame}
                onScroll={onFrameScroll}
                ref={refFrame}
              >
                <div className={classes.frame__inner} style={{ width }}>
                  <ComponentUSA {..._props} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justify={"space-between"}
                alignItems={"flex-end"}
                wrap={"nowrap"}
                spacing={2}
              >
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item className={classes.range}>
                      <div
                        className={classes.rangeCircle}
                        style={{ backgroundColor: getFillColor(0) }}
                      ></div>
                      <span className={classes.rangeText}>0–10</span>
                    </Grid>

                    <Grid item className={classes.range}>
                      <div
                        className={classes.rangeCircle}
                        style={{ backgroundColor: getFillColor(10) }}
                      ></div>
                      <span className={classes.rangeText}>10-50</span>
                    </Grid>

                    <Grid item className={classes.range}>
                      <div
                        className={classes.rangeCircle}
                        style={{ backgroundColor: getFillColor(50) }}
                      ></div>
                      <span className={classes.rangeText}>50-100</span>
                    </Grid>

                    <Grid item className={classes.range}>
                      <div
                        className={classes.rangeCircle}
                        style={{ backgroundColor: getFillColor(100) }}
                      ></div>
                      <span className={classes.rangeText}>100+</span>
                    </Grid>

                    <Grid item className={classes.range}>
                      <div
                        className={classes.rangeCircle}
                        style={{ backgroundColor: getFillColor(null) }}
                      ></div>
                      <span className={classes.rangeText}>Unavailable</span>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Paper elevation={2} square>
                    <Grid container direction={"column"} justify={"flex-start"}>
                      <Grid item>
                        <ButtonBase
                          onClick={onZoomIn}
                          style={{ width: "40px", height: "40px" }}
                        >
                          <AddIcon color={"secondary"} fontSize={"small"} />
                        </ButtonBase>
                      </Grid>
                      <Grid item>
                        <Divider light style={{ margin: "0 8px" }} />
                      </Grid>
                      <Grid item>
                        <ButtonBase
                          onClick={onZoomOut}
                          style={{ width: "40px", height: "40px" }}
                        >
                          <RemoveIcon color={"secondary"} fontSize={"small"} />
                        </ButtonBase>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => {
  let yAspectCorrection = 16;

  return {
    frame: {
      overflow: "scroll",
      height: 0,
      paddingTop: `${(593 / (959 - yAspectCorrection)) * 100}%`,
      position: "relative",
    },

    frame__inner: {
      height: "auto",
      position: "absolute",
      top: 0,
      left: 0,
    },

    paper: {
      padding: theme.spacing(4),
      maxWidth: 1200,
    },
    range: {
      display: "flex",
      alignItems: "center",
    },
    rangeText: {},
    rangeCircle: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      display: "inline-block",
      marginRight: 8,
    },
  };
});
