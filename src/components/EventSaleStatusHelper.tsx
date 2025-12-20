import { SaleStatus } from "@/convex/schema";

export function EventSaleStatusHelper(saleStatus: SaleStatus) {
  let status = "";

  if (saleStatus === SaleStatus.SoldOut) {
    status = "Sold out";
  }

  if (saleStatus === SaleStatus.OnSale) {
    status = "On sale";
  }

  if (saleStatus === SaleStatus.Upcoming) {
    status = "Upcoming";
  }

  return status;
}
