import * as React from 'react';

export type USAProps = {
  color: string;
};

export type USAState = {};

declare class USA extends React.Component<USAProps, USAState> {}

declare module 'react-usa-svg' {}

export default USA;
