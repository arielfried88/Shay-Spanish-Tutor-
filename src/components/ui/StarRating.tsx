interface Props {
  stars: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }

export default function StarRating({ stars, max = 3, size = 'md', animate = false }: Props) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`${sizes[size]} transition-all duration-300 ${
            i < stars
              ? animate ? 'animate-star-burst' : 'drop-shadow-sm'
              : 'opacity-30'
          }`}
          style={animate && i < stars ? { animationDelay: `${i * 150}ms` } : undefined}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}
