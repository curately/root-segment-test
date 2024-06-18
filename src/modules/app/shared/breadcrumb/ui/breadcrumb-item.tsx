import Link from 'next/link'
import { ChevronRight } from 'react-feather'

interface Props {
  label: string
  url: string
  isLastBreadcrumbItem: boolean
  shouldLinkToLastItem: boolean
}
export function BreadcrumbItem(props: Props) {
  if (props.isLastBreadcrumbItem) {
    return <LastBreadCrumbItem {...props} />
  }
  return (
    <BreadCrumbLink label={props.label} url={props.url}>
      <span className="px-0 md:px-1 text-medium" data-testid="breadcrumb-separator">
        <ChevronRight size={16} className="inline-block" />
      </span>
    </BreadCrumbLink>
  )
}

export function LastBreadCrumbItem(props: { url: string; label: string; shouldLinkToLastItem: boolean }) {
  if (props.shouldLinkToLastItem) {
    return <BreadCrumbLink url={props.url} label={props.label} />
  }
  return <span className="text-sm text-dark">{props.label}</span>
}

export function BreadCrumbLink(props: { url: string; label: string; children?: React.ReactNode }) {
  return (
    <>
      <Link href={`${props.url}`} className="text-sm underline text-brand underline-offset-4">
        {props.label}
      </Link>
      {props.children}
    </>
  )
}
