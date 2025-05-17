export const filterItems = (items, query) => {
  if (!query || query.trim() === "") {
    return items;
  }

  return items.filter((item) =>
    item.item_type?.toLowerCase().includes(query.toLowerCase())
  );
};
