import { CategoryDto } from '../../user/dto/user.dto';

export const categoriesConstant: CategoryDto[] = [
  {
    name: 'Other',
    icon: {
      background: '#ffffff',
      iconType: 'wallet-outline',
    },
    id: '63e3ca87631b20b10e81bcab',
    isBase: true,
  },
  {
    name: 'Food',
    icon: {
      background: '#e6b846',
      iconType: 'restaurant-outline',
    },
    id: '63e4b0803c4efc19a1c985a4',
  },
  {
    name: 'Household',
    icon: {
      background: '#0cbfdb',
      iconType: 'home-outline',
    },
    id: '63e4b0f73c4efc19a1c985a5',
  },
  {
    name: 'Transport',
    icon: {
      background: '#5b66e5',
      iconType: 'car-sport-outline',
    },
    id: '63e4b1153c4efc19a1c985a7',
  },
  {
    name: 'Healthcare',
    icon: {
      background: '#76d04c',
      iconType: 'fitness-outline',
    },
    id: '63e4b1c53c4efc19a1c985a9',
  },
];
