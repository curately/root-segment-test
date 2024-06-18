import { X as CancelIcon } from "react-feather"

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>
}
export function CancelButton({ onClick }: Props) {
  return (
    <div className="flex items-center justify-center w-10 h-10 outline-none cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-center w-8 h-8 border-0 rounded-full hover:border-pill hover:bg-ivory">
        <CancelIcon className="w-4 h-4 font-bold text-dark/70" aria-hidden="true" />
      </div>
    </div>
  )
}
