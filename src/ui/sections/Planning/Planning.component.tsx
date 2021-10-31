import "./Planning.style.scss"

import React from "react"
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom"
import { days, meals } from "../../../core/models"
import { ControlsPortal } from "../../utils/ControlsPortal"
import { weekPlan } from "../../../core/data"

export default () => {
  
  const location = useLocation()
  const dayNumbers = days.map((_, i) => (i+1)%days.length);

  return <>
    
    <Switch>
      <Route exact path="/planning">
        <Redirect to={`/planning/${days[new Date().getDay()]}`}></Redirect>
      </Route>
      {days.map(day => (
        <Route path={`/planning/${day}`}>
          <h3>{day[0].toUpperCase() + day.slice(1)}</h3>

          {meals.map(meal => <>
            <h4>{meal[0].toUpperCase() + meal.slice(1)}</h4>
            <ul>
              {weekPlan[day][meal].map(item => <li>{item.amount} {item.product}</li>)}
            </ul>
          </>)}
        </Route>
      ))}
    </Switch>

    <ControlsPortal>
      <div className="planning-controls">
        {dayNumbers.map((n) =>
          <Link to={`/planning/${days[n]}`}>
            <button type="button" disabled={location.pathname.startsWith(`/planning/${days[n]}`)}>{days[n]}</button>
          </Link>)}
      </div>
    </ControlsPortal>
  </>
}
