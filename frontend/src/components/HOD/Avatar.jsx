import { getInitials } from '../../utils/HOD/helpers'

const GRADIENTS = [
  'from-blue-500 to-violet-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-rose-500',
  'from-sky-500 to-blue-600',
]

export default function Avatar({ name = '', initials, size = 36, index = 0 }) {
  const text = initials || getInitials(name)
  const grad = GRADIENTS[index % GRADIENTS.length]
  const fontSize = Math.round(size * 0.36)

  return (
    <div
      className={`rounded-full bg-linear-to-br ${grad} flex items-center justify-center text-white font-bold shrink-0 select-none`}
      style={{ width: size, height: size, fontSize }}
    >
      {text}
    </div>
  )
}
