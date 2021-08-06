import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { fetchFood } from '../services/FoodAPI';
import CardsDrinks from './CardsDrinks';
import CardsFood from './CardsFood';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import '../styles/FoodDetails.scss';
import { isRecipeDone } from '../services/RecipesLocalStorage';

export default function FoodInProgress({ type }) {
  const recipes = useSelector((state) => state.recipes);
  const food = recipes.cards;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchFood({ id, type }));
  }, [id, type, dispatch]);

  function listIngredients(item) {
    const ingredient = Object.entries(item).filter(([key,
      value]) => key.includes('Ingredient') && value);

    return ingredient.map((el, i) => {
      const msr = item[`strMeasure${el[0].replace(/\D/g, '')}`];
      const innerText = msr ? `${el[1]} - ${msr || ''}` : `${el[1]}`;
      return (
        <div key={ el } data-testid={ `${i}-ingredient-step` }>
          <Form.Check
            type="checkbox"
            id={ `default-${type}` }
            label={ innerText }
          />
        </div>

      );
    });
  }

  const { strMealThumb, strDrinkThumb,
    strDrink, strMeal, strInstructions, strCategory, strAlcoholic } = food;
  return (
    <main className="food-details">
      <div>

        <img
          className="imgreceita"
          data-testid="recipe-photo"
          src={ strMealThumb || strDrinkThumb }
          alt="img"
        />
        <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
        <ShareBtn />
        <FavoriteBtn />
        <p>{strAlcoholic}</p>
        <p data-testid="instructions">{strInstructions}</p>
        <p data-testid="recipe-category">
          Categoria:
          {strCategory}
        </p>
        <form>{listIngredients(food)}</form>
        <h2>Recommended Cards</h2>

      </div>
      <div>
        { type === 'drinks' && (<CardsFood />)}
        {type === 'meals' && (<CardsDrinks />)}
      </div>

      <Button
        disabled={ isRecipeDone(id) }
        className="btnstart"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar receita
      </Button>

    </main>
  );
}

FoodInProgress.propTypes = {
  type: propTypes.string.isRequired,
};
