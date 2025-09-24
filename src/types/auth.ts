export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileType: 'student' | 'garage' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileType: 'student' | 'garage';
}