export const PurchaseListItem = ({ listItem, style }) => {
  return (
    <tr>
      <td
        className={
          style !== null
            ? `border-b-2 text-${style.purchasedTextColor} text-left`
            : `border-b-2 text-black text-left`
        }>
        {listItem.title}
      </td>
      <td
        className={
          style !== null
            ? `border-b-2 text-left text-${style.whenTextColor}`
            : `border-b-2 text-left text-black`
        }>
        {listItem.when}
      </td>
      <td
        className={
          style !== null
            ? `border-b-2 text-left text-${style.costTextColor}`
            : `border-b-2 text-left text-black`
        }>
        {listItem.cost}
      </td>
    </tr>
  );
};
