import moment from "moment"
import { Item, Product, products } from "../core/data";

import { days, Meal, meals, WeekPlan } from "../core/models";

export type Timestamp = {
  meal: Meal,
  date: [number, number, number]
}

export default function(weekPlan: WeekPlan<Product>, from: Timestamp, to: Timestamp): Item[] {
  const fromDate = moment(from.date)
  const toDate = moment(to.date)
  const daysDiff = toDate.diff(fromDate, "days")
  const completeDays = Math.max(0, daysDiff-1)

  const totalMeals =
    (meals.length - meals.indexOf(from.meal)) +
    (completeDays * meals.length) +
    (meals.indexOf(to.meal) + 1);

  const amountMap: { [key in Product]?: { amount: number } } = {}
  let mealCounter = meals.indexOf(from.meal);

  for(let i = 0; i < totalMeals; i++) {
    const meal = meals[mealCounter % meals.length]
    const dayCounter = Math.floor(mealCounter / 3)
    const day = days[fromDate.clone().add(dayCounter, "days").weekday()]

    for (const item of weekPlan[day][meal]) {
      const amountMapCell = amountMap[item.product] || { amount: 0 }
      amountMapCell.amount += item.amount
      amountMap[item.product] = amountMapCell
    }

    mealCounter++
  }

  const result: Item[] = []

  for (const product of products) {
    const amount = amountMap[product]?.amount || undefined
    if (amount) {
      result.push({ product, amount })
    }
  }

  return result;
}
