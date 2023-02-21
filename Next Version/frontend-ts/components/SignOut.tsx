import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSignOutClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await signout();
    Router.push({
      pathname: `/signin`,
    });
  };

  return (
    <button type="button" onClick={handleSignOutClick}>
      Sign Out
    </button>
  );
}
