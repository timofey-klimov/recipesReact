import React, { createRef, useEffect, useRef } from 'react';
import { IRecipeCard } from '../../../../models/recipes/recipeCard.model';
import  RecipeCard  from '../RecipeCard/RecipeCard';
import './RecipeCardList.scss';

interface IProps {
   cards?: IRecipeCard[],
   onClick:(id: number) => void,
   onIntersect: () => void,
   onLastPage: () => boolean
}

export const RecipeCardList: React.FC<IProps> = ({cards, onClick, onIntersect, onLastPage}) => {
   const lastItem = createRef<HTMLDivElement>();
   const observerLoader = useRef<IntersectionObserver>();

   const interSectHandler = (entries:IntersectionObserverEntry[]) => {
      if (entries?.[0]?.isIntersecting) {
         onIntersect();
      }
   }

   useEffect(() => {
      if (onLastPage()) {
         if (observerLoader.current) {
            observerLoader.current.disconnect();
            return;
         }
      }

      if (observerLoader.current) {
         observerLoader.current.disconnect();
      }
      observerLoader.current = new IntersectionObserver(interSectHandler);
      if (lastItem.current) {
         observerLoader.current.observe(lastItem.current);
      }
   }, [lastItem])
   return (
      <>
      <div className='recipe__cards'>
         {cards?.map((recipe,index) => {
            if (index + 1 === cards.length) {
               return <RecipeCard 
                        id={recipe.id!} 
                        title={recipe.title}
                        imageSource={recipe.imageSource}
                        key={recipe.id} 
                        onClick={onClick}
                        ref={lastItem}/>
            }
            return <RecipeCard 
                     id={recipe.id!} 
                     title={recipe.title}
                     imageSource={recipe.imageSource}
                     key={recipe.id} 
                     onClick={onClick}/>
         })}
      </div>
      </>
   )
}