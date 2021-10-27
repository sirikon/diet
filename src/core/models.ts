export type BaseItem<P> = {
  amount: number,
  product: P
}

// <3 https://stackoverflow.com/a/45486495

export const meals = ["breakfast", "lunch", "dinner"] as const
export type Meal = (typeof meals)[number]

export const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
export type Day = (typeof days)[number]


export type WeekPlan<P> = {
  [key in Day]: { [key in Meal]: BaseItem<P>[] }
}
