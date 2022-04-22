import { GetServerSidePropsContext } from "next";
import React from "react";
interface Props {
  id: string;
}
const UderDetails: React.FC<Props> = (props) => {
  return <div>{props.id}</div>;
};
export default UderDetails;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  console.log(context);
  const userId = params?.uid;
  return {
    props: {
      id: `user-Id: ${userId}`,
    },
  };
};
