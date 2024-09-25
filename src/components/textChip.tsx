import { IconType } from "react-icons"

interface TextChipProps {
  text: string
  icon: IconType
}

const TextChip: React.FC<TextChipProps> = ({ text, icon: Icon }) => {
  return <div
    className="inline-flex items-center gap-2 px-3 py-2 flex-shrink-0
rounded-full border border-white/30 bg-white/10 cursor-default">
    {
      <Icon className="text-lg" />
    }
    <h1 className="text-nowrap">
      {text}
    </h1>
  </div>
}
export default TextChip
