import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { FooterBar, transparentButton } from '../styles';

export default function Footer({ drink }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const removeFilter = () => {
    dispatch({ type: 'SET_SEARCH', search: { type: 'searchName', key: '' } });
  };
  return (
    <FooterBar
      data-testid="footer"
      drink={ drink }
    >
      <transparentButton onClick={ () => { removeFilter(); history.push('/bebidas'); } }>
        <img
          src={ drinkIcon }
          alt="Redireciona para tela de bebidas"
          data-testid="drinks-bottom-btn"
        />
      </transparentButton>
      <transparentButton onClick={ () => { removeFilter(); history.push('/explorar'); } }>
        <img
          src={ exploreIcon }
          alt="Redireciona para tela de explorar"
          data-testid="explore-bottom-btn"
        />
      </transparentButton>
      <transparentButton onClick={ () => { removeFilter(); history.push('/comidas'); } }>
        <img
          src={ mealIcon }
          alt="Redireciona para tela de comidas"
          data-testid="food-bottom-btn"
        />
      </transparentButton>
    </FooterBar>
  );
}

Footer.propTypes = {
  drink: PropTypes.bool,
};

Footer.defaultProps = {
  drink: false,
};
