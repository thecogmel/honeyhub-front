import { EUserRole } from 'utils/enums';

declare global {
  interface Paginated<T> {
    count: number;
    previous: string | null;
    next: string | null;
    results: Array<T>;
  }

  type ModifyType<T, R> = Omit<T, keyof R> & R;

  interface UserInfo {
    id: number;
    email: string;
    username: string;
    name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    role: EUserRole;
  }

  interface UserFormValues {
    name: string;
    username: string;
    password: string;
    email: string;
    role: EUserRole;
  }
}

export {};
