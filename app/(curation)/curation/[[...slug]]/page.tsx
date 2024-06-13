//export const dynamicParams = false;
export const dynamic = "force-static";
import { notFound } from "next/navigation";
const routes = ["", "waterpark", "playground"];
export async function generateStaticParams() {
  return routes.map((route) => ({
    slug: [route],
  }));
}

interface Props {
  params: { slug: Array<string> };
}

export default async function CurationPage({ params }: Props) {
  const paramsToCheck = params.slug ? params.slug[0] : "";
  //check if params.slug is in routes array
  if (!routes.includes(paramsToCheck)) {
    notFound();
  }

  const slug = params.slug ? params.slug.join("/") : "";
  return (
    <>
      <h2>Curation catch-all segment</h2>
      <div>Slug: {slug}</div>
    </>
  );
}
