import React from 'react';
import Layout from 'components/Layout'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { initApolloClient } from 'services/apolloService'
import { withApollo } from 'components/withApollo'
import { apiService } from 'services/apiService';

function Home() {
  return (
  <Layout title="Home | trackportfol.io">
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home page...
        </Typography>
      </Box>
    </Container>
  </Layout>
  );
}

export async function getStaticProps() {
  const client = await initApolloClient({})
  const { data } = await client.query({ query: apiService.currentUser })
  return {
    unstable_revalidate: 300,
    props: {
      data,
      apolloStaticCache: client.cache.extract(),
    },
  }
}

export default withApollo(Home)