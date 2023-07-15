import { IResponse } from './response.type';

interface IBusinessmanStatus {
  b_no: string;
  b_stt: string; // 계속사업자/휴업자/폐업자
  tax_type: string; // 국세청에 등록되지 않은 사업자등록번호입니다
}
interface IBusinessmanStatusResponse {
  data: IBusinessmanStatus[];
}

export type TBusinessmanStatusResponse = IResponse<IBusinessmanStatusResponse>;
