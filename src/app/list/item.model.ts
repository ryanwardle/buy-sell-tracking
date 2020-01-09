// Need to create Item model, rewrite code using item model, add ID to model and delete items by checking for id;

export interface Item {
  date: Date;
  description: string;
  cost: number;
  retail: number;
  soldDate: Date;
  soldPrice: number;
  id: string;
}
