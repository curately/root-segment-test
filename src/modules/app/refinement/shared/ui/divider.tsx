interface Props {
  borderClassName: string
  height?: 'full' | 'half'
}
export function Divider({ borderClassName, height = 'half' }: Props) {
  return (
    <div className={`bg-white ${borderClassName} border-l-0 border-r-0 h-14 `}>
      <div className="flex flex-col items-center justify-center ">
        {height === 'half' && <div className="h-3"></div>}
        <div className={`${height === 'half' ? 'h-6' : 'h-14'} bg-pill w-[1px]`}>
          <span>&nbsp;</span>
        </div>
        {height === 'half' && <div className="h-3"></div>}
      </div>
    </div>
  )
}
