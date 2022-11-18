import React, { useEffect, useState } from 'react';
import { getRecipesBySearchQueryAsync } from '../../../core/api/recipeCards.api';
import { useDebounce } from '../../../core/hooks/useDebounce';
import { useInput } from '../../../core/hooks/useInput';
import { IRecipeCard } from '../../../models/recipes/recipeCard.model';
import { Search } from '../../../ui/Search/Search';
import { SearchItems } from './SearchItems';

interface IProps {

}

export const SearchComponent: React.FC<IProps> = () => {
   const {value, onChange, clear} = useInput('');
   const debounced = useDebounce(value);
   const [recipes, setRecipes] = useState<IRecipeCard[]>();
   console.log(recipes);
   
   useEffect(() => {
      if (debounced && debounced.length >= 3) {
         console.log('get recipes');
         getRecipesBySearchQueryAsync(value)
            .then((response) => {
               if (response.success) {
                  setRecipes(response.data!);
               }
            })
      } else {
         setRecipes([])
      }
   }, [debounced])

   const handleClick = () => {
      clear();
      setRecipes([])
   }

   console.log(value);
   return (
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         width: 560,
         position: 'relative',
      }}>
         <Search onChange={onChange} value={value}/>
         <SearchItems recipes={recipes} onClick={handleClick}/>
      </div>
   )
}