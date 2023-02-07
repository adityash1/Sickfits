import PropTypes from "prop-types";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import Header from "./Header";

const Page = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
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
