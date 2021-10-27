import React from "react"
import { weekPlan } from "../core/data";
import shoppingList from "../services/shoppingList"

export default () => {

  const list = shoppingList(weekPlan, {
    meal: "breakfast",
    date: [2021, 9, 28]
  }, {
    meal: "dinner",
    date: [2021, 9, 31]
  })

  return <>
    <h1>Shopping list</h1>
    <ul>
      {list.map(l => <li>{l.amount} {l.product}</li>)}
    </ul>
  </>
}
