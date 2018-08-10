import * as React from 'react';

export interface IProps { name: string; }

export const Hello = (props: IProps) =>
  <h1>Hello {props.name}!</h1>
