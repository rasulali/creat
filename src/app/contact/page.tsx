'use client'
import Footer from "@/components/footer"
import { GoogleMapProvider } from "@/components/googleMapProvider"
import GoogleMap from "@/components/map"
import Nav from "@/components/navbar"

const Contact = () => {
  return <main>
    <Nav />
    <section className="w-full min-h-dvh bg-creatBG flex flex-col justify-end">
      <GoogleMapProvider>
        <GoogleMap className="w-full h-[300px]" />
      </GoogleMapProvider>
    </section>
    <Footer />
  </main>
}
export default Contact
