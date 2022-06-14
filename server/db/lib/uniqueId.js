export const uniqueId = () =>
  parseInt(
    (Date.now() * Math.round(Math.random() * 10000)).toString().replace(/\./gm, '')
  ).toString(36)
