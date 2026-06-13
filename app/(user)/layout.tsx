import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'
import CosmosBackground from '@/components/CosmosBackground'
import SmoothScroll from '@/components/SmoothScroll'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CosmosBackground />
      <Navbar />
      {/* fixed elements stay outside SmoothScroll — its transform container
          would re-anchor position:fixed descendants */}
      <SmoothScroll>
        <section>{children}</section>
        <Footer />
      </SmoothScroll>
      <WhatsApp />
    </>
  )
}
