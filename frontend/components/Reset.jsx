import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "./styles/Form";
import { useForm } from "react-hook-form";
import Error from "./ErrorMessage";
import { useEffect } from "react";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const {
    register,
    handleSubmit,
    formState,
    resetForm,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      token,
    },
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
    },
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  console.log(error);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(inputs);
    const res = await reset().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      resetForm({});
    }
  }, [formState, resetForm]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Reset Your Password</h2>
      <Error error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can Now sign in</p>
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
        <input type="submit" value="Request Reset!" />
      </fieldset>
    </Form>
  );
}
