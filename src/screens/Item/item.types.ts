export interface ListItem {
  itemName: string;
  itemId: string;
  itemQuantity: string;
  itemType: string;
}

export interface List {
  listId: string;
  listItens: ListItem[];
  listName: string;
  listActivity: boolean;
  listColor: string;
}
