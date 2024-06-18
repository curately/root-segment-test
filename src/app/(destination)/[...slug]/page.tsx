import Link from "next/link";

interface Props {
  params: { slug: Array<string> };
}

export const dynamic = "force-static";
export const generateStaticParams = async () => []; //https://github.com/vercel/next.js/pull/66151

//export const dynamicParams = false;
export default function DestinationPage({ params }: Props) {
  const prismaSlug = params.slug.join("/");
  return (
    <>
      <h2>Root catch all segment</h2>
      <div>num slugs: {params.slug.length}</div>
      {params.slug.map((slug, index) => (
        <div key={index}>Slug Param: {slug}</div>
      ))}
      <div>Slug: {prismaSlug}</div>
      <ShowSlug slug={prismaSlug} />
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

function ShowSlug({ slug }: { slug: string }) {
  return <div>Show Slug: {slug}</div>;
}
