import { BaseItem, WeekPlan } from "./models";

export const products = [
  "gr Queso en lonchas",
  "gr Pechuga de pavo en lonchas",
  "Frutas grandes",
  "raciones Verduras",
  "raciones Lechuga",
  "raciones Ensalada",
  "raciones Legumbres",
  "gr Almendras",
  "gr Nueces",
  "gr Patatas",
  "gr Pechuga de pollo",
  "gr Pechuga de pavo",
  "gr Carne roja",
  "gr Pescado azul",
  "gr Pescado blanco",
  "ml Leche",
  "gr Arroz cocido",
  "Tomates",
  "Yogures naturales",
  "gr Chocolate 85%",
] as const
export type Product = (typeof products)[number]

export type Item = BaseItem<Product>
const item = (amount: number, product: Product): Item =>
  ({ amount, product })

const breakfast = (): Item[] => [
  item(40, "gr Queso en lonchas"),
  item(70, "gr Pechuga de pavo en lonchas"),
  item(1, "Frutas grandes")
]

const cookedWeight = (n: number) => n * 2.7;

export const weekPlan: WeekPlan<Product> = {
  monday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Verduras"),
      item(250, "gr Pechuga de pollo"),
      item(1, "Frutas grandes")
    ],
    dinner: [
      item(cookedWeight(70), "gr Arroz cocido"),
      item(200, "gr Pescado azul"),
      item(200, "ml Leche")
    ]
  },

  tuesday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Verduras"),
      item(250, "gr Pechuga de pavo"),
      item(1, "raciones Lechuga"),
      item(1, "Tomates")
    ],
    dinner: [
      item(400, "gr Patatas"),
      item(250, "gr Pescado blanco"),
      item(200, "ml Leche")
    ]
  },

  wednesday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Verduras"),
      item(100, "gr Patatas"),
      item(250, "gr Pechuga de pollo")
    ],
    dinner: [
      item(cookedWeight(70), "gr Arroz cocido"),
      item(250, "gr Pechuga de pollo"),
      item(30, "gr Chocolate 85%")
    ]
  },

  thursday: {
    breakfast: breakfast(),
    lunch: [
      item(200, "gr Carne roja"),
      item(1, "raciones Ensalada"),
      item(30, "gr Nueces")
    ],
    dinner: [
      item(cookedWeight(70), "gr Arroz cocido"),
      item(225, "gr Pechuga de pavo"),
      item(30, "gr Chocolate 85%")
    ]
  },

  friday: {
    breakfast: breakfast(),
    lunch: [
      item(200, "gr Carne roja"),
      item(1, "raciones Ensalada"),
      item(30, "gr Nueces")
    ],
    dinner: [
      item(400, "gr Patatas"),
      item(225, "gr Pescado blanco"),
      item(200, "ml Leche")
    ]
  },

  saturday: {
    breakfast: breakfast(),
    lunch: [
      item(250, "gr Pescado blanco")
    ],
    dinner: []
  },

  sunday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Legumbres"),
      item(250, "gr Pescado blanco"),
      item(1, "Yogures naturales")
    ],
    dinner: [
      item(cookedWeight(70), "gr Arroz cocido"),
      item(225, "gr Pechuga de pavo"),
      item(30, "gr Chocolate 85%")
    ]
  }
}
