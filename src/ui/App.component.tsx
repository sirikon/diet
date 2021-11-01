import "./App.style.scss"
import React, { useState, useRef, useEffect } from "react"
import { MemoryRouter, Link, useRouteMatch } from "react-router-dom"
import { ControlsPortalContext } from "./utils/ControlsPortal"
import ShoppingListSection from "./sections/ShoppingList/ShoppingList.component"
import PlanningSection from "./sections/Planning/Planning.component"

const sections: { [key: string]: { displayName: string, component: () => JSX.Element } } = {
  "planning": {
    displayName: "Planning",
    component: PlanningSection
  },
  "shopping-list": {
    displayName: "Shopping List",
    component: ShoppingListSection
  }
}

const getDefaultSection = () => Object.keys(sections)[0]

const useCurrentSection = () => {
  return useRouteMatch<{ section?: string }>("/:section?")?.params.section || getDefaultSection()
}

export default () => {

  const controlsRef = useRef<HTMLDivElement>(null)
  const [controlsElement, setControlsElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setControlsElement(controlsRef.current)
  }, [controlsRef.current])

  return <MemoryRouter>
    <div className="container">

      <div className="content">
        <ControlsPortalContext.Provider value={{ controlsElement }}>
          <CurrentSection />
        </ControlsPortalContext.Provider>
      </div>

      <Menu controlsRef={controlsRef} />

    </div>
  </MemoryRouter>
}

const CurrentSection = () => {
  const currentSection = useCurrentSection()
  return React.createElement(sections[currentSection].component)
}

const Menu = ({ controlsRef }: { controlsRef: React.RefObject<HTMLDivElement> }) => {
  const [height, setHeight] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const currentSection = useCurrentSection()

  useEffect(() => {
    if (!menuRef.current) return
    const obs = new ResizeObserver((entries) => {
      setHeight(entries[0].target.getBoundingClientRect().height)
    })
    obs.observe(menuRef.current)
    return () => obs.disconnect()
  }, [menuRef.current])

  return <>
    <div className="menu-filler" style={{ height }}></div>
    <div className="menu" ref={menuRef}>
      <div className="controls" ref={controlsRef}></div>
      <div className="separator"></div>
      <div className="navigation">
        {Object.keys(sections).map(section =>
          <Link to={`/${section}`}>
            <button
              type="button"
              disabled={section === currentSection}>
              {sections[section].displayName}
            </button>
          </Link>)}
      </div>
    </div>
  </>
}
