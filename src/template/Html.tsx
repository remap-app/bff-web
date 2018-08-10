import * as React from 'react'

export const Html = (props: any) => {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>App</title>
      </head>
      <body>
        <div id="app">{props.children}</div>
        <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
        <script src="/client.js"></script>
      </body>
    </html>
  )
}
