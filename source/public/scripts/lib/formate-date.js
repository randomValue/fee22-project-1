/* eslint-disable no-undef */
export const formateDate = (date) => {
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
