import { BaseItem, WeekPlan } from "./models";

export const products = [
  "gr Queso en lonchas",
  "gr Pechuga de pavo en lonchas",
  "u Fruta grande",
  "raciones Verduras",
  "raciones Lechuga",
  "raciones Ensalada",
  "raciones Legumbres",
  "gr Almendras",
  "gr Patatas",
  "gr Pechuga de pollo",
  "gr Pechuga de pavo",
  "gr Carne roja",
  "gr Pescado azul",
  "gr Pescado blanco",
  "ml Leche",
  "Arroz en vasitos para microondas",
  "Tomate",
  "Yogur natural",
  "gr Chocolate 85%",
] as const
export type Product = (typeof products)[number]

export type Item = BaseItem<Product>
const item = (amount: number, product: Product): Item =>
  ({ amount, product })

const breakfast = (): Item[] => [
  item(40, "gr Queso en lonchas"),
  item(70, "gr Pechuga de pavo en lonchas"),
  item(1, "u Fruta grande")
]

export const weekPlan: WeekPlan<Product> = {
  monday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Verduras"),
      item(200, "gr Pechuga de pollo"),
      item(1, "u Fruta grande")
    ],
    dinner: [
      item(1, "Arroz en vasitos para microondas"),
      item(200, "gr Pescado azul"),
      item(200, "ml Leche")
    ]
  },

  tuesday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Verduras"),
      item(200, "gr Pechuga de pavo"),
      item(1, "raciones Lechuga"),
      item(1, "Tomate")
    ],
    dinner: [
      item(400, "gr Patatas"),
      item(200, "gr Pescado blanco"),
      item(200, "ml Leche")
    ]
  },

  wednesday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Verduras"),
      item(100, "gr Patatas"),
      item(200, "gr Pechuga de pollo")
    ],
    dinner: [
      item(1, "Arroz en vasitos para microondas"),
      item(200, "gr Pechuga de pollo"),
      item(30, "gr Chocolate 85%")
    ]
  },

  thursday: {
    breakfast: breakfast(),
    lunch: [
      item(200, "gr Carne roja"),
      item(1, "raciones Ensalada"),
      item(40, "gr Almendras")
    ],
    dinner: [
      item(1, "Arroz en vasitos para microondas"),
      item(200, "gr Pechuga de pavo"),
      item(30, "gr Chocolate 85%")
    ]
  },

  friday: {
    breakfast: breakfast(),
    lunch: [
      item(200, "gr Carne roja"),
      item(1, "raciones Ensalada"),
      item(40, "gr Almendras")
    ],
    dinner: [
      item(400, "gr Patatas"),
      item(200, "gr Pescado blanco"),
      item(200, "ml Leche")
    ]
  },

  saturday: {
    breakfast: breakfast(),
    lunch: [
      item(200, "gr Pescado blanco")
    ],
    dinner: []
  },

  sunday: {
    breakfast: breakfast(),
    lunch: [
      item(1, "raciones Legumbres"),
      item(200, "gr Pescado blanco"),
      item(1, "Yogur natural")
    ],
    dinner: [
      item(1, "Arroz en vasitos para microondas"),
      item(200, "gr Pechuga de pavo"),
      item(30, "gr Chocolate 85%")
    ]
  }
}
