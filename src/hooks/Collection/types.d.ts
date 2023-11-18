interface Collection {
  id: number;
  quantity: number;
  hive: number;
  registered_by_info: RegisteredByInfo;
  created: string;
  modified: string;
}

interface RegisteredByInfo {
  id: number;
  email: string;
  username: string;
  name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  role: string;
}

interface CollectionFormValues {
  quantity: number;
  hive: number;
}
