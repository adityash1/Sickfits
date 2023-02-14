import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "./styles/Form";
import { useForm } from "react-hook-form";
import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";
import Loader from "./styles/Loading";
import { useEffect } from "react";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onSubmit = async (data) => {
    console.log(data);
    signup({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loading && <Loader />}
        <h2>Sign Up For An Account</h2>
        <Error error={error} />
        <fieldset>
          {data?.createUser && (
            <p>Signed Up With {data.createUser.email} - You Can Sign In!</p>
          )}
          <label htmlFor="email">
            Name
            <input
              type="name"
              name="name"
              placeholder="Your Name"
              autoComplete="name"
              {...register("name", { required: true })}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              autoComplete="email"
              {...register("email", { required: true })}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              {...register("password", { required: true })}
            />
          </label>
          <input type="submit" value="Sign Up!" />
        </fieldset>
      </Form>
    </>
  );
}
