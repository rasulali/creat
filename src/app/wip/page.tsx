"use client"
import { AuroraBackground } from "@/components/aurora-background"
import { FlipWords } from "@/components/flipWords"
import Footer from "@/components/footer"
import Nav from "@/components/navbar"

const WorkInProgress = () => {
  return (
    <main className="text-white">

      <AuroraBackground>
        <section
          className="flex flex-col min-h-screen">
          <Nav isTransparent={true} />
          <div className="flex items-center justify-center h-full">
            <h1 className="text-5xl font-jost font-[500]">
              <FlipWords delay={5000} duration={2000} words={["Sorry, This Website is Still Under Construction",
                "Great Things Takes Time :)"]} />
            </h1>
          </div>
        </section>
      </AuroraBackground>
      <Footer />
    </main>
  )
}
export default WorkInProgress
