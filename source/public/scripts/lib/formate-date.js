/* eslint-disable no-undef */
export const formateDate = (date) => {
  if (!date) {
    return ''
  }
  const dueDate = moment(date)
  const today = moment().startOf('day')

  const days = Math.round(moment.duration(dueDate - today).asDays())

  switch (days) {
    case -2:
      return 'vorgestern'
    case -1:
      return 'gestern'
    case 0:
      return 'heute'
    case 1:
      return 'morgen'
    case 2:
      return 'übermorgen'
    default:
      return moment(date).format('DD.MM.YYYY')
  }
}

export const parseDate = (date) => {
  if (!date) {
    return ''
  }
  return moment(date).format('YYYY-MM-DD')
}

export const toDate = (date) => {
  if (!date) {
    return null
  }
  return moment(date).toDate()
}
