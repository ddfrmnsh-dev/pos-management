import { redirect } from "next/navigation";

export default function Page() {
  redirect("/sales/order-history");
  return <>Coming Soon</>;
}
