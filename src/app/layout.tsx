import { StrictMode, Suspense } from "react";
import "./globals.css";
type RouteLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: RouteLayoutProps) {
  return (
    <html>
      <head />
      <body>
        <StrictMode>{children}</StrictMode>
      </body>
    </html>
  );
}
