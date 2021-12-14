import "./App.style.scss"
import React, { useState, useEffect, useCallback } from "react"
import { HashRouter, Link, useRouteMatch } from "react-router-dom"
import { ControlsPortalContext } from "./utils/ControlsPortal"
import ShoppingListSection from "./sections/ShoppingList/ShoppingList.component"
import PlanningSection from "./sections/Planning/Planning.component"

const sections: { [key: string]: { displayName: string, component: (args: { basePath: string }) => JSX.Element } } = {
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

const useNavigation = () => {
  const path = "/:section?"
  const match = useRouteMatch<{ section?: string }>(path)
  return {
    basePath: path,
    currentSection: match?.params.section || getDefaultSection()
  }
}

export default () => {

  const [controlsElement, setControlsElement] = useState<HTMLDivElement | null>(null)
  const controlsRef = useCallback(setControlsElement, []);

  return <HashRouter>
    <div className="container">

      <div className="content">
        <ControlsPortalContext.Provider value={{ controlsElement }}>
          <CurrentSection />
        </ControlsPortalContext.Provider>
      </div>

      <Menu controlsRef={controlsRef} />

    </div>
  </HashRouter>
}

const CurrentSection = () => {
  const { currentSection, basePath } = useNavigation()
  return React.createElement(sections[currentSection].component, { basePath })
}

const Menu = ({ controlsRef }: { controlsRef: React.LegacyRef<HTMLDivElement> }) => {
  const [height, setHeight] = useState(0)
  const [menuElement, setMenuElement] = useState<HTMLDivElement | null>(null)
  const menuRef = useCallback(setMenuElement, [])
  const { currentSection } = useNavigation()

  useEffect(() => {
    if (!menuElement) return
    const obs = new ResizeObserver((entries) => {
      setHeight(entries[0].target.getBoundingClientRect().height)
    })
    obs.observe(menuElement)
    return () => obs.disconnect()
  }, [menuElement])

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
