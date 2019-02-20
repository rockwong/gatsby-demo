import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Nav from "./nav";
import List from "./list";
import "./layout.css";
import "./pure.css";
import "./email.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div id="layout" className="content pure-g">
        <Nav siteTitle={data.site.siteMetadata.title} />
        <List siteTitle={data.site.siteMetadata.title} />
        <div id="main" className="pure-u-1">
          wwe
          {children}
        </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
