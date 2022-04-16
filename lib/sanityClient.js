import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: "5lvgveha",
  dataset: "production",
  apiVersion: "v1",
  token:
    "sktSQU5UAbUaCwJVHNS19u4HkATcbgqiH7izh2qAEDO9ZTGHOMGFKd4yaQRaaIrzXkJlKjt6y11IfMFAJWRD03OoeyaYqvpBM1EFquBBMbTUBTYwbeDt3JOV5eVCfWcm9yLQ1XIGUUx0JnmHqg7b55qCQNSDattEEXjQWAtPiuJ89E0eVZFe",
  useCdn: false,
});
