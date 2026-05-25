export const comfortShelf = [
  {
    id: 1,
    name: "Amul Butterscotch Ice Cream",
    price: 149,
    image: "🍦",
    frozenSafe: true,
    confidence: "high",
    tags: ["Sweet fix", "Popular"]
  },
  {
    id: 2,
    name: "Lay's Classic Salted",
    price: 40,
    image: "🥔",
    frozenSafe: false,
    confidence: "high",
    tags: ["Movie night"]
  },
  {
    id: 3,
    name: "Maggi 2-Minute Noodles (Pack of 4)",
    price: 56,
    image: "🍜",
    frozenSafe: false,
    confidence: "high",
    tags: ["Quick bite"]
  },
  {
    id: 4,
    name: "Cadbury Dairy Milk Silk",
    price: 150,
    image: "🍫",
    frozenSafe: false,
    confidence: "high",
    tags: ["Comfort food"]
  }
];

export const previousOrders = [
  {
    id: "order_1",
    name: "Your Last Comfort Order",
    date: "3 days ago",
    items: ["Amul Butterscotch Ice Cream", "Lay's Classic Salted"],
    productIds: [1, 2],
    total: 189,
    itemCount: 2
  },
  {
    id: "order_2",
    name: "Friday Night Combo",
    date: "Last Friday",
    items: ["Maggi Noodles", "Cadbury Silk", "Lay's"],
    productIds: [3, 4, 2],
    total: 246,
    itemCount: 3
  }
];
