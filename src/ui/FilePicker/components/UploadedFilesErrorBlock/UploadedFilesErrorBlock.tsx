import React from 'react';
import { FileError, ImageDims } from 'use-file-picker';
import './UploadedFilesErrorBlock.scss';
import { VscError } from 'react-icons/vsc';

interface IProps {
   errors: FileError[],
   imgDims?: ImageDims
}

export const UploadedFilesErrorBlock: React.FC<IProps> = ({errors, imgDims}) => {

   return (
      <>
         {errors.map((error, index) =>
            {
               if (error.fileSizeToolarge) {
                  return <div className='file_error' key={index}>
                  <VscError color='#FF4E14'/>
                  <span>Файл слишком большой!</span>
               </div>
               } else if (error.imageWidthTooSmall || error.imageHeightTooSmall) {
                  return <div className='file_error' key={index}>
                     <VscError color='#FF4E14'/>
                     <span>{`Размеры файлы должны быть больше ${imgDims?.minWidth}X${imgDims?.minHeight}`}</span>
                  </div>
               } else if (error.imageWidthTooBig || error.imageWidthTooBig) {
                  return <div className='file_error' key={index}>
                     <VscError color='#FF4E14'/>
                     <span>{`Размеры должны быть меньше ${imgDims?.maxWidth}X${imgDims?.maxHeight}`}</span>
                  </div>
               } else if (error.imageNotLoaded) {
                  return <div className='file_error' key={index}>
                     <VscError color='#FF4E14'/>
                     <span>Неверный формат файла</span>
                  </div>
               }
            })}
      </>
   )
}