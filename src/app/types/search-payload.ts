import { SearchFilters } from './search-filters';

export interface SearchPayload {
  userEmail: string;
  fromDate: Date | string;
  filters: SearchFilters;
}
