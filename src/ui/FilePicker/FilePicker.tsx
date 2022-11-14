import React, {useEffect, useRef, useState} from 'react';
import { FileContent, ImageDims, useFilePicker } from 'use-file-picker';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import './FilePicker.scss'
import { UploadedFilesErrorBlock } from './components/UploadedFilesErrorBlock/UploadedFilesErrorBlock';
import { UploadedFilesBlock } from './components/UploadedFilesBlock/UploadedFilesBlock';
import { useController } from 'react-hook-form';


interface IProps {
   imgDims?: ImageDims,
   name: string,
   validationOpts: {
      shouldValidate: boolean
   }
}

export const FilePicker: React.FC<IProps> = ({imgDims, name, validationOpts}) => {
   const {
      field: { onChange, onBlur},
    } = useController({
      name,
      rules: { required: validationOpts?.shouldValidate },
      defaultValue: null,
    });

   const fileUploaderRef = useRef<HTMLDivElement>(null);
   const [openFileSelector, { filesContent, errors, clear, plainFiles }] = useFilePicker({
      readAs: 'DataURL',
      accept: 'image/*',
      limitFilesConfig: { max: 1 },
      maxFileSize: 10,
      imageSizeRestrictions: imgDims
   });

   useEffect(() => {
      if (filesContent.length > 0 && errors.length == 0) {
         fileUploaderRef.current?.classList.add('disabled');
         if (onChange) {
            onChange(plainFiles[0])
            onBlur();
         }
      } else {
         fileUploaderRef.current?.classList.remove('disabled');
      }
   },[filesContent, errors])

   const handleSelectFile = () => {
      if (filesContent.length > 0 && errors.length == 0) {
         return;
      }
      openFileSelector();
   }

   const deleteHandler = () => {
      clear();
      if (onChange) {
         onChange(null);
         onBlur();
      }
   }

   return (
      <div>
         <div className='file_picker'>
            <div className='upload_button' onClick={() => handleSelectFile()} ref={fileUploaderRef}>
                  <AiOutlineCloudUpload color='white' height={20} width={20}/>
                  <span>Загрузить</span>
                  <input name={name} style={{
                     width: 0,
                     height: 0
                  }}/>
               </div>
         </div>

         { errors.length > 0 
            ? <UploadedFilesErrorBlock errors={errors} imgDims={imgDims}/>
            : <UploadedFilesBlock filesContent={filesContent} deleteFile={deleteHandler}/> }
      </div>
   )
}

