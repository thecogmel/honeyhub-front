interface Hive {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

type HiveFormValues = Omit<Hive, 'id' | 'createdAt' | 'updatedAt'>;
