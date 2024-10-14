import Image from "next/image"
import TextAnim from "./animatedText"
import { FaChevronDown } from "react-icons/fa6"

const Delete = () => {
  return (<><div className="flex-grow relative">
    <Image
      src="/about/bg-2.jpg"
      alt=""
      layout="fill"
      objectFit="cover"
      priority
      className="z-0"
    />
    <div className="absolute inset-0 bg-creatBG/50 backdrop-blur-sm"></div>
    <div className="absolute inset-0 z-10 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-y-12">
          <TextAnim>
            <h1 className="text-7xl font-bold text-white/90">Who We Are?</h1>
          </TextAnim>
          <div className="ml-auto">
            <TextAnim dir="<">
              <p className="text-5xl font-bold tracking-tight text-white/70 text-right">
                CREAT Company LLC is a professional firm specializing in project management,
                offering modern approaches and innovative solutions.
                Established in 2019, our company has quickly gained recognition
                in the industry by successfully completing numerous projects both locally and internationally.</p>
            </TextAnim>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
      <FaChevronDown className="text-white text-3xl animate-bounce" />
    </div>
  </div>
    <div className="flex flex-col gap-y-12">
      <TextAnim dir=">">
        <h1 className="text-7xl font-medium leading-tight text-nowrap text-center text-white/80">Our Misson</h1>
      </TextAnim>
      <TextAnim delay={0.1}>
        <h1 className="text-3xl font-medium text-white/80 max-w-[60%]">Our mission is to fully meet our clients' needs,
          support their goals, and ultimately ensure the successful completion of their projects.
          At CREAT Company LLC, we offer customized approaches to project management,
          tailoring our solutions to the specific requirements of each project.
          Our primary focus is to earn our clients' trust and provide them with top-quality services that meet their exact demands.</h1>
      </TextAnim>
    </div>
    <div className="self-end flex flex-col gap-y-4">
      <TextAnim dir="<">
        <h1 className="text-7xl font-semibold leading-tight text-nowrap text-center text-white/80">Our Values</h1>
      </TextAnim>
      <TextAnim dir="<" delay={0.1}>
        <h1 className="text-3xl font-medium text-center text-white/80">
          CREAT Company LLC is guided by several core values</h1>
      </TextAnim>
    </div>
  </>)
}
export default Delete
