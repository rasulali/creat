import { BiSolidQuoteRight } from "react-icons/bi"
import { FaRegStar, FaStar } from "react-icons/fa6"

interface CommentProps {
  stars: 1 | 2 | 3 | 4 | 5;
  comment: string;
  name: string;
  role: string;
}

const Comment: React.FC<CommentProps> = ({ stars, comment, name, role }) => {
  return (
    <div className="flex flex-col p-7 gap-y-4 drop-shadow justify-start h-fit
      rounded-2xl bg-white/70 backdrop-blur-lg w-[574px] flex-shrink-0 select-none">
      <div className="flex gap-x-2 items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          index < stars ? (
            <FaStar key={index} className="text-lg text-creatBright" />
          ) : (
            <FaRegStar key={index} className="text-lg text-creatBright" />
          )
        ))}
        <h1 className="text-zinc-900 font-semibold">{stars}.0</h1>
      </div>
      <p className="text-wrap text-neutral-700 h-[72px] overflow-hidden">"{comment}"</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-fit gap-y-2 text-zinc-900">
          <div className="flex items-center">
            <h1 className="text-2xl">
              {name}
            </h1>
          </div>
          <h2 className="font-serif text-neutral-700">
            {role}
          </h2>
        </div>
        <BiSolidQuoteRight className="text-transparent text-6xl stroke-neutral-300 stroke-1" />
      </div>
    </div>
  )
}
export default Comment
