import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getRecipesBySearchQueryAsync } from '../../../core/api/recipeCards.api';
import { useAppDispatch } from '../../../core/hooks/useAppDispatch';
import { useAppSelector } from '../../../core/hooks/useAppSelector';
import { useDebounce } from '../../../core/hooks/useDebounce';
import { useInput } from '../../../core/hooks/useInput';
import { IRecipeCard } from '../../../models/recipes/recipeCard.model';
import { clearSearch, searchUpdate } from '../../../store/search/search.slice';
import { Search } from '../../../ui/Search/Search';
import { SearchItems } from './SearchItems';

interface IProps {
   className?: string
}

export const SearchComponent: React.FC<IProps> = ({className}) => {
   const {value, onChange, clear} = useInput('');
   const debounced = useDebounce(value);
   const [searchRecipes, setSearchRecipes] = useState<IRecipeCard[]>();
   const [showSearchResult, setShowSearchResult] = useState(true);
   const search = useAppSelector(x => x.search.searchValue);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   
   useEffect(() => {
      if (debounced && debounced.length >= 3) {
         getRecipesSearchData();
      } else {
         cleateRecipesSearchResults();
      }
   }, [debounced])

   const handleClick = () => {
      clear();
      setSearchRecipes([])
   }

   function getRecipesSearchData() {
      getRecipesBySearchQueryAsync(debounced)
            .then((response) => {
               if (response.success) {
                  setSearchRecipes(response.data!);
               }
            })
   }

   function cleateRecipesSearchResults() {
      setSearchRecipes([])
         if (debounced.length == 0) {
            setTimeout(() => {
               dispatch(clearSearch())
               setShowSearchResult(true)
            }, 200)
         }
   }

   return (
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         width: 'auto',
         position: 'relative',
      }}
      className={className}
      >
         <Search 
            onChange={onChange} 
            value={value} 
            onClick={() => {
               dispatch(searchUpdate(value))
               setShowSearchResult(false)
               navigate('/');
            }}
         />
         <SearchItems 
            recipes={searchRecipes} 
            onClick={handleClick}
            shouldShow={showSearchResult}
         />
      </div>
   )
}