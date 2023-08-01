import SanityClient from '@sanity/client';

const SanityProjectID = import.meta.env.VITE_SANITY_PROJECT_ID;

interface SanityClientConfig {
  projectId: string;
  dataset: string;
  useCdn?: boolean;
  apiVersion?: string;
}

const clientConfig: SanityClientConfig = {
  projectId: SanityProjectID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-02-01',
};

const client = new SanityClient(clientConfig);

export default client;
