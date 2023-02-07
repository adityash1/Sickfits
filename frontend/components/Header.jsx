import Link from "next/link";
import PropTypes from "prop-types";
import Nav from "./Nav";

const Header = (props) => {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick Fits</Link>
      </div>
      <div className="subbar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
};

Header.propTypes = {};

export default Header;
