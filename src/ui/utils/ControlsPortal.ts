import React, { useContext } from "react";
import ReactDOM from "react-dom";

type ControlsPortalContextType = {
  controlsElement: HTMLDivElement | null
}

export const ControlsPortalContext = React.createContext<ControlsPortalContextType>({
  controlsElement: null
})

export const ControlsPortal = ({ children }: { children: React.ReactNode }) => {
  const { controlsElement } = useContext(ControlsPortalContext)
  if (!controlsElement) return null;
  return ReactDOM.createPortal(children, controlsElement)
}
