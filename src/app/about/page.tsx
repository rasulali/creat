"use client";
import TextAnim from "@/components/animatedText"
import Nav from "@/components/navbar"
import Image from "next/image"
import GearAnim from "@/components/gearAnim"
import TargetAnim from "@/components/targetAnim"

const About = () => {
  return <section className="w-full relative font-jost overflow-hidden">
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <Image
          src="/about/banner.jpg"
          alt="Company Overview Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
          quality={50}
        />
      </div>
      <div className="flex flex-col">
        <Nav isTransparent={false} />
        <div className="py-48 flex justify-center  bg-creatBG">
          <div className="flex w-3/5 justify-center gap-x-24 items-end">
            <TextAnim>
              <h1 className="text-5xl text-white leading-tight uppercase">
                Company <br />Overview
              </h1>
            </TextAnim>
            <div>
              <TextAnim dir="<">
                <p className="text-white text-2xl">
                  We offer customized approaches to project management,<br />
                  tailoring our solutions to the specific requirements of each project <br />
                  and ultimately ensure the successful completion of their projects
                </p>
              </TextAnim>
            </div>
          </div>
        </div>
        <div className="h-[500px] w-full relative">
          {/* This empty space allows scrolling to reveal more of the background */}
          <div className="absolute top-0 left-0 w-full h-[100px] pointer-events-none">
            <svg
              width="100%"
              preserveAspectRatio="none"
              fill="#081731"
              viewBox="0 0 1920 100">
              <path d="M0 43L40 44.3C80 45.7 160 48.3 240 56.5C320 64.7 400 78.3 480 76C560 73.7 640 55.3 720 52.3C800 49.3 880 61.7 960 59.8C1040 58 1120 42 1200 34.8C1280 27.7 1360 29.3 1440 33.3C1520 37.3 1600 43.7 1680 42.5C1760 41.3 1840 32.7 1880 28.3L1920 24L1920 0L1880 0C1840 0 1760 0 1680 0C1600 0 1520 0 1440 0C1360 0 1280 0 1200 0C1120 0 1040 0 960 0C880 0 800 0 720 0C640 0 560 0 480 0C400 0 320 0 240 0C160 0 80 0 40 0L0 0Z" strokeLinecap="round" strokeLinejoin="miter"></path>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none translate-y-[1px]">
            <svg
              width="100%"
              preserveAspectRatio="none"
              fill="#081731"
              viewBox="0 0 1920 100">
              <path d="M0 32L10.3 40.7C20.7 49.3 41.3 66.7 62 68.7C82.7 70.7 103.3 57.3 124 57.8C144.7 58.3 165.3 72.7 186 81.3C206.7 90 227.3 93 248 93.3C268.7 93.7 289.3 91.3 310 89.2C330.7 87 351.3 85 372 80.2C392.7 75.3 413.3 67.7 433.8 59.7C454.3 51.7 474.7 43.3 495.2 39.2C515.7 35 536.3 35 557 43C577.7 51 598.3 67 619 72C639.7 77 660.3 71 681 71.5C701.7 72 722.3 79 743 76.5C763.7 74 784.3 62 805 59.8C825.7 57.7 846.3 65.3 867 62.2C887.7 59 908.3 45 929 38.7C949.7 32.3 970.3 33.7 991 44.3C1011.7 55 1032.3 75 1053 80.5C1073.7 86 1094.3 77 1115 73.5C1135.7 70 1156.3 72 1177 73C1197.7 74 1218.3 74 1239 71.3C1259.7 68.7 1280.3 63.3 1301 64.7C1321.7 66 1342.3 74 1363 71.2C1383.7 68.3 1404.3 54.7 1424.8 54.7C1445.3 54.7 1465.7 68.3 1486.2 67.2C1506.7 66 1527.3 50 1548 50C1568.7 50 1589.3 66 1610 68.2C1630.7 70.3 1651.3 58.7 1672 55.3C1692.7 52 1713.3 57 1734 57.7C1754.7 58.3 1775.3 54.7 1796 55.2C1816.7 55.7 1837.3 60.3 1858 67.7C1878.7 75 1899.3 85 1909.7 90L1920 95L1920 101L1909.7 101C1899.3 101 1878.7 101 1858 101C1837.3 101 1816.7 101 1796 101C1775.3 101 1754.7 101 1734 101C1713.3 101 1692.7 101 1672 101C1651.3 101 1630.7 101 1610 101C1589.3 101 1568.7 101 1548 101C1527.3 101 1506.7 101 1486.2 101C1465.7 101 1445.3 101 1424.8 101C1404.3 101 1383.7 101 1363 101C1342.3 101 1321.7 101 1301 101C1280.3 101 1259.7 101 1239 101C1218.3 101 1197.7 101 1177 101C1156.3 101 1135.7 101 1115 101C1094.3 101 1073.7 101 1053 101C1032.3 101 1011.7 101 991 101C970.3 101 949.7 101 929 101C908.3 101 887.7 101 867 101C846.3 101 825.7 101 805 101C784.3 101 763.7 101 743 101C722.3 101 701.7 101 681 101C660.3 101 639.7 101 619 101C598.3 101 577.7 101 557 101C536.3 101 515.7 101 495.2 101C474.7 101 454.3 101 433.8 101C413.3 101 392.7 101 372 101C351.3 101 330.7 101 310 101C289.3 101 268.7 101 248 101C227.3 101 206.7 101 186 101C165.3 101 144.7 101 124 101C103.3 101 82.7 101 62 101C41.3 101 20.7 101 10.3 101L0 101Z" stroke-linecap="round" stroke-linejoin="miter"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-creatBG">
      <div className="flex flex-col gap-y-24 py-48 relative">
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto justify-center">
          <div className="flex flex-col gap-y-12 relative">
            <GearAnim />
            <div className="flex flex-col gap-y-6">
              <TextAnim>
                <h1 className="text-5xl text-white/90">Who We Are?</h1>
              </TextAnim>
              <TextAnim delay={0.1}>
                <p className="text-5xl tracking-tighter text-white/70">
                  <span className="text-creatBright">CREAT Company LLC</span> is a professional firm specializing in project management,
                  offering modern approaches and innovative solutions
                </p>
              </TextAnim>
            </div>
            <div>
              <TextAnim delay={0.2}>
                <h1 className="text-5xl text-white/70">
                  Established in <span className="relative">
                    2019
                    <div className="absolute h-px w-full bottom-0 left-0 bg-creatBright -translate-y-2"></div>
                  </span>, our company has quickly gained recognition
                  in the industry by successfully completing numerous projects both locally and internationally
                </h1>
              </TextAnim>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto justify-center">
          <div className="flex flex-col gap-y-12 relative">
            <TargetAnim />
            <div className="flex flex-col gap-y-6">
              <TextAnim>
                <h1 className="text-5xl text-white/90 ">Our Misson</h1>
              </TextAnim>
              <TextAnim delay={0.1}>
                <p className="text-5xl tracking-tighter text-white/70">
                  Our mission is to fully meet our clients' needs,
                  support their goals,
                  and ultimately ensure the successful completion of their projects.
                </p>
              </TextAnim>
            </div>
            <div>
              <TextAnim delay={0.2}>
                <h1 className="text-5xl text-white/70">
                  At <span className="text-creatBright">CREAT Company LLC</span>,
                  we offer customized approaches to project management,
                  tailoring our solutions to the specific requirements of each project.
                  Our primary focus is to earn our clients' trust and provide them with
                  top-quality services that meet their exact demands.</h1>
              </TextAnim>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none -translate-y-1/2">
          <svg
            width="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1920 100">
            <path d="M0 26L45.7 27C91.3 28 182.7 30 274.2 33.3C365.7 36.7 457.3 41.3 548.8 42.7C640.3 44 731.7 42 823 41.8C914.3 41.7 1005.7 43.3 1097 44.3C1188.3 45.3 1279.7 45.7 1371.2 43.5C1462.7 41.3 1554.3 36.7 1645.8 37C1737.3 37.3 1828.7 42.7 1874.3 45.3L1920 48L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z" fill="#142d58"></path>
            <path d="M0 45L45.7 46.2C91.3 47.3 182.7 49.7 274.2 50.5C365.7 51.3 457.3 50.7 548.8 50.5C640.3 50.3 731.7 50.7 823 53C914.3 55.3 1005.7 59.7 1097 56.8C1188.3 54 1279.7 44 1371.2 42.2C1462.7 40.3 1554.3 46.7 1645.8 50.2C1737.3 53.7 1828.7 54.3 1874.3 54.7L1920 55L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z" fill="#10264b"></path>
            <path d="M0 60L45.7 60.3C91.3 60.7 182.7 61.3 274.2 62.8C365.7 64.3 457.3 66.7 548.8 66.8C640.3 67 731.7 65 823 63C914.3 61 1005.7 59 1097 59.7C1188.3 60.3 1279.7 63.7 1371.2 65.2C1462.7 66.7 1554.3 66.3 1645.8 65C1737.3 63.7 1828.7 61.3 1874.3 60.2L1920 59L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z" fill="#0c1e3e"></path>
            <path d="M0 83L45.7 83.8C91.3 84.7 182.7 86.3 274.2 84C365.7 81.7 457.3 75.3 548.8 74.3C640.3 73.3 731.7 77.7 823 79C914.3 80.3 1005.7 78.7 1097 77.5C1188.3 76.3 1279.7 75.7 1371.2 77.3C1462.7 79 1554.3 83 1645.8 85.2C1737.3 87.3 1828.7 87.7 1874.3 87.8L1920 88L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z" fill="#081731"></path>
          </svg>
        </div>
      </div>
      <div className="flex flex-col md:px-80 pb-48 h-full w-full max-w-[1920px] mx-auto justify-center bg-creatBG relative">
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-48">
            <div className="flex flex-col gap-y-6">
              <TextAnim>
                <h1 className="text-5xl text-white/90 ">Our Values</h1>
              </TextAnim>
              <TextAnim>
                <div className="flex gap-x-4 items-center">
                  <h1
                    className="text-[160px] font-bold bg-clip-text text-transparent flex font-manrope"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5))',
                    }}
                  >
                    Reliability
                  </h1>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="w-fit h-[160px]"
                    viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="10%" style={{ stopColor: "rgba(255, 255, 255, 0.3)", stopOpacity: 0.3 }} />
                        <stop offset="30%" style={{ stopColor: "rgba(255, 255, 255, 0.5)", stopOpacity: 0.5 }} />
                        <stop offset="50%" style={{ stopColor: "rgba(255, 255, 255, 0.9)", stopOpacity: 0.9 }} />
                        <stop offset="70%" style={{ stopColor: "rgba(255, 255, 255, 0.5)", stopOpacity: 0.5 }} />
                        <stop offset="90%" style={{ stopColor: "rgba(255, 255, 255, 0.1)", stopOpacity: 0.1 }} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#grad)" fillRule="evenodd" d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082M15.06 10.5a.75.75 0 0 0-1.12-.999l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z"
                      clipRule="evenodd">
                    </path>
                  </svg>
                </div>
              </TextAnim>
              <TextAnim delay={0.1}>
                <p className="text-4xl font-medium text-white/80 max-w-[70%]">
                  Honesty and reliability towards our clients and partners are our most important principles. We consistently fulfill our commitments to clients and strive to provide them with the highest level of service
                </p>
              </TextAnim>
            </div>
            <div className="flex flex-col gap-y-6 items-end">
              <TextAnim dir="<">
                <div className="flex gap-x-4 items-center w-fit">
                  <h1
                    className="text-[160px] font-bold bg-clip-text text-transparent flex font-manrope"
                    style={{
                      backgroundImage: 'linear-gradient(to top, transparent, rgba(251, 191, 36, 1))',
                    }}
                  >
                    Innovation
                  </h1>
                  <svg
                    className="w-fit h-[160px]"
                    viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="fill-white/80"
                      d="M95.5984 106.71C95.665 108.034 95.9317 109.315 96.3984 110.555C97.1584 112.735 96.4534 115.155 94.6484 116.595L92.4984 129.87C92.3659 130.971 91.8318 131.984 90.9984 132.715L88.6484 134.86L88.1984 135.31L85.7484 138.205C85.2724 138.775 84.6754 139.232 84.0008 139.543C83.3262 139.853 82.5909 140.009 81.8484 140H78.1484C77.4054 140.009 76.6698 139.852 75.9952 139.54C75.3206 139.229 74.7238 138.771 74.2484 138.2L71.7984 135.31L71.3484 134.86L68.9984 132.71C68.166 131.98 67.632 130.969 67.4984 129.87L65.3484 116.445C64.4684 115.743 63.8277 114.785 63.5144 113.703C63.201 112.622 63.2303 111.469 63.5984 110.405C64.066 109.174 64.336 107.876 64.3984 106.56C69.9817 107.184 75.5817 107.5 81.1984 107.51C85.5984 107.51 90.5984 107.21 95.5984 106.71ZM119.998 60.0002C120.009 67.0028 118.182 73.8855 114.698 79.9602L114.148 80.8102C113.648 81.6102 113.148 82.4102 112.598 83.1602C105.798 93.0352 100.248 95.1852 96.8484 101.57C91.6848 102.142 86.4935 102.426 81.2984 102.42C75.2084 102.42 69.1417 102.054 63.0984 101.32C59.6984 95.1352 54.1984 92.8902 47.4984 83.1552C46.9484 82.4052 46.4484 81.6052 45.9484 80.8052L45.3984 79.9602C41.2729 72.8675 39.4374 64.6743 40.1426 56.4994C40.8478 48.3246 44.0592 40.5667 49.3384 34.2852C54.6227 27.9964 61.7131 23.4844 69.6482 21.3611C77.5833 19.2378 85.9794 19.6058 93.6984 22.4152C101.412 25.2196 108.075 30.3318 112.781 37.0567C117.486 43.7815 120.006 51.7925 119.998 60.0002ZM89.9984 62.8452C91.2064 62.4983 92.2687 61.7676 93.0248 60.7637C93.781 59.7598 94.19 58.5371 94.19 57.2802C94.19 56.0234 93.781 54.8007 93.0248 53.7967C92.2687 52.7928 91.2064 52.0622 89.9984 51.7152L74.4984 47.4702C73.0984 47.1202 72.3484 46.3702 72.3484 45.8702C72.3484 45.3752 73.0984 44.6752 74.3984 44.2752L90.4984 40.2852C90.8182 40.2156 91.1203 40.0814 91.3863 39.8907C91.6523 39.7 91.8765 39.4569 92.0451 39.1764C92.2137 38.8959 92.3231 38.5839 92.3667 38.2595C92.4102 37.9351 92.387 37.6053 92.2984 37.2902C92.1326 36.655 91.7282 36.1081 91.1694 35.7635C90.6106 35.4189 89.9404 35.3031 89.2984 35.4402L73.1484 39.4402C71.607 39.7225 70.2023 40.5067 69.1532 41.6706C68.1041 42.8346 67.4695 44.3129 67.3484 45.8752C67.4611 47.4403 68.0928 48.9231 69.1434 50.0887C70.1939 51.2543 71.6033 52.0361 73.1484 52.3102L88.5484 56.6052C88.7244 56.6506 88.8797 56.7545 88.9888 56.8999C89.0978 57.0453 89.1541 57.2236 89.1484 57.4052C89.1519 57.5807 89.0938 57.7518 88.9842 57.8889C88.8745 58.0259 88.7203 58.1202 88.5484 58.1552L69.9984 63.1452C68.7716 63.4589 67.6858 64.1755 66.9151 65.1801C66.1444 66.1847 65.7335 67.4191 65.7484 68.6852C65.7234 71.2952 67.4734 73.5902 69.9984 74.2702L85.4984 78.2152C86.8984 78.5652 87.6484 79.3152 87.6484 79.8152C87.6484 80.3152 86.8984 81.0102 85.5984 81.4102L69.9984 85.0502C69.6704 85.0863 69.3527 85.1867 69.0635 85.3456C68.7743 85.5044 68.5193 85.7187 68.3129 85.9762C68.1065 86.2336 67.9529 86.5292 67.8607 86.846C67.7686 87.1629 67.7397 87.4948 67.7759 87.8227C67.812 88.1507 67.9123 88.4684 68.0712 88.7575C68.2301 89.0467 68.4444 89.3018 68.7018 89.5082C68.9593 89.7146 69.2548 89.8682 69.5717 89.9604C69.8885 90.0525 70.2204 90.0813 70.5484 90.0452H71.1484L86.8484 86.3952C88.3897 86.113 89.7944 85.3288 90.8435 84.1648C91.8926 83.0009 92.5272 81.5225 92.6484 79.9602C92.5194 78.4138 91.8873 76.9523 90.8489 75.7992C89.8105 74.6461 88.4228 73.8649 86.8984 73.5752L71.4484 69.3302C71.2716 69.3053 71.111 69.2138 70.9994 69.0744C70.8879 68.9349 70.8339 68.7582 70.8484 68.5802C70.8448 68.4048 70.9029 68.2336 71.0126 68.0966C71.1222 67.9595 71.2764 67.8653 71.4484 67.8302L89.9984 62.8452Z" />
                    <path
                      className="stroke-amber-400"
                      d="M52.5 15L53.8475 20.98C54.4086 23.4642 55.6623 25.7385 57.4631 27.5394C59.264 29.3402 61.5383 30.5939 64.0225 31.155L70 32.5L64.02 33.8475C61.5358 34.4086 59.2615 35.6623 57.4606 37.4631C55.6598 39.264 54.4061 41.5383 53.845 44.0225L52.5 50L51.1525 44.02C50.5914 41.5358 49.3377 39.2615 47.5369 37.4606C45.736 35.6598 43.4617 34.4061 40.9775 33.845L35 32.5L40.98 31.1525C43.4642 30.5914 45.7385 29.3377 47.5394 27.5369C49.3402 25.736 50.5939 23.4617 51.155 20.9775L52.5 15ZM32.5 40L33.4625 44.27C33.8633 46.0443 34.7588 47.6687 36.045 48.955C37.3313 50.2412 38.9557 51.1367 40.73 51.5375L45 52.5L40.73 53.4625C38.9557 53.8633 37.3313 54.7588 36.045 56.045C34.7588 57.3313 33.8633 58.9557 33.4625 60.73L32.5 65L31.5375 60.73C31.1367 58.9557 30.2412 57.3313 28.955 56.045C27.6687 54.7588 26.0443 53.8633 24.27 53.4625L20 52.5L24.27 51.5375C26.0443 51.1367 27.6687 50.2412 28.955 48.955C30.2412 47.6687 31.1367 46.0443 31.5375 44.27L32.5 40Z"
                      stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </TextAnim>
              <div className="max-w-[70%]">
                <TextAnim dir="<" delay={0.1}>
                  <p className="text-4xl font-medium text-white/80 w-fit text-right">In line with modern trends, we employ innovative technologies and advanced methods in our projects. This enables us to enhance our clients' competitiveness and help them achieve their business objectives</p>
                </TextAnim>
              </div>
            </div>
            <div className="flex flex-col gap-y-6">
              <TextAnim>
                <div className="flex gap-x-4 items-center">
                  <h1
                    className="text-[160px] font-bold bg-clip-text text-transparent flex font-manrope"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, rgba(5, 150, 105, 1), transparent)',
                    }}
                  >
                    Teamwork
                  </h1>
                  <svg
                    className="w-fit h-[160px] fill-emerald-600/60 p-4"
                    viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_220_3)">
                      <path d="M151.624 10.7151C149.722 10.5222 147.806 10.9148 146.133 11.8405C145.317 9.19089 143.352 7.04887 140.783 6.00668C138.213 4.9645 135.312 5.13259 132.88 6.46447C131.526 2.27211 127.425 -0.402626 123.043 0.0484688C120.191 0.372638 117.651 2.00207 116.168 4.45914C113.951 2.81793 111.112 2.26388 108.441 2.95102C105.769 3.63816 103.55 5.49322 102.4 8.00047H76.1387C75.6521 7.99686 75.1757 7.86139 74.76 7.60847L63.9787 1.1578C62.7392 0.408728 61.3202 0.00883105 59.872 0.000468785H20.3814C15.5015 -0.0649041 11.3461 3.53454 10.7147 8.3738C10.522 10.2768 10.9146 12.1932 11.84 13.8671C9.18969 14.6828 7.04694 16.6475 6.00504 19.2174C4.96315 21.7872 5.13268 24.6894 6.46669 27.1205C2.26784 28.4695 -0.410683 32.5768 0.0480222 36.9631C0.371009 39.8152 2.00075 42.3554 4.45869 43.8378C3.10545 45.7042 2.48483 48.0026 2.71469 50.2965C3.09568 53.4849 5.0934 56.2517 8.00002 57.6165V83.8671C7.99537 84.3514 7.85893 84.8252 7.60536 85.2378L1.09869 96.0751C0.390559 97.3105 0.0122071 98.7073 2.21975e-05 100.131V139.622C-0.0614047 144.501 3.53794 148.653 8.37602 149.286C10.2779 149.474 12.192 149.081 13.8667 148.16C14.683 150.811 16.6483 152.954 19.2185 153.996C21.7887 155.037 24.6912 154.868 27.1227 153.534C28.3582 157.392 31.9486 160.008 36 160C39.2148 160.001 42.192 158.308 43.8347 155.544C46.0538 157.186 48.8944 157.739 51.5675 157.052C54.2406 156.364 56.4614 154.509 57.6134 152H83.8614C84.3479 152.004 84.8244 152.14 85.24 152.392L96.0214 158.848C97.2616 159.595 98.6806 159.992 100.128 159.998H139.619C144.499 160.063 148.654 156.464 149.285 151.624C149.477 149.722 149.085 147.807 148.16 146.134C150.81 145.318 152.953 143.353 153.995 140.784C155.037 138.214 154.867 135.312 153.533 132.88C157.73 131.532 160.408 127.428 159.952 123.043C159.629 120.191 157.999 117.651 155.541 116.168C156.895 114.302 157.515 112.004 157.285 109.71C156.901 106.525 154.904 103.763 152 102.4V76.1338C152.006 75.6484 152.141 75.1733 152.392 74.7578L158.851 63.9791C159.597 62.7379 159.994 61.3181 160 59.8698V20.3791C160.061 15.5003 156.462 11.3475 151.624 10.7151ZM5.35469 36.4351C5.23114 35.3049 5.59439 34.1755 6.35364 33.3293C7.1129 32.483 8.19641 31.9998 9.33336 32.0005H26.6667C28.1394 32.0005 29.3334 30.8066 29.3334 29.3338C29.3334 27.861 28.1394 26.6671 26.6667 26.6671H14.6667C13.5299 26.6698 12.4457 26.1887 11.6849 25.344C10.9242 24.4993 10.5588 23.3708 10.68 22.2405C11.0213 20.1152 12.8973 18.5805 15.048 18.6671H32C33.4728 18.6671 34.6667 17.4732 34.6667 16.0005C34.6667 14.5277 33.4728 13.3338 32 13.3338H20C18.8632 13.3365 17.779 12.8554 17.0182 12.0107C16.2575 11.1659 15.8921 10.0374 16.0134 8.90714C16.3535 6.78125 18.2302 5.24595 20.3814 5.3338H59.872C60.3581 5.33749 60.8339 5.47396 61.248 5.72847L72.032 12.1871C73.2731 12.9312 74.6917 13.3273 76.1387 13.3338H101.333V37.0378L96.7147 33.2565C93.2488 30.6111 88.3737 30.8791 85.2187 33.8885C82.876 36.1604 82.0618 39.5838 83.1307 42.6671H74.1894C72.0906 42.676 70.0794 43.5092 68.5894 44.9871L43.4934 69.8778L43.44 69.9311L42.3307 71.0298C41.0299 72.3015 38.9472 72.2872 37.664 70.9978C36.4928 69.8219 36.3785 67.9586 37.3974 66.6485L44.7307 57.6885C45.3828 56.891 45.5172 55.7892 45.076 54.8583C44.6348 53.9275 43.6968 53.334 42.6667 53.3338H12.3814C10.2341 53.4177 8.36236 51.8848 8.02136 49.7631C7.89943 48.6338 8.26342 47.5059 9.02249 46.6608C9.78156 45.8158 10.8641 45.3333 12 45.3338H26.6667C28.1394 45.3338 29.3334 44.1399 29.3334 42.6671C29.3334 41.1944 28.1394 40.0005 26.6667 40.0005H9.71469C7.56956 40.0835 5.6992 38.554 5.35469 36.4351ZM112 87.0858L87.6534 111.23C87.1636 111.719 86.5004 111.995 85.808 111.998H72.912L48.7707 87.6618C48.2799 87.1717 48.0028 86.5074 48 85.8138V72.9071L72.3387 48.7711C72.8293 48.2794 73.4948 48.0023 74.1894 48.0005H87.096L111.237 72.3365C111.724 72.8295 111.998 73.4941 112 74.1871V87.0858ZM49.7387 151.979C48.6159 152.1 47.4949 151.735 46.6587 150.976C45.8185 150.215 45.3375 149.135 45.3334 148V147.96V133.334C45.3334 131.861 44.1394 130.667 42.6667 130.667C41.1939 130.667 40 131.861 40 133.334V148V148.038V150.291C40.0733 152.446 38.5274 154.317 36.3974 154.651C35.2769 154.773 34.1581 154.408 33.3254 153.648C32.4833 152.886 32.002 151.803 32 150.667V145.334V145.28V133.334C32 131.861 30.8061 130.667 29.3334 130.667C27.8606 130.667 26.6667 131.861 26.6667 133.334V145.334V145.366C26.6596 146.497 26.1742 147.571 25.3307 148.325C24.4872 149.078 23.3643 149.438 22.24 149.318C20.1152 148.978 18.5802 147.103 18.6667 144.952V140V139.96V128C18.6667 126.528 17.4728 125.334 16 125.334C14.5273 125.334 13.3334 126.528 13.3334 128V140V140.024C13.3284 141.156 12.8444 142.233 12.0012 142.987C11.158 143.742 10.0346 144.104 8.90936 143.984C6.78513 143.645 5.24966 141.771 5.33336 139.622V100.131C5.33747 99.6507 5.46315 99.1792 5.69869 98.7605L12.1867 87.9711C12.9292 86.7304 13.3252 85.3131 13.3334 83.8671V58.6671H37.0347L33.2507 63.2885C30.8111 66.2558 30.6376 70.4818 32.8257 73.6391C35.0138 76.7964 39.0318 78.1176 42.6667 76.8751V85.8138C42.6755 87.9125 43.5087 89.9237 44.9867 91.4138L69.856 116.48C69.8854 116.512 69.9147 116.542 69.9467 116.571L71.032 117.664C71.9664 118.616 72.2382 120.035 71.7213 121.264C71.2044 122.493 70 123.291 68.6667 123.288C67.941 123.292 67.2358 123.048 66.6667 122.598L57.7094 115.267C56.912 114.601 55.8005 114.459 54.8612 114.903C53.9218 115.346 53.3256 116.295 53.3334 117.334V147.619C53.4071 149.771 51.8655 151.641 49.7387 151.979ZM154.645 123.566C154.769 124.696 154.406 125.825 153.646 126.672C152.887 127.518 151.804 128.001 150.667 128H133.333C131.861 128 130.667 129.194 130.667 130.667C130.667 132.14 131.861 133.334 133.333 133.334H145.333C146.47 133.331 147.554 133.812 148.315 134.657C149.076 135.502 149.441 136.63 149.32 137.76C148.979 139.886 147.103 141.42 144.952 141.334H128C126.527 141.334 125.333 142.528 125.333 144C125.333 145.473 126.527 146.667 128 146.667H140C141.137 146.664 142.221 147.146 142.982 147.99C143.743 148.835 144.108 149.964 143.987 151.094C143.647 153.22 141.77 154.755 139.619 154.667H100.128C99.642 154.663 99.1662 154.527 98.752 154.272L87.968 147.814C86.727 147.07 85.3084 146.674 83.8614 146.667H58.6667V122.958L63.2854 126.739C66.7481 129.395 71.6306 129.126 74.7814 126.107C77.1247 123.838 77.942 120.417 76.8774 117.334H85.8107C87.9094 117.325 89.9206 116.492 91.4107 115.014L116.499 90.1338L116.592 90.0431L117.677 88.9765C118.978 87.7048 121.061 87.719 122.344 89.0085C123.515 90.1843 123.63 92.0477 122.611 93.3578L115.277 102.318C114.63 103.114 114.496 104.212 114.935 105.14C115.374 106.068 116.307 106.662 117.333 106.667H147.619C149.766 106.583 151.638 108.116 151.979 110.238C152.101 111.367 151.737 112.495 150.978 113.34C150.218 114.185 149.136 114.668 148 114.667H133.333C131.861 114.667 130.667 115.861 130.667 117.334C130.667 118.807 131.861 120 133.333 120H150.293C152.435 119.922 154.301 121.45 154.645 123.566ZM154.667 59.8698C154.663 60.3554 154.527 60.8309 154.275 61.2458L147.813 72.0298C147.07 73.27 146.673 74.6877 146.667 76.1338V101.334H122.957L126.741 96.7125C129.488 93.2795 129.214 88.33 126.104 85.2218C123.775 82.9865 120.406 82.2102 117.333 83.2005V74.1871C117.325 72.0884 116.491 70.0772 115.013 68.5871L90.1334 43.4831L90.0827 43.4325L88.9814 42.3231C88.3566 41.706 88.0076 40.8626 88.0136 39.9844C88.0196 39.1062 88.3802 38.2677 89.0134 37.6591C90.2054 36.5219 92.0434 36.4093 93.3654 37.3925L102.323 44.7231C103.119 45.3677 104.215 45.4988 105.141 45.0604C106.067 44.6221 106.66 43.6918 106.667 42.6671V12.3818C106.584 10.2341 108.118 8.36271 110.24 8.0218C111.369 7.90069 112.496 8.26505 113.341 9.02402C114.185 9.783 114.667 10.8651 114.667 12.0005V26.6671C114.667 28.1399 115.861 29.3338 117.333 29.3338C118.806 29.3338 120 28.1399 120 26.6671V9.71514C119.916 7.56699 121.451 5.69493 123.573 5.35514C124.702 5.23403 125.829 5.59838 126.674 6.35736C127.518 7.11633 128 8.19841 128 9.3338V26.6671C128 28.1399 129.194 29.3338 130.667 29.3338C132.139 29.3338 133.333 28.1399 133.333 26.6671V14.6671C133.331 13.5308 133.813 12.4473 134.657 11.6871C135.502 10.927 136.63 10.5619 137.76 10.6831C139.885 11.0232 141.42 12.8983 141.333 15.0485V32.0005C141.333 33.4732 142.527 34.6671 144 34.6671C145.473 34.6671 146.667 33.4732 146.667 32.0005V20.0005C146.665 18.8641 147.146 17.7806 147.991 17.0205C148.835 16.2603 149.964 15.8953 151.093 16.0165C153.217 16.3575 154.751 18.2304 154.667 20.3791V59.8698Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_220_3">
                        <rect width="160" height="160" fill="none" />
                      </clipPath>
                    </defs>
                  </svg>

                </div>
              </TextAnim>
              <TextAnim delay={0.1}>
                <p className="text-4xl font-medium text-white/80 max-w-[70%]">We understand the value of collective success, not just individual achievements. When executing our projects, we collaborate closely with every member of our team and highly value collaborative work principles</p>
              </TextAnim>
            </div>
            <div className="flex flex-col gap-y-6 items-end">
              <TextAnim dir="<">
                <div className="flex gap-x-4 items-center w-fit">
                  <h1
                    className="text-[160px] font-bold bg-clip-text text-transparent flex font-manrope"
                    style={{
                      background: `linear-gradient(
          45deg,
          rgba(12, 61, 145, 0.7) 5%,
          rgba(255, 255, 255, 0.9) 10%,
          rgba(12, 61, 145, 0.8) 30%,
          rgba(12, 61, 145, 0.9) 50%,
          rgba(12, 61, 145, 0.8) 70%,
          rgba(255, 255, 255, 0.9) 80%,
          rgba(12, 61, 145, 0.7) 95%
        )`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Quality
                  </h1>
                  <svg
                    className="w-fit h-[160px] p-4"
                    viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g className="fill-white/80">
                      <path d="M111.274 24.4219H82.751V49.9756H121.059L111.274 24.4219Z" />
                      <path d="M56.46 55.4863C55.3193 58.6859 52.29 60.9958 48.7031 60.9958C46.862 60.9958 45.1536 61.9049 44.1299 63.4277C43.5192 64.3395 43.1937 65.4049 43.1937 66.5052C43.1937 66.5264 43.1878 66.5459 43.1875 66.5671L77.2422 155.466V55.4863H56.46Z" />
                      <path d="M39.806 73.1416C38.4355 74.152 36.7588 74.7692 34.929 74.7692C30.3717 74.7692 26.6644 71.0625 26.6644 66.5052C26.6644 65.0339 26.097 63.6562 25.0651 62.626C24.0133 61.5739 22.625 60.9958 21.1549 60.9958C17.5684 60.9958 14.5391 58.6859 13.3984 55.4863H0.00195312L69.9482 151.83L39.806 73.1416Z" />
                      <path d="M18.5391 24.4115L0 49.9759H13.3988C14.5394 46.776 17.5687 44.4665 21.1553 44.4665C24.1937 44.4665 26.6647 41.9938 26.6647 38.9567C26.6647 34.3997 30.3721 30.6927 34.9294 30.6927C36.7565 30.6927 38.4313 31.3079 39.8011 32.3161L42.8255 24.4111L18.5391 24.4115Z" />
                      <path d="M48.7253 24.4111L43.1865 38.888C43.1868 38.9115 43.1937 38.9336 43.1937 38.957C43.1937 40.0254 43.5368 41.1494 44.1354 42.0426C44.3141 42.3119 44.5322 42.5726 44.7891 42.8285C45.861 43.9017 47.2129 44.4668 48.7031 44.4668C52.2897 44.4668 55.319 46.7767 56.46 49.9762H77.2422V24.4111H48.7253Z" />
                      <path d="M150.872 37.3939C149.995 41.0153 146.748 43.7217 142.861 43.7217C138.303 43.7217 134.596 40.0143 134.596 35.4574C134.596 33.9564 134.042 32.6165 132.996 31.5807C131.909 30.4801 130.561 29.9206 129.057 29.9206C125.47 29.9206 122.441 27.6107 121.301 24.4111H117.17L126.968 49.9762H160L150.872 37.3939Z" />
                      <path d="M126.96 55.4863L112.56 93.068L90.0498 151.819L159.983 55.4863H126.96Z" />
                      <path d="M82.751 55.4863V155.467L121.058 55.4863H82.751Z" />
                    </g>
                    <g className="fill-creatBGLight">
                      <path d="M39.7734 47.8519C39.0436 47.1221 38.347 46.2926 37.7497 45.3965C35.9909 42.7751 34.929 39.5566 34.929 36.1387C34.929 45.2969 27.4964 52.7298 18.3379 52.7298C22.9173 52.7298 27.0648 54.5882 30.0843 57.6074C33.0706 60.5937 34.9287 64.7415 34.9287 69.3206C34.9287 65.903 35.9906 62.6842 37.7493 60.0628C40.7357 55.6162 45.8122 52.7295 51.5195 52.7295C46.9408 52.7292 42.793 50.8708 39.7734 47.8519Z" />
                      <path d="M147.862 16.6198C144.781 13.5384 142.863 9.25814 142.863 4.5332C142.863 13.9837 135.193 21.6533 125.709 21.6533C130.468 21.6533 134.748 23.5706 137.83 26.6862C140.946 29.7686 142.863 34.0824 142.863 38.8073C142.863 34.4932 144.472 30.5218 147.109 27.5078C150.259 23.9134 154.847 21.6533 159.983 21.6533C155.258 21.6533 150.978 19.7357 147.862 16.6198Z" />
                    </g>
                  </svg>
                </div>
              </TextAnim>
              <div className="max-w-[70%]">
                <TextAnim dir="<" delay={0.1}>
                  <p className="text-4xl font-medium text-white/80 w-fit text-right">Quality is at the heart of our work. We adhere to the highest standards in every project and pay particular attention to the quality of the solutions we deliver to our clients</p>
                </TextAnim>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none translate-y-1/2">
          <svg
            width="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1920 100">
            <path d="M0 13L29.2 13.8C58.3 14.7 116.7 16.3 174.8 15.8C233 15.3 291 12.7 349.2 11.5C407.3 10.3 465.7 10.7 523.8 11.8C582 13 640 15 698.2 14.7C756.3 14.3 814.7 11.7 872.8 11.3C931 11 989 13 1047.2 14.2C1105.3 15.3 1163.7 15.7 1221.8 14.7C1280 13.7 1338 11.3 1396.2 11.7C1454.3 12 1512.7 15 1570.8 16.3C1629 17.7 1687 17.3 1745.2 17.2C1803.3 17 1861.7 17 1890.8 17L1920 17L1920 0L1890.8 0C1861.7 0 1803.3 0 1745.2 0C1687 0 1629 0 1570.8 0C1512.7 0 1454.3 0 1396.2 0C1338 0 1280 0 1221.8 0C1163.7 0 1105.3 0 1047.2 0C989 0 931 0 872.8 0C814.7 0 756.3 0 698.2 0C640 0 582 0 523.8 0C465.7 0 407.3 0 349.2 0C291 0 233 0 174.8 0C116.7 0 58.3 0 29.2 0L0 0Z" fill="#081731"></path>
            <path d="M0 26L29.2 28.3C58.3 30.7 116.7 35.3 174.8 36.7C233 38 291 36 349.2 36.8C407.3 37.7 465.7 41.3 523.8 45.2C582 49 640 53 698.2 53C756.3 53 814.7 49 872.8 44.8C931 40.7 989 36.3 1047.2 35.3C1105.3 34.3 1163.7 36.7 1221.8 35.5C1280 34.3 1338 29.7 1396.2 33C1454.3 36.3 1512.7 47.7 1570.8 53C1629 58.3 1687 57.7 1745.2 55.2C1803.3 52.7 1861.7 48.3 1890.8 46.2L1920 44L1920 15L1890.8 15C1861.7 15 1803.3 15 1745.2 15.2C1687 15.3 1629 15.7 1570.8 14.3C1512.7 13 1454.3 10 1396.2 9.7C1338 9.3 1280 11.7 1221.8 12.7C1163.7 13.7 1105.3 13.3 1047.2 12.2C989 11 931 9 872.8 9.3C814.7 9.7 756.3 12.3 698.2 12.7C640 13 582 11 523.8 9.8C465.7 8.7 407.3 8.3 349.2 9.5C291 10.7 233 13.3 174.8 13.8C116.7 14.3 58.3 12.7 29.2 11.8L0 11Z" fill="#072047"></path>
            <path d="M0 47L29.2 46.8C58.3 46.7 116.7 46.3 174.8 46.8C233 47.3 291 48.7 349.2 51.2C407.3 53.7 465.7 57.3 523.8 60.7C582 64 640 67 698.2 66.8C756.3 66.7 814.7 63.3 872.8 59.3C931 55.3 989 50.7 1047.2 49.2C1105.3 47.7 1163.7 49.3 1221.8 48.8C1280 48.3 1338 45.7 1396.2 48C1454.3 50.3 1512.7 57.7 1570.8 62.5C1629 67.3 1687 69.7 1745.2 69.2C1803.3 68.7 1861.7 65.3 1890.8 63.7L1920 62L1920 42L1890.8 44.2C1861.7 46.3 1803.3 50.7 1745.2 53.2C1687 55.7 1629 56.3 1570.8 51C1512.7 45.7 1454.3 34.3 1396.2 31C1338 27.7 1280 32.3 1221.8 33.5C1163.7 34.7 1105.3 32.3 1047.2 33.3C989 34.3 931 38.7 872.8 42.8C814.7 47 756.3 51 698.2 51C640 51 582 47 523.8 43.2C465.7 39.3 407.3 35.7 349.2 34.8C291 34 233 36 174.8 34.7C116.7 33.3 58.3 28.7 29.2 26.3L0 24Z" fill="#052a5f"></path>
            <path d="M0 78L29.2 80.2C58.3 82.3 116.7 86.7 174.8 88.3C233 90 291 89 349.2 86.5C407.3 84 465.7 80 523.8 79.5C582 79 640 82 698.2 82.2C756.3 82.3 814.7 79.7 872.8 80.2C931 80.7 989 84.3 1047.2 85.3C1105.3 86.3 1163.7 84.7 1221.8 83.2C1280 81.7 1338 80.3 1396.2 80.2C1454.3 80 1512.7 81 1570.8 82.5C1629 84 1687 86 1745.2 85.8C1803.3 85.7 1861.7 83.3 1890.8 82.2L1920 81L1920 60L1890.8 61.7C1861.7 63.3 1803.3 66.7 1745.2 67.2C1687 67.7 1629 65.3 1570.8 60.5C1512.7 55.7 1454.3 48.3 1396.2 46C1338 43.7 1280 46.3 1221.8 46.8C1163.7 47.3 1105.3 45.7 1047.2 47.2C989 48.7 931 53.3 872.8 57.3C814.7 61.3 756.3 64.7 698.2 64.8C640 65 582 62 523.8 58.7C465.7 55.3 407.3 51.7 349.2 49.2C291 46.7 233 45.3 174.8 44.8C116.7 44.3 58.3 44.7 29.2 44.8L0 45Z" fill="#053478"></path>
            <path d="M0 101L29.2 101C58.3 101 116.7 101 174.8 101C233 101 291 101 349.2 101C407.3 101 465.7 101 523.8 101C582 101 640 101 698.2 101C756.3 101 814.7 101 872.8 101C931 101 989 101 1047.2 101C1105.3 101 1163.7 101 1221.8 101C1280 101 1338 101 1396.2 101C1454.3 101 1512.7 101 1570.8 101C1629 101 1687 101 1745.2 101C1803.3 101 1861.7 101 1890.8 101L1920 101L1920 79L1890.8 80.2C1861.7 81.3 1803.3 83.7 1745.2 83.8C1687 84 1629 82 1570.8 80.5C1512.7 79 1454.3 78 1396.2 78.2C1338 78.3 1280 79.7 1221.8 81.2C1163.7 82.7 1105.3 84.3 1047.2 83.3C989 82.3 931 78.7 872.8 78.2C814.7 77.7 756.3 80.3 698.2 80.2C640 80 582 77 523.8 77.5C465.7 78 407.3 82 349.2 84.5C291 87 233 88 174.8 86.3C116.7 84.7 58.3 80.3 29.2 78.2L0 76Z" fill="#0c3d91"></path>
          </svg>
        </div>
      </div>
      <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto justify-center bg-creatBGLight">
        <div className="flex flex-col gap-y-12 mt-48">
          <div className="flex flex-col gap-y-6">
            <TextAnim>
              <h1 className="text-5xl text-white/90 ">Our Services</h1>
            </TextAnim>
            <TextAnim delay={0.1}>
              <p className="text-5xl tracking-tighter text-white/70">
                <span
                  className="text-creatBright"
                >CREAT Company LLC</span> offers a wide range of project management services.
                These services encompass all stages of a project, from inception to completion
              </p>
            </TextAnim>
          </div>
        </div>
      </div>
    </div>
  </section>
}
export default About
