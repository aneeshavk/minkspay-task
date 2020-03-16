export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job: string;
  name: string;
}

export interface ListData<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}
