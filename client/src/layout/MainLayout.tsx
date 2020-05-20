import React from 'react';
import { Container, Image, List, Menu, Segment, Grid } from 'semantic-ui-react';
import WalletLogo from 'assets/images/wallet-logo.svg';

type Props = {
  children: any;
};

const MainLayout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <Grid textAlign="center" style={{ height: '5rem' }} verticalAlign="middle" padded>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header>
              <Image size="mini" src={WalletLogo} style={{ marginRight: '1.5em' }} />
              trackportfol.io
            </Menu.Item>
            <Menu.Item as="a" href="/">
              Home
            </Menu.Item>
          </Container>
        </Menu>
      </Grid>
      <Container>{props.children}</Container>
      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '1em 0em' }}>
        <Container textAlign="center">
          <Image centered size="mini" src={WalletLogo} />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="https://lynchy.atlassian.net/wiki/spaces/PT/overview">
              Confluence
            </List.Item>
            <List.Item as="a" href="https://lynchy.atlassian.net/browse/PT">
              JIRA
            </List.Item>
            <List.Item as="a" href="https://lynchy.atlassian.net/servicedesk">
              Support
            </List.Item>
            <List.Item as="a" href="https://lynchy.statuspage.io/">
              Status
            </List.Item>
          </List>
        </Container>
      </Segment>
    </React.Fragment>
  );
};

export default MainLayout;
