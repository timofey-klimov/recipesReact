import React from 'react';
import { apiUrl } from '../../../../core/api/apiSettings';
import { ICookingStage } from '../../../../models/recipes/cookingStage.model';
import './index.scss';

interface IProps {
   stages: ICookingStage[] | null
}

export const CookingStagesDetails: React.FC<IProps> = ({stages}) => {
   return (
      <div className='cookingStage_info'>
         <div className='cookingStage_header'>
            <img src='/cookingStageIcon.png'/>
            <p>Шаги приготовления</p>
         </div>
         {
            stages?.map((stage, index) => {
               return (
                  <div key={index} className='cookingStage_content'>
                     <div className='header'>
                        <p>Шаг {index + 1}</p>
                     </div>
                     {
                        stage.imageSource &&
                        <div style={{
                           display: 'flex',
                           justifyContent: 'center'
                        }}>
                           <div className='img_container'> 
                              <img src={`${apiUrl}${stage?.imageSource}`}/>
                           </div>
                        </div>
                     }
                     <p>{stage.description}</p>
                  </div>
               )
            })
         }
      </div>
   )
}