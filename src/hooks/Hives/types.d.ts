interface Hive {
  id: string;
  name: string;
  description: string;
  status: string;
  responsible?: UserInfo;
  createdAt: string;
  updatedAt: string;
}

type HiveFormValues = Omit<Hive, 'id' | 'createdAt' | 'updatedAt'>;
