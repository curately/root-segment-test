import { StrictMode, Suspense } from "react";
export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <StrictMode>{children}</StrictMode>
      </body>
    </html>
  );
}
