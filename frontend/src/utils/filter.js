export function filterItems(items, query) {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) =>
    item.item_no.toLowerCase().includes(lowerQuery)
  );
}
