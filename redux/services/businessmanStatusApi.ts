import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TBusinessmanStatusResponse } from '@/types/businessNumber.type';

interface BusinessData {
  tax_type: string;
  b_no: number;
  b_stt: string;
}

interface BusinessmanStatusResponse {
  data: {
    status_code: string;
    match_cnt: number;
    request_cnt: number;
    data: BusinessData[];
  };
}

const serviceKey = process.env.NEXT_PUBLIC_SERVICEKEY;

export const businessmanStatusApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.odcloud.kr/api' }),
  endpoints: (builder) => ({
    getBusinessmanStatus: builder.mutation<
      TBusinessmanStatusResponse,
      string[]
    >({
      query: (businessNumber) => ({
        url: `/nts-businessman/v1/status?serviceKey=${serviceKey}`,
        method: 'POST',
        body: {
          b_no: businessNumber,
        },
      }),
    }),
  }),
});

export const { useGetBusinessmanStatusMutation } = businessmanStatusApi;
