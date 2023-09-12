import { useContext } from "react";
import { SidebarContext } from "../contexts/Sidebar";

export const useSidebarContext = () => useContext(SidebarContext)