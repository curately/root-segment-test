export const dynamicParams = false;
//export const dynamic = 'force-static'
export async function generateStaticParams() {
  const routes = ["", "waterpark", "playground"];
  return routes.map((route) => ({
    slug: [route],
  }));
}

interface Props {
  params: { slug: Array<string> };
}

export default async function CurationPage({ params }: Props) {
  const slug = params.slug ? params.slug.join("/") : "";
  return (
    <>
      <h2>Curation catch-all segment</h2>
      <div>Slug: {slug}</div>
    </>
  );
}
