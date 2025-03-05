import { FaCaretDown,FaCaretUp} from "react-icons/fa";
import { IoMdArrowUp,IoMdArrowDown } from "react-icons/io";

export const DownArrow = () => {
    return <span> <FaCaretDown/> </span>
}

export const UpArrow = () => {
    return <span> <FaCaretUp/> </span>
}

export const TailedUpArrow = () => {
    return <span><IoMdArrowUp/></span>
}

export const TailedDownArrow = () => {
    return <span><IoMdArrowDown/></span>
}