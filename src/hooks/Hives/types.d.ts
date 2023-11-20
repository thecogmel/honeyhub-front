interface Hive {
  id: number;
  name: string;
  comments: string;
  status: string;
  queen_status: string;
  q_total?: number;
  q_cf?: number;
  q_ca?: number;
  q_cv?: number;
  created: string;
  modified: string;
}

type HiveFormValues = Omit<Hive, 'id' | 'createdAt' | 'updatedAt'>;

interface HiveChanges {
  modified: string;
  registered_by: string;
  changed_fields: Array<keyof Hive>;
}
