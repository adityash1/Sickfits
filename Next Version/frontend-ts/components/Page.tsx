import styled from "styled-components";
import Header from "./Header";
import GlobalStyles from "./globalStyles";

type Props = {
  children: React.ReactNode;
};

const Page = ({ children }: Props) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </>
  );
};

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export default Page;
