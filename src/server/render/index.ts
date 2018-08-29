import * as serialize from 'serialize-javascript'

export const renderHeader = (props: any): string => (
`<!DOCTYPE html>
<html lang="${props.lang}">
  <head>
    <meta charset="utf-8">
    <title>${props.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${props.assets && props.assets.css ? (
      props.assets.css.map((asset: string) => (
        `<link rel="stylesheet" href="/${asset}" />`
      )).join('')
    ) : ''}
    ${props.styles.join('')}
    <style id="jss-server-side">${props.css}</style>
    <style id="main-css"></style>
  </head>
  <body>
    <div id="root">`)

export const renderFooter = (props: any): string => (
`</div>
    <script>window.__INITIAL_STATE__ = ${serialize(props.initialData)}</script>
    ${props.assets && props.assets.js ? (
      props.assets.js.map((asset: string) => `<script src="/${asset}"></script>`).join('')
    ) : `<script src="${props.publicPath.replace(/\/$/, '')}/assets/client.js"></script>`}
  </body>
</html>
`)

export default (body: string, props: any): string => {
  return `${renderHeader(props)}${body}${renderFooter(props)}`
}
