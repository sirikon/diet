import "./ShoppingList.style.scss"

import React, { useState } from "react"

import { weekPlan } from "../../../core/data";
import shoppingList, { Timestamp } from "../../../services/shoppingListGenerator"
import { Meal, meals } from "../../../core/models";
import { ControlsPortal } from "../../utils/ControlsPortal";

type AppState = {
  fromDate: Timestamp["date"],
  fromMeal: Timestamp["meal"],
  toDate: Timestamp["date"],
  toMeal: Timestamp["meal"]
}

export default () => {

  const [state, setState] = useState<AppState>({
    fromDate: now(),
    fromMeal: meals[0],
    toDate: now(),
    toMeal: meals[meals.length-1]
  })

  const list = shoppingList(weekPlan,
    { date: state.fromDate, meal: state.fromMeal },
    { date: state.toDate, meal: state.toMeal })

  return <>
    <ul>
      {list.map(l => <li>{l.amount} {l.product}</li>)}
    </ul>

    <ControlsPortal>
      <div className="shopping-list-controls">
        <div>
          <span>From</span>
          <DateInput value={state.fromDate} onChange={(d) => setState((s) => ({ ...s, fromDate: d }))} />
          <MealSelector value={state.fromMeal} onChange={(m) => setState((s) => ({ ...s, fromMeal: m }))} />
        </div>
        <div>
          <span>To</span>
          <DateInput value={state.toDate} onChange={(d) => setState((s) => ({ ...s, toDate: d }))} />
          <MealSelector value={state.toMeal} onChange={(m) => setState((s) => ({ ...s, toMeal: m }))} />
        </div>
      </div>
    </ControlsPortal>
  </>
}

const MealSelector = (args: { value: Meal, onChange: (m: Meal) => void }) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (meals.indexOf(e.target.value as Meal) >= 0) {
      args.onChange(e.target.value as Meal)
    }
  }

  return (
    <select className="meal-selector" onChange={onChange} value={args.value}>
      {meals.map(m => <option value={m}>{m}</option>)}
    </select>
  )
}

const DateInput = (args: { value: Timestamp["date"], onChange: (m: Timestamp["date"]) => void }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parts = e.target.value.split("-");
    args.onChange([
      parseInt(parts[0]),
      parseInt(parts[1])-1,
      parseInt(parts[2])
    ])
  }

  const value = [
    args.value[0],
    (args.value[1]+1).toString().padStart(2, "0"),
    args.value[2].toString().padStart(2, "0")
  ].join("-");

  return (
    <input className="date-input" type="date" value={value} onChange={onChange} />
  )
}

const now = (): Timestamp["date"] => {
  const n = new Date();
  return [n.getFullYear(), n.getMonth(), n.getDate()]
}
