import React, {useEffect, useRef, useState} from 'react';
import { FileError, ImageDims, useFilePicker } from 'use-file-picker';
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

   const validTypes = () => {
      return ['image/png', 'image/jpg', 'image/jpeg']
   }
   const [dragFile, setDragFile] = useState<File>();
   const [isDrag, setIsDrag] = useState<boolean>();
   const fileUploaderRef = useRef<HTMLDivElement>(null);
   const imageRef = useRef<HTMLImageElement>(null);
   const [openFileSelector, { filesContent, errors, clear, plainFiles }] = useFilePicker({
      readAs: 'DataURL',
      accept: 'image/*',
      limitFilesConfig: { max: 1 },
      maxFileSize: 10,
      imageSizeRestrictions: imgDims
   });

   useEffect(() => {
      if(!dragFile) return;
      if ((validTypes().includes(dragFile?.type))) {
         readFileAsync(dragFile)
            .then((content) => {
               imageRef!.current!.src = content;
               const width = imageRef.current?.naturalWidth;
               const height = imageRef.current?.naturalHeight;
               const imgError = checkImgDims(width!, height!);
               if (imgError) {
                  errors.push(imgError);
               } else {
                  filesContent.push({name: dragFile.name!, lastModified: dragFile.lastModified!, content})
                  plainFiles.push(dragFile);
               }
               setIsDrag(false);
            })
      } else {
         errors.push({imageNotLoaded: true})
         setIsDrag(false)
      }
   }, [dragFile])

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
   },[filesContent, errors, isDrag])

   const readFileAsync = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.onload = () => {
            resolve(fileReader.result as string)
         }
         fileReader.onerror = () => {
            reject('error')
         }
         fileReader.readAsDataURL(file);
      })
   }

   const checkImgDims = (width: number, height: number): FileError | undefined => {
      const errors = [];
         errors.push(
            { imageWidthTooSmall: (imgDims?.minWidth && width < imgDims.minWidth)} as FileError)

         errors.push(
            { imageHeightTooSmall: imgDims?.minHeight && height < imgDims.minHeight} as FileError)

         errors.push(
            { imageWidthTooBig: imgDims?.maxWidth && width > imgDims.maxWidth } as FileError)

         errors.push(
            { imageHeightTooBig: imgDims?.maxHeight && height > imgDims.maxHeight} as FileError
         )
      return errors?.[0];
   }

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

   const onDropHadler = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDrag(true);
      const file = e.dataTransfer.files[0];
      if (file) {
         setDragFile(file);
      }
   }

   const onDragOverHandler = (e: any) => {
      e.preventDefault();
   }

   return (
      <div>
         <div
            className='file_picker'
            onDragOver={onDragOverHandler}
            onDrop={onDropHadler}
         >
            <div 
               className='upload_button' 
               onClick={() => handleSelectFile()} 
               ref={fileUploaderRef}
            >
                  <AiOutlineCloudUpload color='white' height={20} width={20}/>
                  <span>Загрузить</span>
                  <input 
                     name={name} 
                     style={{
                        display: 'none'
                     }}
                     type='file'
                  />
                  <img ref={imageRef} style={{
                     display: 'none'
                  }}/>
               </div>
         </div>

         { errors.length > 0 
            ? <UploadedFilesErrorBlock errors={errors} imgDims={imgDims}/>
            : <UploadedFilesBlock filesContent={filesContent} deleteFile={deleteHandler}/> }
      </div>
   )
}

