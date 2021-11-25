export interface ClientType {
  _id: string;
  company_name: string;
}
export interface ContractType<G = string> {
  _id: string;
  client_id: G;
  contract_end_date: string;
  contract_sign_date: string;
  payment_status: string;
}
