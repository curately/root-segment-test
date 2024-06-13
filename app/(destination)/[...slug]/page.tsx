import Link from "next/link";

interface Props {
  params: { slug: Array<string> };
}
export const dynamicParams = false;
export default function DestinatinPage({ params }: Props) {
  const prismaSlug = params.slug.join("/");
  return (
    <>
      <h2>Root catch all segment</h2>
      <div>Slug: {prismaSlug}</div>
      <ul>
        <li>
          <Link href="/germany">Germany (prefetch test)</Link>
        </li>
        <li>
          <Link href="/france">France (prefetch test)</Link>
        </li>
      </ul>
    </>
  );
}
