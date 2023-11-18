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

export enum EHiveGenericStatus {
  REGULAR = 'REGULAR',
  GOOD = 'GOOD',
  WEAK = 'WEAK',
}
