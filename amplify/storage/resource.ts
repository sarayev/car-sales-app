import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'carSalesStorage',
  access: (allow) => ({
    'car-images/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
      allow.guest.to(['read'])
    ],
  })
});
