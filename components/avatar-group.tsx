import cn from 'classnames'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

export interface AvatarData {
  src?: string
  name: string
  fallback?: string
}

interface AvatarGroupProps {
  avatars: AvatarData[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
  overlap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AvatarGroup({
  avatars,
  max = 5,
  size = 'md',
  overlap = 'md',
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  // Overlap classes
  const overlapClasses = {
    sm: '-ml-2',
    md: '-ml-3',
    lg: '-ml-4',
  }

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex">
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={`${index}-${avatar.name}`}
            className={cn(
              'border-2 border-background',
              sizeClasses[size],
              index > 0 && overlapClasses[overlap]
            )}
          >
            <AvatarImage src={avatar.src} alt={avatar.name} />
            <AvatarFallback>
              {avatar.fallback || avatar.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              'flex items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground',
              sizeClasses[size],
              overlapClasses[overlap]
            )}
          >
            <span className="font-medium text-xs">+{remainingCount}</span>
          </div>
        )}
      </div>
    </div>
  )
}
