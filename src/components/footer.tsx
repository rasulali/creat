import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { items } from "./navbar";
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  return <footer className={cn(
    "flex flex-col items-center bg-creatBGLight text-white",
    className
  )}>
    <div className="flex items-center justify-center max-w-[1200px] mx-auto">
      <div className="w-full flex gap-x-32 py-12">
        <div className="flex flex-col">
          <Link href="/" className="w-48 h-fit group">
            <img src="/logos/horizontal_white.svg" alt="" className="w-full h-full object-cover" />
          </Link>
          <h1 className="text-xl font-medium mt-4"> Comprehensive Solutions <br />
            Tailored to You by <span className="font-bold mx-1">Creat</span>
          </h1>
          <div className="flex gap-x-4 mt-8">
            <Link href="https://www.instagram.com/" className="group rounded-full border-2 hover:border-creatBright transition-colors">
              <FaInstagram className="m-2 text-xl group-hover:text-creatBright transition-colors" />
            </Link>
            <Link href="https://linkedin.com/" className="group rounded-full border-2 hover:border-creatBright transition-colors">
              <FaLinkedinIn className="m-2 text-xl group-hover:text-creatBright transition-colors" />
            </Link>
            <Link href="https://www.facebook.com/" className="group rounded-full border-2 hover:border-creatBright transition-colors">
              <FaFacebookF className="m-2 text-xl group-hover:text-creatBright transition-colors" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Quick Links</h1>
          <div className="flex flex-col gap-y-2">
            {items.map((item, index) => (
              <Link key={index} href={item.href}
                className="text-lg font-medium hover:text-creatBright transition-colors capitalize">{item.label}</Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Services</h1>
          <div className="flex flex-col gap-y-2">
            <Link href="/services"
              className="text-lg font-medium hover:text-creatBright transition-colors capitalize">Renewable Energy</Link>
            <Link href="/services"
              className="text-lg font-medium hover:text-creatBright transition-colors capitalize">Construction</Link>
            <Link href="/services"
              className="text-lg font-medium hover:text-creatBright transition-colors capitalize">Technical Planning</Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Contacts</h1>
          <div className="flex flex-col gap-y-2">
            <Link href="tel:+1 123 456 7890"
              className="text-lg font-medium hover:text-creatBright transition-colors">+1 123 456 7890
            </Link>
            <Link href="mailto:contact@creat.az" className="text-lg font-medium hover:text-creatBright transition-colors">
              contact@creat.az
            </Link>
            <Link href="https://maps.app.goo.gl/CS2koQtTpYHTVvRq7" target="_blank">
              <p className="text-lg font-medium hover:text-creatBright transition-colors">
                Baku, Azerbaijan<br />
                Samad vurgun 110
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-creatBG flex items-center justify-center py-5 w-full gap-x-4 text-lg">
      <h1 >©<span className="text-creatBright mx-1 font-medium">Creat LLC</span>2024</h1>
      <div className="h-4 w-px bg-neutral-300" />
      <span className="text-neutral-300">Built by
        <Link target="_blank" href="https://github.com/rasulali/" className="mx-2 capitalize font-bold hover:text-white transition-colors">Rasul Ali</Link></span>
    </div>
  </footer>;
};
export default Footer;
