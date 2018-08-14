import * as React from 'react'

export interface IProps {
  lang: string;
  title: string;
  children: React.ReactNode;
  publicPath: string;
  initialData: any;
  assets?: { js: Array<string>, css: Array<string> };
}

export const Html = (props: IProps) => {
  return (
    <html lang={props.lang}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{props.title}</title>
        {props.assets && props.assets.css ? (
          props.assets.css.map(asset => <link key={asset} rel='stylesheet' href={asset} />)
        ) : null}
      </head>
      <body>
        <div id="app">{props.children}</div>
        <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
        {props.assets && props.assets.js ? (
          props.assets.js.map(asset => <script key={asset} src={asset}></script>)
        ) : <script src={`${props.publicPath.replace(/\/$/, '')}/assets/client.js`}></script>}
      </body>
    </html>
  )
}
