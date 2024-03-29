import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-5.jpg';

import React from 'react';
import {
 
  MdGroupWork,
  MdPages,
  MdStar,
  MdViewCarousel,
  MdViewList,
  MdWork,
  MdKeyboardArrowDown,
  MdReceipt

} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navContents = [
  { to: '/attendance-report', name: 'attendance', exact: false, Icon: MdViewList },
  { to: '/monthy-record', name: 'monthly record', exact: false, Icon: MdReceipt },
];

const navItems = [

  { to: '/employees', name: 'employees', exact: false, Icon: MdGroupWork },
  { to: '/attendance', name: 'attendance', exact: false, Icon: MdViewList },
  { to: '/leave', name: 'leave', exact: false, Icon: MdStar },
  { to: '/payroll', name: 'payroll', exact: false, Icon: MdPages },
  { to: '/break', name: 'Breaks', exact: false, Icon: MdViewCarousel },
  // { to: '/reports', name: 'Reports', exact: false, Icon: MdWork },

];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenContents: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <h1 className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                Admin Panel
              </span>
            </h1>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
              
            ))}


          </Nav>
          <Nav vertical>
          <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdWork className={bem.e('nav-item-icon')} />
                  <span className="">Reports</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
          
        </div>
      </aside>
    );
  }
}

export default Sidebar;
