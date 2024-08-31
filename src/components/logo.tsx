import Link from "next/link"
import { motion } from 'framer-motion'
import { useState } from "react"

interface LogoProps {
  className?: string
  href?: string
}

const Logo: React.FC<LogoProps> = ({ href, className }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (<>
    <Link href={href || "/"} className={`${className} group`} id="logo" data-tooltip-offset={10}>
      <motion.svg
        onHoverStart={() => { setIsHovered(true) }}
        onHoverEnd={() => { setIsHovered(false) }}

        animate={{
          filter: isHovered ? "drop-shadow(0px 0px 12px #e4145a)" : "drop-shadow(0px 0px 0px #e4145a)"
        }}
        className="w-full h-full"
        viewBox="0 0 742 164" fill="none" xmlns="http://www.w3.org/2000/svg">

        <motion.g
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            mass: 0.5,
            damping: 20,
          }}
        >
          <path className="absolute fill-creatBright" d="M30.9297 163.33C30.9297 135.49 53.4997 112.92 81.3397 112.92C109.18 112.92 131.75 135.49 131.75 163.33C131.75 144.77 116.7 129.72 98.1397 129.72C92.0197 129.72 86.2797 131.36 81.3397 134.22C71.2897 140.03 64.5397 150.89 64.5397 163.33H30.9297Z" />
          <path className="absolute fill-creatDark" d="M81.3398 134.22C86.2798 131.36 92.0199 129.72 98.1399 129.72C116.7 129.72 131.75 144.77 131.75 163.33H98.1399C98.1399 150.89 91.3898 140.03 81.3398 134.22Z" />
        </motion.g>
        <motion.g
          animate={{ y: isHovered ? 5 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            mass: 0.5,
            damping: 20,
          }}
        >
          <path className="absolute fill-creatBright" d="M30.9297 0.669922C30.9297 19.2299 45.9797 34.2799 64.5397 34.2799C70.6597 34.2799 76.3997 32.6399 81.3397 29.7799C91.3897 23.9699 98.1397 13.1099 98.1397 0.669922H131.75C131.75 28.5099 109.18 51.0799 81.3397 51.0799C53.4997 51.0799 30.9297 28.5199 30.9297 0.669922Z" />
          <path className="absolute fill-creatDark" d="M30.9297 0.669922H64.5397C64.5397 13.1099 71.2997 23.9699 81.3397 29.7799C76.3997 32.6399 70.6597 34.2799 64.5397 34.2799C45.9697 34.2799 30.9297 19.2299 30.9297 0.669922Z" />
        </motion.g>
        <motion.g
          animate={{ x: isHovered ? -5 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            mass: 0.5,
            damping: 20,
          }}
        >
          <path className="absolute fill-creatBright" d="M112.26 81.9998C112.26 54.1598 134.83 31.5898 162.67 31.5898C144.11 31.5898 129.06 46.6399 129.06 65.1999C129.06 71.3199 130.7 77.0598 133.56 81.9998C139.37 92.0498 150.23 98.7998 162.67 98.7998V132.41C134.83 132.41 112.26 109.84 112.26 81.9998Z" />
          <path className="absolute fill-creatDark" d="M129.061 65.1999C129.061 46.6399 144.111 31.5898 162.671 31.5898V65.1999C150.231 65.1999 139.371 71.9598 133.561 81.9998C130.701 77.0598 129.061 71.3199 129.061 65.1999Z" />
        </motion.g>
        <motion.g
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            mass: 0.5,
            damping: 20,
          }}
        >
          <path className="absolute fill-creatBright" d="M0.00976562 65.1999V31.5898C27.8498 31.5898 50.4198 54.1598 50.4198 81.9998C50.4198 109.84 27.8498 132.41 0.00976562 132.41C18.5698 132.41 33.6198 117.36 33.6198 98.7998C33.6198 92.6798 31.9798 86.9398 29.1198 81.9998C23.3098 71.9498 12.4498 65.1999 0.00976562 65.1999Z" />
          <path className="absolute fill-creatDark" d="M0.00976562 132.41V98.7997C12.4498 98.7997 23.3098 92.0398 29.1198 81.9998C31.9798 86.9398 33.6198 92.6797 33.6198 98.7997C33.6198 117.37 18.5698 132.41 0.00976562 132.41Z" />
        </motion.g>
        <motion.g
          animate={{
            filter: isHovered ?
              "drop-shadow(5px 5px 12px #e4145a)"
              : "drop-shadow(0px 0px 0px #081731)",
          }}
        >
          <path fill="white" id="C" d="M292.31 94.7599H313.97C311.42 115.77 296.61 132.18 264.61 132.18C234.67 132.18 213.34 112.46 213.34 81.8098C213.34 51.5898 235 31.5898 264.61 31.5898C296.14 31.5898 311.58 47.7099 313.97 69.1499H292.31C290.4 58.2099 282.6 48.8598 265.08 48.8598C248.36 48.8598 235.46 61.5199 235.62 81.9599C235.62 102.68 248.36 114.91 265.24 114.91C283.08 114.91 290.56 105.7 292.31 94.7599Z" />
          <path fill="white" id="R" d="M430.049 130.6C427.339 131.32 423.519 132.04 418.739 132.04C402.979 132.04 396.769 125.71 391.189 116.07L379.089 95.0598H361.419V131.32H339.449V32.5999H382.759C407.279 32.5999 422.409 43.8198 422.409 63.9698C422.409 77.7898 414.609 87.2799 402.349 91.8899L412.379 109.73C415.089 114.48 418.429 115.92 422.569 115.92C425.279 115.92 427.189 115.63 428.779 115.2L430.049 130.6ZM361.419 79.6499H382.759C394.379 79.5099 400.279 73.4598 400.279 64.2498C400.279 55.1798 394.389 48.9998 382.759 48.9998H361.419V79.6499Z" />
          <path fill="white" id="E" d="M530.84 114.77V131.32H453.77V32.5999H529.88V49.2899H475.74V72.8899H523.83V89.0099H475.74V114.77H530.84Z" />
          <path fill="white" id="A" d="M620.489 109.87H576.379L568.579 131.31H546.609L585.619 32.5898H611.259L650.269 131.31H628.299L620.489 109.87ZM614.599 94.1898L598.519 50.1498L582.279 94.1898H614.599Z" />
          <path fill="white" id="T" d="M685.46 49.4298H650.91V32.5898H741.99V49.4298H707.44V131.31H685.47V49.4298H685.46Z" />
        </motion.g>
      </motion.svg>
    </Link>
  </>)
}
export default Logo
