export const getInitialState = () => {
  const el = document.getElementById('initial-data')
  const json = el ? (el.getAttribute('data-json') || '{}') : '{}'
  const initialState = JSON.parse(json)
  if (el) {
    document.body.removeChild(el)
  }
  return initialState
}
