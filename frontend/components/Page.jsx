import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "./Header";
import GlobalStyles from "./globalStyles";

const Page = ({ children }) => {
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

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
