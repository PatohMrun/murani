import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import CosmosBackground from '@/components/CosmosBackground'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CosmosBackground />
      <Navbar />
      <section>{children}</section>
      <Footer />
      <WhatsApp />
    </>
  )
}
