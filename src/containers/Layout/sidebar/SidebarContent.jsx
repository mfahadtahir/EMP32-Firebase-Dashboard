import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <SidebarLink title="Dashboard" icon="home" route="/dashboard" onClick={this.hideSidebar} />
        <SidebarLink title="Add New Tree" icon="cart" route="/addTree" onClick={this.hideSidebar} />
      </div>
    );
  }
}

export default SidebarContent;
