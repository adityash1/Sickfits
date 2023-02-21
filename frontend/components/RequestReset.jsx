import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "./styles/Form";
import { useForm } from "react-hook-form";
import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";
import Loader from "./styles/Loading";
import { useEffect } from "react";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const onSubmit = async (data) => {
    console.log(data);
    await signup({
      variables: {
        email: data.email,
      },
    }).catch(console.error);
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
        <h2>Request a Password Reset</h2>
        <Error error={error} />
        <fieldset>
          {data?.sendUserPasswordResetLink === null && (
            <p>Success! Check your email for a link!</p>
          )}
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
          <input type="submit" value="Request Reset" />
        </fieldset>
      </Form>
    </>
  );
}
