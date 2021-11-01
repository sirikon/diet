import "./Planning.style.scss"

import React from "react"
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom"
import { days, meals, Day } from "../../../core/models"
import { ControlsPortal } from "../../utils/ControlsPortal"
import { weekPlan } from "../../../core/data"

const defaultDay = () => days[new Date().getDay()];

const useCurrentDay = (): Day => {
  const dayInRoute = useRouteMatch<{ day?: string }>("/:section?/:day?")?.params.day;
  if (dayInRoute == null) return defaultDay()
  if (days.indexOf(dayInRoute as Day) === -1) return defaultDay()
  return dayInRoute as Day;
}

export default () => {
  
  const day = useCurrentDay()
  const dayNumbers = days.map((_, i) => (i+1)%days.length);

  return <>
    
    <h3>{day[0].toUpperCase() + day.slice(1)}</h3>

    {meals.map(meal => <>
      <h4>{meal[0].toUpperCase() + meal.slice(1)}</h4>
      <ul>
        {weekPlan[day][meal].map(item => <li>{item.amount} {item.product}</li>)}
      </ul>
    </>)}

    <ControlsPortal>
      <div className="planning-controls">
        {dayNumbers.map((n) =>
          <Link to={`/planning/${days[n]}`}>
            <button
              type="button"
              disabled={days[n] === day}>
              {days[n]}
            </button>
          </Link>)}
      </div>
    </ControlsPortal>
  </>
}
