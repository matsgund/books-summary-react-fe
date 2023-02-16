import SanityClient from '@sanity/client';

interface SanityClientConfig {
  projectId: string;
  dataset: string;
  useCdn?: boolean;
  apiVersion?: string;
}

const clientConfig: SanityClientConfig = {
  projectId: 'ynzjouhk',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-02-01',
};

const client = new SanityClient(clientConfig);

export default client;
