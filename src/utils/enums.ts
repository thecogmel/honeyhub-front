export enum EUserRole {
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  MEMBER = 'MEMBER',
}

export const EUserRoleMap = {
  [EUserRole.ADMIN]: 'Administrador',
  [EUserRole.SUPPORT]: 'Suporte',
  [EUserRole.MEMBER]: 'Membro',
};

export enum EHiveStatus {
  CAPTURE = 'CAPTURE',
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTIVE = 'PRODUCTIVE',
  EMPTY_BOX = 'EMPTY_BOX',
}

export const EHiveStatusMap = {
  [EHiveStatus.CAPTURE]: 'Captura',
  [EHiveStatus.DEVELOPMENT]: 'Desenvolvimento',
  [EHiveStatus.PRODUCTIVE]: 'Produtiva',
  [EHiveStatus.EMPTY_BOX]: 'Caixa vazia',
};

export enum EHiveGenericStatus {
  REGULAR = 'REGULAR',
  GOOD = 'GOOD',
  WEAK = 'WEAK',
}

export const EHiveGenericStatusMap = {
  [EHiveGenericStatus.REGULAR]: 'Regular',
  [EHiveGenericStatus.GOOD]: 'Bom',
  [EHiveGenericStatus.WEAK]: 'Fraco',
};
