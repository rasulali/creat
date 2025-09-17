import Link from "next/link";
import { SiInstagram, SiLinkedin, SiFacebook } from "react-icons/si";
import { items } from "./navbar";
import { categories } from "@/lib/helperFunctions";

const Footer = () => {
  return (
    <footer
      className="flex flex-col items-center bg-creatBGLight text-white \
      relative w-full md:px-28 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 md:block hidden">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 1080 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 107L22.5 95.2C45 83.3 90 59.7 135 55.5C180 51.3 225 66.7 270 66.7C315 66.7 360 51.3 405 46.2C450 41 495 46 540 49.2C585 52.3 630 53.7 675 64.8C720 76 765 97 810 98.8C855 100.7 900 83.3 945 73.5C990 63.7 1035 61.3 1057.5 60.2L1080 59L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#0c3d91"
          ></path>
          <path
            d="M0 125L22.5 119.7C45 114.3 90 103.7 135 106.3C180 109 225 125 270 130C315 135 360 129 405 115.7C450 102.3 495 81.7 540 76.5C585 71.3 630 81.7 675 81.3C720 81 765 70 810 72.5C855 75 900 91 945 91.7C990 92.3 1035 77.7 1057.5 70.3L1080 63L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#083a88"
          ></path>
          <path
            d="M0 93L22.5 96.2C45 99.3 90 105.7 135 103.8C180 102 225 92 270 98.8C315 105.7 360 129.3 405 143.2C450 157 495 161 540 154.3C585 147.7 630 130.3 675 129C720 127.7 765 142.3 810 136.5C855 130.7 900 104.3 945 104.8C990 105.3 1035 132.7 1057.5 146.3L1080 160L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#06367f"
          ></path>
          <path
            d="M0 170L22.5 160.7C45 151.3 90 132.7 135 133C180 133.3 225 152.7 270 160.5C315 168.3 360 164.7 405 163C450 161.3 495 161.7 540 163C585 164.3 630 166.7 675 163.8C720 161 765 153 810 143.5C855 134 900 123 945 122.3C990 121.7 1035 131.3 1057.5 136.2L1080 141L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#053375"
          ></path>
          <path
            d="M0 174L22.5 174.8C45 175.7 90 177.3 135 170.8C180 164.3 225 149.7 270 151.8C315 154 360 173 405 176C450 179 495 166 540 160.3C585 154.7 630 156.3 675 159.8C720 163.3 765 168.7 810 168.2C855 167.7 900 161.3 945 164C990 166.7 1035 178.3 1057.5 184.2L1080 190L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#052f6c"
          ></path>
          <path
            d="M0 155L22.5 157C45 159 90 163 135 163.5C180 164 225 161 270 158.8C315 156.7 360 155.3 405 160.7C450 166 495 178 540 186.7C585 195.3 630 200.7 675 192.8C720 185 765 164 810 163.8C855 163.7 900 184.3 945 194.2C990 204 1035 203 1057.5 202.5L1080 202L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#052c63"
          ></path>
          <path
            d="M0 196L22.5 196C45 196 90 196 135 196.5C180 197 225 198 270 193.5C315 189 360 179 405 180C450 181 495 193 540 193.7C585 194.3 630 183.7 675 182.2C720 180.7 765 188.3 810 186C855 183.7 900 171.3 945 173.8C990 176.3 1035 193.7 1057.5 202.3L1080 211L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#05285b"
          ></path>
          <path
            d="M0 180L22.5 186.8C45 193.7 90 207.3 135 210.3C180 213.3 225 205.7 270 207.3C315 209 360 220 405 219.7C450 219.3 495 207.7 540 203C585 198.3 630 200.7 675 198.5C720 196.3 765 189.7 810 191.8C855 194 900 205 945 208.5C990 212 1035 208 1057.5 206L1080 204L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#062552"
          ></path>
          <path
            d="M0 234L22.5 234.8C45 235.7 90 237.3 135 234.2C180 231 225 223 270 221.7C315 220.3 360 225.7 405 229.7C450 233.7 495 236.3 540 234C585 231.7 630 224.3 675 218.5C720 212.7 765 208.3 810 213.2C855 218 900 232 945 236C990 240 1035 234 1057.5 231L1080 228L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#07214a"
          ></path>
          <path
            d="M0 253L22.5 250.7C45 248.3 90 243.7 135 244.3C180 245 225 251 270 252.8C315 254.7 360 252.3 405 252C450 251.7 495 253.3 540 249.2C585 245 630 235 675 235.3C720 235.7 765 246.3 810 248.3C855 250.3 900 243.7 945 239.8C990 236 1035 235 1057.5 234.5L1080 234L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#071e41"
          ></path>
          <path
            d="M0 274L22.5 269.2C45 264.3 90 254.7 135 249.7C180 244.7 225 244.3 270 248C315 251.7 360 259.3 405 262.8C450 266.3 495 265.7 540 261.5C585 257.3 630 249.7 675 247.8C720 246 765 250 810 254.7C855 259.3 900 264.7 945 264.5C990 264.3 1035 258.7 1057.5 255.8L1080 253L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#081a39"
          ></path>
          <path
            d="M0 283L22.5 283.8C45 284.7 90 286.3 135 283.2C180 280 225 272 270 270.8C315 269.7 360 275.3 405 275.3C450 275.3 495 269.7 540 269.3C585 269 630 274 675 275.8C720 277.7 765 276.3 810 275.8C855 275.3 900 275.7 945 275.3C990 275 1035 274 1057.5 273.5L1080 273L1080 301L1057.5 301C1035 301 990 301 945 301C900 301 855 301 810 301C765 301 720 301 675 301C630 301 585 301 540 301C495 301 450 301 405 301C360 301 315 301 270 301C225 301 180 301 135 301C90 301 45 301 22.5 301L0 301Z"
            fill="#081731"
          ></path>
        </svg>
      </div>
      <div className="flex flex-col justify-center md:max-w-[1600px] w-full md:mx-auto z-10">
        <div className="flex w-full items-center justify-between md:py-20 py-6">
          <Link
            aria-label="Visit Home Page"
            rel="noopener noreferrer"
            href="/"
            className="md:w-64 w-36 h-fit block"
          >
            <img
              src="/logos/horizontal.svg"
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="flex md:gap-x-4 gap-x-2">
            <Link
              aria-label="Visit Our Instagram Page"
              rel="noopener noreferrer"
              href="https://www.instagram.com/"
              className="group block"
            >
              <SiInstagram className="md:text-4xl text-xl group-hover:text-creatBright transition-colors" />
            </Link>
            <Link
              aria-label="Visit Our Linkedin Page"
              rel="noopener noreferrer"
              href="https://linkedin.com/"
              className="group block"
            >
              <SiLinkedin className="md:text-4xl text-xl group-hover:text-creatBright transition-colors" />
            </Link>
            <Link
              aria-label="Visit Our Facebook Page"
              rel="noopener noreferrer"
              href="https://www.facebook.com/"
              className="group block"
            >
              <SiFacebook className="md:text-4xl text-xl group-hover:text-creatBright transition-colors" />
            </Link>
          </div>
        </div>
        <div className="w-full flex md:flex-row flex-col items-top justify-around md:py-10 border-y border-white/10">
          <div className="flex flex-col md:gap-y-8 md:p-8 py-3 gap-y-2">
            <h1 className="md:text-3xl text-lg font-bold">Address</h1>
            <Link
              aria-label="View on Google Maps"
              rel="noopener noreferrer"
              href="https://maps.app.goo.gl/CS2koQtTpYHTVvRq7"
              target="_blank"
            >
              <p className="md:text-lg font-medium hover:text-creatBright transition-colors">
                Baku, Azerbaijan <br />
                Samad Vurgun st. 110 <br />
                Vurgun Residence Building <br />
                2nd Floor, Creat Office
              </p>
            </Link>
          </div>
          <div className="flex flex-col md:gap-y-8 md:p-8 py-3 gap-y-2">
            <h1 className="md:text-3xl text-lg font-bold">Quick Links</h1>
            <div className="flex flex-col md:gap-y-2">
              {items.map((item, index) => (
                <Link
                  aria-label={`Visit ${item.label} Page`}
                  rel="noopener noreferrer"
                  key={index}
                  href={item.href}
                  className="md:text-lg font-medium hover:text-creatBright transition-colors capitalize"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div
            className="flex flex-col relative md:gap-y-8 gap-y-2 md:p-8 md:bg-white/5 \
            md:rounded-2xl md:backdrop-blur-sm md:border border-white/10"
          >
            <h1 className="md:text-3xl text-lg font-bold">Services</h1>
            <div className="md:grid grid-cols-2 md:gap-y-2 gap-y-1 md:gap-x-4 flex flex-col">
              {Object.entries(categories).map(([key, category]) => (
                <Link
                  aria-label={`Visit ${category.name} Page`}
                  rel="noopener noreferrer"
                  key={key}
                  href={`/services?service=${key}`}
                  className="md:text-lg font-medium hover:text-creatBright \
        transition-colors border-b border-white/10 last:border-0 md:border-0"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:gap-y-8 gap-y-2 md:p-8 py-3">
            <h1 className="md:text-3xl text-lg font-bold">Contacts</h1>
            <div className="flex flex-col md:gap-y-4 gap-y-2">
              <div className="flex flex-col">
                <a
                  aria-label="Call +994554158215"
                  href="tel:+994554158215"
                  className="md:text-lg font-medium hover:text-creatBright transition-colors"
                >
                  (994) 55 415 82 15
                </a>
                <a
                  aria-label="Call +994502242944"
                  href="tel:+994502242944"
                  className="md:text-lg font-medium hover:text-creatBright transition-colors"
                >
                  (994) 50 224 29 44
                </a>
              </div>
              <div className="flex flex-col">
                <a
                  aria-label="Email info@creat.az"
                  href="mailto:info@creat.az"
                  className="md:text-lg font-medium hover:text-creatBright transition-colors"
                >
                  info@creat.az
                </a>
                <a
                  aria-label="Email contact@creat.az"
                  href="mailto:contact@creat.az"
                  className="md:text-lg font-medium hover:text-creatBright transition-colors"
                >
                  contact@creat.az
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:h-20 py-3 md:py-0 w-full md:gap-x-4 gap-x-2 md:text-lg text-sm">
          <div className="flex md:gap-x-2 items-end leading-none">
            <span>©</span>
            <span className="text-creatBright mx-1 font-medium">Creat LLC</span>
            <span>2025</span>
          </div>
          <div className="h-4 w-px bg-neutral-300" />
          <span className="text-neutral-300">
            Built by
            <Link
              target="_blank"
              href="https://alee.az"
              className="mx-2 capitalize font-bold hover:text-white transition-colors"
            >
              Rasul Aliyev
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
