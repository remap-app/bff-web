import * as React from 'react'

export interface IProps {
  lang: string;
  title: string;
  children: React.ReactNode;
  publicPath: string;
  initialData: any;
}

export const Html = (props: IProps) => {
  return (
    <html lang={props.lang}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{props.title}</title>
      </head>
      <body>
        <div id="app">{props.children}</div>
        <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
        <script src={`${props.publicPath.replace(/\/$/, '')}/client.js`}></script>
      </body>
    </html>
  )
}
