import "./App.style.scss"

import React, { useState, useRef, useEffect } from "react"
import { HashRouter, Switch, Route, Redirect, Link } from "react-router-dom"

import { ControlsPortalContext } from "./utils/ControlsPortal"

import ShoppingListSection from "./sections/ShoppingList/ShoppingList.component"
import PlanningSection from "./sections/Planning/Planning.component"

const routes: [string, string, () => JSX.Element][] = [
  ["shopping-list", "Shopping List", ShoppingListSection],
  ["planning", "Planning", PlanningSection]
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
              <Route exact path={`/${r[0]}`}>
                {React.createElement(r[2])}
              </Route>)}
          </Switch>
        </ControlsPortalContext.Provider>
      </div>

      <Footer controlsRef={controlsRef} />

    </div>
  </HashRouter>
}

const Footer = ({ controlsRef }: { controlsRef: React.RefObject<HTMLDivElement> }) => {
  const [height, setHeight] = useState(0)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(footerRef.current)
    if (!footerRef.current) return
    const obs = new ResizeObserver((entries) => {
      setHeight(entries[0].target.getBoundingClientRect().height)
    })
    obs.observe(footerRef.current)
    return () => obs.disconnect()
  }, [footerRef.current])

  return <>
    <div className="footer-filler" style={{ height }}></div>
    <div className="footer" ref={footerRef}>
      <div className="controls" ref={controlsRef}></div>
      <div className="navigation">
        {routes.map(r =>
          <Link to={`/${r[0]}`}>
            <button>{r[1]}</button>
          </Link>)}
      </div>
    </div>
  </>
}
