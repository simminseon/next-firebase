// import styled from '@emotion/styled';
// import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
// import Button from '../../button/Button';
// import { formatHelper } from '@/utils/helpers';

// type FileValue = File | string;
// type FileErrorType = 'size' | 'extension';

// export interface IInputFileProps {
//   value?: FileValue;
//   maxSize?: number;
//   acceptExtention?: string;
//   readonly?: boolean;
//   onChange?: (file?: File) => void;
//   onError?: (errorType: FileErrorType) => void;
// }

// const FileNameWrapper = styled.div`
//   margin-left: 10px;

//   .file {
//     &-name {
//       display: flex;
//       align-items: center;

//       button {
//         display: flex;
//         width: 30px;
//         height: 30px;
//         justify-content: center;
//         align-items: center;
//       }
//     }
//   }
// `;

// export const InputFile = forwardRef<HTMLLabelElement, IInputFileProps>(
//   (
//     {
//       value = '',
//       maxSize = 10,
//       acceptExtention = '*',
//       readonly = false,
//       onChange,
//       onError,
//     },
//     ref
//   ) => {
//     const linkRef = useRef<HTMLAnchorElement>(null);
//     const inputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//       if (value instanceof File) {
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(value);
//         fileReader.addEventListener('load', function () {
//           if (linkRef.current) {
//             linkRef.current.href = this.result as string;
//           }
//         });
//       } else {
//         if (linkRef.current) {
//           linkRef.current.href = value;
//         }
//       }
//     }, [value]);

//     const fileName = useMemo(() => {
//       return value instanceof File ? value.name : formatHelper.fileName(value);
//     }, [value]);

//     const findErrorType = useCallback(
//       (file: File): FileErrorType | null => {
//         if (file.size > 1024 * 1024 * maxSize) {
//           return 'size';
//         }

//         if (acceptExtention) {
//           const extension = file.name.split('.').pop();
//           if (
//             !extension ||
//             !acceptExtention.split(',').includes(`.${extension.toLowerCase()}`)
//           ) {
//             return 'extension';
//           }
//         }

//         return null;
//       },
//       [acceptExtention, maxSize]
//     );

//     const remove = () => {
//       if (inputRef.current) {
//         inputRef.current.value = '';
//       }
//       onChange?.();
//     };

//     if (readonly) {
//       return value ? (
//         <a ref={linkRef} target="_blank" rel="noreferrer" download={fileName}>
//           {fileName}
//         </a>
//       ) : null;
//     } else {
//       return (
//         <>
//           <div className="d-flex align-items-center">
//             <Button size="sm" disabled={readonly}>
//               파일선택
//             </Button>
//             <input
//               ref={inputRef}
//               type="file"
//               accept={acceptExtention}
//               onChange={({ target }) => {
//                 const file = (
//                   (target as HTMLInputElement).files as FileList
//                 )[0];
//                 const errorType = file ? findErrorType(file) : null;

//                 if (errorType) {
//                   onError?.(errorType);
//                 } else {
//                   onChange?.(file);
//                 }
//               }}
//               className="d-none"
//             />

//             <FileNameWrapper>
//               {value ? (
//                 <div className="file-name">
//                   <a
//                     ref={linkRef}
//                     target="_blank"
//                     rel="noreferrer"
//                     download={fileName}
//                   >
//                     {fileName}
//                   </a>
//                   <button type="button" onClick={remove}>
//                     삭제
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-gray-600">{'선택된 파일 없음'}</div>
//               )}
//             </FileNameWrapper>
//           </div>
//         </>
//       );
//     }
//   }
// );

// InputFile.displayName = 'InputFile';
