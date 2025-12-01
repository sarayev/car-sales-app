import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  CarAd: a
    .model({
      title: a.string().required(),
      description: a.string(),
      price: a.float().required(),
      year: a.integer().required(),
      make: a.string().required(),
      model: a.string().required(),
      mileage: a.integer(),
      fuelType: a.string(),
      transmission: a.string(),
      color: a.string(),
      images: a.string().array(),
      contactEmail: a.email(),
      contactPhone: a.string(),
      isActive: a.boolean().default(true),
    })
    .authorization(allow => [
      allow.group('admins'),
      allow.publicApiKey().to(['read'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
