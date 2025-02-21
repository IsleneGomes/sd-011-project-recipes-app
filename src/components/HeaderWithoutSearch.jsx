import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';

export default class HeaderWithoutSearch extends Component {
  render() {
    const { title } = this.props;
    return (
      <div>
        <Link to="/perfil" className="profilePicture">
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profileIcon" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
      </div>
    );
  }
}

HeaderWithoutSearch.propTypes = {
  title: PropTypes.string.isRequired,
};
