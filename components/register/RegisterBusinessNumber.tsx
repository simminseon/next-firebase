// 'use client';
// import { useState, useRef, useEffect, ChangeEvent } from 'react';
// import { Controller, useForm, FormProvider } from 'react-hook-form';
// import { PatternFormat, NumericFormat } from 'react-number-format';
// import classNames from 'classnames';

// import InputField from '@/components/common/layout/inputField/InputField';
// import Input from '@/components/common/form/input/Input';
// import InputFile from '@/components/common/form/inputFile/InputFile';
// import Label from '@/components/common/form/label/Label';
// import Button from '@/components/common/button/Button';
// import ErrorMessage from '@/components/common/errorMessage/ErrorMessage';

// import { useGetBusinessmanStatusMutation } from '@/redux/services/businessmanStatusApi';

// function RegisterBusinessNumber() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     getValues,
//     watch,
//     formState: { errors },
//   } = useForm({ mode: 'onChange' });

//   const [visible, setVisible] = useState(false);
//   const [trigger] = useGetBusinessmanStatusMutation();

//   const [businessmanStatus, setBusinessmanStatus] = useState<string>();

//   const inpBusinessNumber = useRef<number>();
//   inpBusinessNumber.current = watch('businessNumber');
//   const businessNumber = inpBusinessNumber.current;

//   const onClickBusinessNumber = async () => {
//     if (businessNumber) {
//       const businessNumberToString = businessNumber.toString();
//       const b_no: string[] = [businessNumberToString];

//       try {
//         const data = await trigger(b_no);
//         console.log(data);
//         // console.log(data?.data[0].tax_type);
//         if (
//           data &&
//           data.data.data[0].tax_type ===
//             '국세청에 등록되지 않은 사업자등록번호입니다.'
//         ) {
//           // console.log(data?.data[0].tax_type);
//           setBusinessmanStatus('국세청에 등록되지 않은 사업자등록번호입니다.');
//         }
//       } catch (err) {
//         console.log(err.message);
//       }
//     }
//   };

//   return (
//     <>
//       <InputField>
//         <Label htmlFor="businessNumber">사업자등록번호</Label>
//         <InputField.Split>
//           <Controller
//             name="businessNumber"
//             control={control}
//             render={({ field: { ref, ...field } }) => {
//               return (
//                 <NumericFormat
//                   getInputRef={ref}
//                   id="businessNumber"
//                   className={classNames('input-comm', {
//                     error: errors.businessNumber,
//                   })}
//                   placeholder="사업자등록번호"
//                   {...field}
//                 />
//               );
//             }}
//           />

//           <InputField.SplitShrink>
//             <Button size="sm" onClick={onClickBusinessNumber}>
//               조회하기
//             </Button>
//           </InputField.SplitShrink>
//         </InputField.Split>
//       </InputField>
//       {businessmanStatus}
//     </>
//   );
// }

// export default RegisterBusinessNumber;
