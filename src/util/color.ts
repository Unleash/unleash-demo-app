export interface IColor {
  light: string
  main: string
  dark: string
}

const hexToRgb = (hexValue: string): number[] => {
  const hex = hexValue.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return [r, g, b]
}

export const getColor = (colorValue = 'black'): IColor => {
  let r, g, b
  if (colorValue.startsWith('#')) {
    ;[r, g, b] = hexToRgb(colorValue)
  } else {
    const tempEl = document.createElement('div')
    tempEl.style.color = colorValue
    document.body.appendChild(tempEl)
    const computedColor = window.getComputedStyle(tempEl).color
    document.body.removeChild(tempEl)
    const matches = computedColor.match(/rgba?\((\d+), (\d+), (\d+)/)
    if (matches) {
      ;[r, g, b] = matches.slice(1).map(parseFloat)
    } else {
      ;[r, g, b] = [0, 0, 0]
    }
  }
  const rgb = `${r}, ${g}, ${b}`
  return {
    light: `rgba(${rgb}, .05)`,
    main: `rgba(${rgb}, .5)`,
    dark: `rgba(${rgb}, .8)`
  }
}
