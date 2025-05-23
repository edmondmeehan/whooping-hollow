
// Common types for admin services

// External Links
export interface ExternalServiceLink {
  id?: string;
  name: string;
  url: string;
  description: string; // Making description required to match the DB schema
  property?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExternalServiceLinkInput {
  name: string;
  url: string;
  description: string; // Making description required to match the DB schema
  property?: string;
}

// Home Systems
export interface HomeSystem {
  id?: string;
  system: string;
  access?: string;
  notes?: string;
  property?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HomeSystemInput {
  system: string;
  access?: string;
  notes?: string;
  property?: string;
}

// House Services
export interface HouseService {
  id?: string;
  service: string;
  company: string;
  status: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  website?: string;
  property?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HouseServiceInput {
  service: string;
  company: string;
  status: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  website?: string;
  property?: string;
}

export interface HouseServiceCategory {
  id?: string;
  name: string;
  created_at?: string;
}
