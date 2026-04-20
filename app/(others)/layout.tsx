
import Navbar from "@/components/shared/navbar";
import Header from "../(landing)/navbar";
import Footer from "../(landing)/footer";

export default function OthersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
