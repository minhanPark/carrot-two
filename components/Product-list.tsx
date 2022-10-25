import { Kind, Product } from "@prisma/client";
import useSWR from "swr";
import Item from "./item";

interface ProductList {
  kind: Kind;
}

interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductList) {
  const { data } = useSWR<ProductListResponse>(
    `/api/users/me/record?kind=${kind}`
  );
  return data ? (
    <>
      {data?.records?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
