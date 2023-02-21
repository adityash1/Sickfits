import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "./styles/Form";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";
import { useEffect } from "react";
import Router from "next/router";
import Loader from "./styles/Loading";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    // refectch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await signin({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    console.log(res);
    Router.push({
      pathname: `/products`,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loading && <Loader />}
        <h2>Sign Into Your Account</h2>
        <Error error={error} />
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              type="email"
              placeholder="Your Email Address"
              autoComplete="email"
              {...register("email", { required: true })}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              placeholder="Password"
              autoComplete="password"
              {...register("password", { required: true })}
            />
          </label>
          <input type="submit" value="Sign In!" />
        </fieldset>
      </Form>
    </>
  );
}
