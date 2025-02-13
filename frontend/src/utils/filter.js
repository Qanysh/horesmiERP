export const filterItems = (items, query) => {
  return items.filter((item) =>
    item.item_type?.toLowerCase().includes(query.toLowerCase())
  );
};
