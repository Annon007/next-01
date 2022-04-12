import React from "react";
import fs from "fs/promises";
import path from "path";
import { GetStaticPropsContext } from "next";
interface ParseData {
  products: [
    {
      id: string;
    }
  ];
}

// interface Props {
//   product: [
//     {
//       id: string;
//       title: string;
//     }
//   ];
// }
interface Props {
  product: {
    id: string;
    title: string;
    description: string;
  };
}
const ProductDetails: React.FC<Props> = (props) => {
  if (!props.product) {
    console.log("Loading...");
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>{props.product.title}</h1>
      <p>{props.product.description}</p>
    </div>
  );
};
const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data: ParseData = JSON.parse(`${jsonData}`);
  return data;
};
export const getStaticProps = async (context: GetStaticPropsContext) => {
  console.log(context.params);
  const id = context.params?.pid;
  const fetchedData = await getData();
  const data = fetchedData.products.find((pl) => id === pl.id);
  console.log(data);
  return {
    props: { product: data },
  };
};

export const getStaticPaths = async () => {
  const fetchedData = await getData();

  const path = fetchedData.products.map((pl) => ({ params: { pid: pl.id } }));
  //   console.log(path);
  return {
    paths: path,
    fallback: true, // false or 'blocking'({ params: { pId: id } })
  };
};
export default ProductDetails;
