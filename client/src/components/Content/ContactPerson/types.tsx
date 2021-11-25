export interface BranchType {
  _id: string;
  address: string;
  client_id?: string;
}

export interface ClientType {
  _id: string;
  company_name: string;
}

export interface ContactPersonType<C = string, B = string> {
  client_id: C;
  branch_id?: B;
  name: string;
  email: string;
  phone: string;
  address: string;
}
