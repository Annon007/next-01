import { GetServerSideProps } from "next";
import React from "react";
interface Props {
  userName: string;
}
const UserProfile: React.FC<Props> = (props) => {
  return <div>{props.userName}</div>;
};
export default UserProfile;

export const getServerSideProps = async (context: GetServerSideProps) => {
  return {
    props: {
      userName: "Nihal",
    },
  };
};
