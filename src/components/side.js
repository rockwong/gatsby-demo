import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';

export default class Slide extends React.PureComponent {
  static propTypes = {
    siteTitle: PropTypes.string,
    list: PropTypes.array,
  };

  static defaultProps = {
    siteTitle: ``,
    list: [],
  };

  state = {
    activeNav: '',
    listObj: {},
  };

  componentDidMount() {
    this.initListObj();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.initListObj(nextProps);
    }
  }

  initListObj = (props = this.props) => {
    const listObjWidthNavName = props.list
      .filter(item => Boolean(item.node.fields.navName))
      .reduce((obj, item, index) => {
        const navName = item.node.fields.navName;

        // init activeNav
        console.log('index==', index, ' navName==', navName);
        if (index === 16 && !this.state.activeNav) this.setState({ activeNav: navName });

        // format date
        if (item.node.frontmatter.modified) {
          item.node.frontmatter.modified = moment(item.node.frontmatter.modified).format(
            'YYYY/DD/MM HH:mm',
          );
        } else {
          item.node.frontmatter.modified = 'Unknown date';
        }

        // datalist zip width obj
        obj[navName] = obj[navName] || [];
        obj[navName].push(item);
        return obj;
      }, {});
    this.setState({ listObj: listObjWidthNavName });
  };

  render() {
    const { siteTitle } = this.props;
    const { activeNav } = this.state;

    // nav list
    const navNameList = Object.keys(this.state.listObj);
    const navList = navNameList.map((navName, index) => (
      <li className="pure-menu-item" key={index}>
        <a href="#" className={`pure-menu-link ${activeNav === navName ? 'active' : ''}`}>
          {navName}
          <span className="email-count">({this.state.listObj[navName].length})</span>
        </a>
      </li>
    ));

    // excerpt list
    console.log('activeNav==', activeNav);
    const excerptListData = this.state.listObj[activeNav] || [];
    const excerptList = excerptListData.map(item => (
      <div className="email-item email-item-selected pure-g" key={item.node.id}>
        <div className="pure-u-3-4">
          <h5 className="email-name">
            {item.node.frontmatter.modified} · {item.node.fields.navName}
          </h5>
          <h4 className="email-subject">Hello from Toronto</h4>
          <p className="email-desc">
            Hey, I just wanted to check in with you from Toronto. I got here earlier today.
          </p>
        </div>
      </div>
    ));

    return (
      <>
        <div id="nav" className="pure-u">
          <a href="#" className="nav-menu-button">
            Menu
          </a>

          <div className="nav-inner">
            <Link to="/" className="primary-button pure-button">
              {siteTitle}
            </Link>

            <div className="pure-menu">
              <ul className="pure-menu-list">
                {navList}
                <li className="pure-menu-heading">Personal</li>
                <li className="pure-menu-item">
                  <a href="#" className="pure-menu-link">
                    <span className="email-label-personal" />
                    About me
                  </a>
                </li>
                <li className="pure-menu-item">
                  <a href="#" className="pure-menu-link">
                    <span className="email-label-work" />
                    Work
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="list" className="pure-u-1">
          {excerptList}
          <div className="email-item email-item-selected pure-g">
            <div className="pure-u-3-4">
              <h5 className="email-name">Tilo Mitra</h5>
              <h4 className="email-subject">Hello from Toronto</h4>
              <p className="email-desc">
                Hey, I just wanted to check in with you from Toronto. I got here earlier today.
              </p>
            </div>
          </div>

          <div className="email-item email-item-unread pure-g">
            <div className="pure-u">
              <img
                width="64"
                height="64"
                alt="Eric Ferraiuolo&#x27;s avatar"
                className="email-avatar"
                src="img/common/ericf-avatar.png"
              />
            </div>

            <div className="pure-u-3-4">
              <h5 className="email-name">Eric Ferraiuolo</h5>
              <h4 className="email-subject">Re: Pull Requests</h4>
              <p className="email-desc">
                Hey, I had some feedback for pull request #51. We should center the menu so it looks
                better on mobile.
              </p>
            </div>
          </div>

          <div className="email-item email-item-unread pure-g">
            <div className="pure-u">
              <img
                width="64"
                height="64"
                alt="YUI&#x27;s avatar"
                className="email-avatar"
                src="img/common/yui-avatar.png"
              />
            </div>

            <div className="pure-u-3-4">
              <h5 className="email-name">YUI Library</h5>
              <h4 className="email-subject">You have 5 bugs assigned to you</h4>
              <p className="email-desc">
                Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu
                fugiat nulla.
              </p>
            </div>
          </div>

          <div className="email-item pure-g">
            <div className="pure-u">
              <img
                width="64"
                height="64"
                alt="Reid Burke&#x27;s avatar"
                className="email-avatar"
                src="img/common/reid-avatar.png"
              />
            </div>

            <div className="pure-u-3-4">
              <h5 className="email-name">Reid Burke</h5>
              <h4 className="email-subject">Re: Design Language</h4>
              <p className="email-desc">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa.
              </p>
            </div>
          </div>

          <div className="email-item pure-g">
            <div className="pure-u">
              <img
                width="64"
                height="64"
                alt="Andrew Wooldridge&#x27;s avatar"
                className="email-avatar"
                src="img/common/andrew-avatar.png"
              />
            </div>

            <div className="pure-u-3-4">
              <h5 className="email-name">Andrew Wooldridge</h5>
              <h4 className="email-subject">YUI Blog Updates?</h4>
              <p className="email-desc">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
          </div>

          <div className="email-item pure-g">
            <div className="pure-u">
              <img
                width="64"
                height="64"
                alt="Yahoo! Finance&#x27;s Avatar"
                className="email-avatar"
                src="img/common/yfinance-avatar.png"
              />
            </div>

            <div className="pure-u-3-4">
              <h5 className="email-name">Yahoo! Finance</h5>
              <h4 className="email-subject">How to protect your finances from winter storms</h4>
              <p className="email-desc">
                Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada
                mauris.
              </p>
            </div>
          </div>

          <div className="email-item pure-g">
            <div className="pure-u">
              <img
                width="64"
                height="64"
                alt="Yahoo! News&#x27; avatar"
                className="email-avatar"
                src="img/common/ynews-avatar.png"
              />
            </div>

            <div className="pure-u-3-4">
              <h5 className="email-name">Yahoo! News</h5>
              <h4 className="email-subject">Summary for April 3rd, 2012</h4>
              <p className="email-desc">We found 10 news articles that you may like.</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
