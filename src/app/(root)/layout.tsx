import { Navbar } from "@/components/navbar/navbar";
import { Topbar } from "@/components/navbar/topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Topbar />
      <Navbar />
      {children}
    </section>
  );
}
