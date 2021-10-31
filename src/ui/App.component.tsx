import "./App.style.scss"

import React, { useState, useRef, useEffect } from "react"
import { HashRouter, Switch, Route, Redirect, NavLink, Link, useLocation } from "react-router-dom"

import { ControlsPortalContext } from "./utils/ControlsPortal"

import ShoppingListSection from "./sections/ShoppingList/ShoppingList.component"
import PlanningSection from "./sections/Planning/Planning.component"

const routes: [string, string, () => JSX.Element][] = [
  ["planning", "Planning", PlanningSection],
  ["shopping-list", "Shopping List", ShoppingListSection],
]

export default () => {

  const controlsRef = useRef<HTMLDivElement>(null)
  const [controlsElement, setControlsElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setControlsElement(controlsRef.current)
  }, [controlsRef.current])

  return <HashRouter>
    <div className="container">

      <div className="content">
        <ControlsPortalContext.Provider value={{ controlsElement }}>
          <Switch>
            <Route exact path="/">
              <Redirect to={`/${routes[0][0]}`}></Redirect>
            </Route>
            {routes.map(r =>
              <Route path={`/${r[0]}`}>
                {React.createElement(r[2])}
              </Route>)}
          </Switch>
        </ControlsPortalContext.Provider>
      </div>

      <Menu controlsRef={controlsRef} />

    </div>
  </HashRouter>
}

const Menu = ({ controlsRef }: { controlsRef: React.RefObject<HTMLDivElement> }) => {
  const [height, setHeight] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

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
        {routes.map(r =>
          <Link to={`/${r[0]}`}>
            <button type="button" disabled={location.pathname.startsWith(`/${r[0]}`)}>{r[1]}</button>
          </Link>)}
      </div>
    </div>
  </>
}
