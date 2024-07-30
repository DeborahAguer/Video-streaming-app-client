import { AiFillHome } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";;
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy } from "react-icons/gi";
import { RiLightbulbLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

export const categories = [
  { name: "New", icon: <AiFillHome size={20}/>, type: "new" },
  { name: "Trending", icon: <MdLocalFireDepartment size={20} />, type: "category" },
  { name: "Music", icon: <CgMusicNote size={20} />, type: "category" },
  { name: "Live", icon: <MdLiveTv size={20} />, type: "category" },
  { name: "News", icon: <ImNewspaper size={20} />, type: "category" },
  { name: "Sports", icon: <GiDiamondTrophy size={20} />, type: "category" },
  { name: "Learning", icon: <RiLightbulbLine size={20} />, type: "category", divider: true,},
];

export const options = [
  { name: "Settings", icon: <FiSettings size={20} />, type: "menu" },
  { name: "Help", icon: <FiHelpCircle size={20} />, type: "menu" },
];
