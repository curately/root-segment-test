import { cn } from '@/shared/ui/helpers'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  props?: React.HTMLProps<HTMLDivElement>
}

function PropertyExplorer({ children, className, props }: ContainerProps) {
  return (
    <div className={cn('w-full sm:flex sm:flex-row sm:py-0', { className })} {...props}>
      {children}
    </div>
  )
}

function PropertyView({ children, className, props }: ContainerProps) {
  return (
    <div
      className={cn('xl:min-w[700px] w-full md:w-6/12 md:p-8 lg:w-7/12 xl:w-7/12 2xl:w-5/12', { className })}
      {...props}
    >
      {children}
    </div>
  )
}

function MapView({ children, className, props }: ContainerProps) {
  return (
    <div
      {...props}
      style={{ height: 'calc(100vh - 150px)' }}
      className={cn(
        'sticky hidden w-full bg-pill sm:block md:top-[calc(theme(space.header-lg)+theme(space.searchbar-lg))]  md:h-[calc(theme(space.header-lg)+theme(space.searchbar-lg))] md:w-6/12 lg:w-5/12 xl:w-5/12 2xl:w-7/12',
        { className },
      )}
    >
      {children}
    </div>
  )
}

function PropertyViewTopSlot({ children, className = '', props }: ContainerProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

function PropertyViewMiddleSlot({ children, className = '', props }: ContainerProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

function PropertyViewBottomSlot({ children, className = '', props }: ContainerProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function PropertyList({ children, props, className = '' }: ContainerProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', { className })} {...props}>
      {children}
    </div>
  )
}

PropertyExplorer.PropertyView = PropertyView
PropertyExplorer.MapView = MapView
PropertyView.Top = PropertyViewTopSlot
PropertyView.Middle = PropertyViewMiddleSlot
PropertyView.Bottom = PropertyViewBottomSlot
PropertyView.Properties = PropertyList

export { PropertyExplorer, PropertyView, MapView }
