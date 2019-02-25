import { Link, push } from 'gatsby';
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import { Match, globalHistory } from '@reach/router';
import emoji from 'emojione';

console.log('emojione===', emoji);

console.log('globalHistory==', globalHistory);

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
    this.init();
    const locationName = window.location.pathname.split('/')[1];
    const decodeName = decodeURI(locationName);
    if (decodeName) this.setState({ activeNav: decodeName });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.init(nextProps);
    }
  }

  itemClick = url => e => {
    e.preventDefault();
    push(url);
  };

  navClick = navName => e => {
    e.preventDefault();
    this.setState({ activeNav: navName });
  };

  checkIsCurrent = pathname => encodeURI(pathname) === globalHistory.location.pathname;

  init = (props = this.props) => {
    const listObjWidthNavName = props.list
      .filter(item => Boolean(item.node.fields.navName))
      .reduce((obj, item, index) => {
        const navName = item.node.fields.navName;

        // init activeNav
        console.log('index==', index, ' navName==', navName);
        if (index === 0 && !this.state.activeNav) this.setState({ activeNav: navName });

        // format date
        const unknownDate = 'Unknown date';
        const date = item.node.frontmatter.modified;
        if (date && date !== unknownDate) {
          item.node.frontmatter.modified = moment(date).format('YYYY/DD/MM HH:mm');
        } else {
          item.node.frontmatter.modified = unknownDate;
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
    const { activeNav, listObj } = this.state;
    console.log('slide props=', this.props);
    // nav list
    const navNameList = Object.keys(listObj);
    const navList = navNameList.map((navName, index) => (
      <li className="pure-menu-item" key={index}>
        <a
          onClick={this.navClick(navName)}
          className={`pure-menu-link ${activeNav === navName ? 'active' : ''}`}
        >
          {navName}
          <span className="email-count">({listObj[navName].length})</span>
        </a>
      </li>
    ));

    // excerpt list1
    console.log('this.state==', this.state);
    const excerptListData = listObj[activeNav] || [];
    const excerptList = excerptListData.map(item => (
      <div
        onClick={this.itemClick(item.node.fields.tagPath)}
        className={`email-item  pure-g ${
          this.checkIsCurrent(item.node.fields.tagPath)
            ? 'email-item-unread email-item-selected'
            : ''
        }`}
        key={item.node.id}
      >
        <div className="pure-u-1">
          <h5 className="email-name">
            {item.node.frontmatter.modified} · {item.node.fields.navName}
          </h5>
          <h4
            className="email-subject"
            dangerouslySetInnerHTML={{ __html: emoji.toImage(item.node.frontmatter.title) }}
          />
          <p className="email-desc">{item.node.excerpt}</p>
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
                    About
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
        </div>
      </>
    );
  }
}
