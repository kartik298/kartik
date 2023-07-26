import { ListHeader } from "../ListHeader";
import { PurchaseListItem } from "./PurchaseListItem";

export const PurchaseList = () => {
  const purchaseData = {
    purchaseHeadings: ["Last Purchased", "When", "Cost"],
    purchaseList: [
      { id: 1, title: "Quantum Time", when: "1 min ago", cost: "$ 50" },
      { id: 2, title: "Quantum Time", when: "1 week ago", cost: "$ 50" },
      { id: 3, title: "Pro Tools", when: "1 month ago", cost: "$ 50" },
    ],
    purchaseStyle: {
      headingColor: "gray-400",
      headingListItem: {
        purchasedTextColor: "gray-400",
        whenTextColor: "gray-400",
        costTextColor: "gray-400",
      },
    },
  };

  return (
    <div className="flex w-full py-2 px-4">
      {purchaseData !== null ? (
        <table className="w-full">
          <ListHeader
            col_1={purchaseData.purchaseHeadings[0]}
            col_2={purchaseData.purchaseHeadings[1]}
            col_3={purchaseData.purchaseHeadings[2]}
          />
          <tbody className="w-full">
            {purchaseData.purchaseList !== null
              ? purchaseData.purchaseList.map((purchaseListItem) => (
                  <PurchaseListItem
                    key={purchaseListItem.id}
                    listItem={purchaseListItem}
                    style={purchaseData.purchaseStyle}
                  />
                ))
              : null}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
