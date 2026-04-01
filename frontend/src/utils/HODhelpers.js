export const getInitials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export const calcTL2Total = ({ teaching, subject, communication, engagement }) =>
  Math.round(((teaching + subject + communication + engagement) / 4) * 10)

export const calcTL4Base = (courses) =>
  Math.round(
    (courses.reduce((s, c) => s + (c.result / 100) * 10, 0) / courses.length) * 10
  )
