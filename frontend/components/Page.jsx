import PropTypes from "prop-types";
import Header from "./Header";

const Page = ({ children }) => {
  return (
    <div>
      <Header />
      <h2>Its a page component</h2>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
