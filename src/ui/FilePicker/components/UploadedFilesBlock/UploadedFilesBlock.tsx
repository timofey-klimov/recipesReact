import React from 'react';
import { FileContent } from 'use-file-picker';
import { AiFillFileText} from 'react-icons/ai';
import { FaTrash} from 'react-icons/fa';
import './UploadedFilesBlock.scss';

interface IProps {
   filesContent: FileContent[];
   deleteFile: () => void;
}

export const UploadedFilesBlock: React.FC<IProps> = ({filesContent, deleteFile}) => {

   return (
      <>
         {filesContent.map(file => {
         let name = file.name;
         
         if (name.length > 16) {
            name = name.slice(0, 14) + '..';
         }
         return (
         <div className='file_uploaded' key={file.name}>
            <div>
               <AiFillFileText color='#FF4E14'/>
               <span>{name}</span>
            </div>
            <FaTrash color='#FF4E14' onClick={deleteFile} style={{
               cursor: 'pointer'
            }}/>
         </div>) })}
      </>
   )
}