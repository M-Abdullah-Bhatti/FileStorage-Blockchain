import { Link } from "react-router-dom";

const NavLink = ({ data }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      textColor: "black",
    }}
    to={data.linkUrl}
  >
    {data.linkText}
  </Link>
);

export default NavLink;
