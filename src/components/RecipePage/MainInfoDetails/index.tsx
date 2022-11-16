import React from "react";
import { apiUrl } from "../../../core/api/apiSettings";
import { IRecipeCard } from "../../../models/recipes/recipeCard.model";
import './index.scss';

interface IProps {
   recipe?: IRecipeCard,
   remark?: string | null
}

export const MainInfoDetails: React.FC<IProps> = ({recipe, remark}) => {
   return (
      <div className="main_info">
         <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
         }}>
            <div className="main_header">
               <img src='/recipeicon.png' className='recipe_logo'/>
               <p>{recipe?.title}</p>
            </div>
            <p style={{
               fontWeight: 'bold',
               fontSize: '1.1rem'
            }}>
               {recipe?.mealType}
            </p>
         </div>
         <div style={{
            display: 'flex',
            justifyContent: 'center'
         }}>
            <div className="img_container">
               <img src={`${apiUrl}${recipe?.imageSource}`}/>   
            </div>
         </div>
         { remark &&
            <div className="remark_info">
               <div className="remark_header">
                  <img src="/remarkIcon.png" className="recipe_logo"/>
                  <p>Примечания</p>
               </div>
               <div style={{
                  padding: '0 5px',
                  marginTop: '10px'
               }}>
                  <p>{remark}</p>   
               </div>
            </div>
         }
      </div>
   )
}