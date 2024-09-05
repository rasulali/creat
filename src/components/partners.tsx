import { motion } from 'framer-motion'
import Image from "next/image"
const Partners = () => {
  type partners = { logo: string, name: string }

  const partners: partners[] = [
    {
      logo: "/partners/acpd.png",
      name: "ACPD"
    },
    {
      logo: "/partners/acwa.png",
      name: "ACWA"
    },
    {
      logo: "/partners/airlines.png",
      name: "Airlines"
    },
    {
      logo: "/partners/aqta.png",
      name: "AQTA"
    },
    {
      logo: "/partners/aretn.png",
      name: "ARETN"
    },
    {
      logo: "/partners/azerblast.png",
      name: "AzərBlast"
    },
    {
      logo: "/partners/azergold.png",
      name: "AzərGold"
    },
    {
      logo: "/partners/bp.png",
      name: "BP"
    },
    {
      logo: "/partners/cop29.png",
      name: "COP29"
    },
    {
      logo: "/partners/cqa.png",
      name: "CQA"
    },
    {
      logo: "/partners/ddf.png",
      name: "DDF"
    },
    {
      logo: "/partners/eco.png",
      name: "ECO"
    },
    {
      logo: "/partners/encotec.png",
      name: "Encotec"
    },
    {
      logo: "/partners/Frame 36.png",
      name: "Frame 36"
    },
    {
      logo: "/partners/ilf.png",
      name: "ILF"
    },
    {
      logo: "/partners/maqro.png",
      name: "Maqro"
    },
    {
      logo: "/partners/mst.png",
      name: "MST"
    },
    {
      logo: "/partners/nfc.png",
      name: "NFC"
    },
    {
      logo: "/partners/pmd.png",
      name: "PMD"
    },
    {
      logo: "/partners/powerchina.png",
      name: "PowerChina"
    },
    {
      logo: "/partners/qbti.png",
      name: "QBTI"
    },
    {
      logo: "/partners/referans.png",
      name: "Referans"
    },
    {
      logo: "/partners/sobsan.png",
      name: "Sobsan"
    },
    {
      logo: "/partners/socar.png",
      name: "SOCAR"
    },
    {
      logo: "/partners/suez.png",
      name: "Suez"
    },
    {
      logo: "/partners/surkahani.png",
      name: "Surkhanı"
    },
    {
      logo: "/partners/technol.png",
      name: "Technol"
    },
    {
      logo: "/partners/tractabel.png",
      name: "Tractabel"
    },
    {
      logo: "/partners/ypt.png",
      name: "YPT"
    }
  ]

  return (<div className="w-full overflow-hidden whitespace-nowrap border-y border-white/10 md:py-4 relative">
    {[...Array(2)].map((_, index) => (
      <motion.div
        animate={{ x: 'calc(-100% - 0px' }}
        transition={{
          duration: 60,
          ease: 'linear',
          repeat: Infinity,
        }}
        key={index} className="inline-flex justify-center w-max">
        {partners.map((partner, i) => (
          <div className="inline-flex items-center">
            <div key={`${index}-${i}`} className="inline-flex h-24 outline outline-2 outline-white">
              <Image
                src={partner.logo} alt={partner.name}
                width={512} quality={50} height={256}
                className="w-full h-full object-fit mix-blend-multiply" />
            </div>
            <div className="h-1/2 w-0.5 bg-white/10 mx-4 hidden" />
          </div>

        ))}
      </motion.div>
    ))}
  </div>)
}
export default Partners
