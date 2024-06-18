/** Add your relevant code here for the issue to reproduce */
import Link from "next/link";
export default function Home() {
  return (
    <>
      <h1>Homepage</h1>
      <ul>
        <li>
          <Link href="curation/waterpark">Valid Link</Link>
        </li>
        <li>
          <Link href="curation/i-dont-exist">This link should 404</Link>
        </li>
      </ul>
    </>
  );
}
