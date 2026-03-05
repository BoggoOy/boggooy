import Navigation from "@/src/components/layout/Navigation";
import Footer from "@/src/components/layout/Footer";
import { SidePanelProvider } from "@/src/context/SidePanelContext";
import SidePanel from "@/src/components/ui/SidePanel";
import ContactForm from "@/src/components/sections/ContactForm";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidePanelProvider>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <SidePanel>
        <ContactForm />
      </SidePanel>
    </SidePanelProvider>
  );
}
