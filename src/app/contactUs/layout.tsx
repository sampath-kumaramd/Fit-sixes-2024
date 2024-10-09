import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/header";

export default function contactUs({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className=''>
        <Header/>
        <main className=""> {children}</main>
        <Footer/>
      </div>
    );
  }
  