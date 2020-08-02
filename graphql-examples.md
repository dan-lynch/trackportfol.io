## Here is some examples of using GraphQL queries and mutations:

```
mutation validateUser {
  validateUser(input: {token: "secret token", uid: "a1b2c3"}) {
    userValidated {
      success
      new
      token
    }
  }
}
```

```
query currentUser {
  currentUser {
    createdAt
    userId
    displayName
    email
    emailVerified
    phoneNumber
    prefersDarkTheme
    lastLoginAt
  }
  allHoldings {
    nodes {
      id
      userId
      instrumentByInstrumentId {
        code
        description
        lastUpdated
        latestPrice
      }
      amount
      createdAt
    }
  }
}
```

```
mutation updateUsername {
  updateDisplayName(input: {newDisplayName: "tester11"}) {
    clientMutationId
    updatedDisplayName {
      success
      updatedDisplayName
    }
  }
}
```

```
mutation updateUserEmail {
  updateUserEmail(input: {newEmail: "tester11@trackportfol.io"}) {
    updatedUserEmail {
      success
      updatedEmail
    }
  }
}
```

```
mutation updateTheme {
  updateTheme(input: {userDarkTheme: true}) {
    updatedTheme {
      success
    }
  }
}
```

```
mutation createHolding {
  createHolding(input: {holding: {userId: "a1b2c3", instrumentId: 342, amount: "10"}}) {
    holding {
      id
    }
  }
}
```

```
query MFAInstrument {
  instrumentById(id: 6710) {
    latestPrice
    code
    description
    id
  }
}
```

```
subscription currentUserSub {
  currentUser {
    createdAt
    userId
    displayName
    email
    emailVerified
    phoneNumber
    prefersDarkTheme
    lastLoginAt
  }
}
```

```
query allInstruments {
  allInstruments {
    nodes {
      id
      name
      code
      description
      latestPrice
    }
    totalCount
  }
}
```


```
query allHoldings {
  allHoldings {
    nodes {
      id
      userId
      instrumentByInstrumentId {
        code
        description
        lastUpdated
        latestPrice
      }
      amount
      createdAt
    }
  }
}
```

```
mutation updateHolding {
  updateHoldingById(input: {holdingPatch: {amount: "20"}, id: 4}) {
    holding {
      amount
      id
    }
  }
}
```

```
mutation deleteHolding {
  deleteHoldingById(input: {id: 3}) {
    deletedHoldingId
  }
}
```