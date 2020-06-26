## Here is some examples of using GraphQL queries and mutations:

```mutation registerUser {
  registerUser(input: {username: "example", email: "example@gmail.com", password: "123456"}) {
    user {
      id
      username
    }
  }
}
```

```query authenticate {
  authenticate(email: "example@gmail.com", password: "123456")
}
```

```query currentUser {
  currentUser {
    createdAt
    id
    lastActivity
    username
    darkTheme
    holdingsByUserId {
      nodes {
        amount
        instrumentByInstrumentId {
          code
          description
          lastUpdated
          latestPrice
          id
        }
      }
    }
  }
}
```

```query getUserEmail {
  getUserEmail {
    email
  }
}
```

```mutation updateUserEmail {
  updateUserEmail(input: {newEmail: "demo@gmail.com"}) {
    updatedUserEmail {
      success
      updatedEmail
    }
  }
}
```

```mutation updateUsername {
  updateUsername(input: {newUsername: "demo"}) {
    clientMutationId
    updatedUsername {
      success
      updatedUsername
    }
  }
}
```

```mutation updateUserPassword {
  updateUserPassword(input: {oldPassword: "123456", newPassword: "654321"}) {
    updatedUserPassword {
      success
    }
  }
}
```

```mutation updateTheme {
  updateTheme(input: {userDarkTheme: true}) {
    updatedTheme {
      success
    }
  }
}
```

```mutation createHolding {
  createHolding(input: {holding: {userId: 1, instrumentId: 222, amount: "10"}}) {
    userByUserId {
      id
      lastActivity
      holdingsByUserId {
        nodes {
          instrumentId
          amount
          instrumentByInstrumentId {
            code
            description
          }
        }
      }
    }
  }
}
```

```query allUsers {
  allUsers {
    nodes {
      createdAt
      darkTheme
      lastActivity
      username
      id
      holdingsByUserId {
        nodes {
          amount
          createdAt
          instrumentByInstrumentId {
            code
            description
          }
        }
      }
    }
  }
}
```

```query allHoldings {
  allHoldings {
    nodes {
      instrumentByInstrumentId {
        holdingsByInstrumentId {
          nodes {
            instrumentId
            instrumentByInstrumentId {
              code
            }
          }
        }
      }
    }
  }
}
```

```query MFAPrice {
  instrumentById(id: 6710) {
    latestPrice
    code
    description
    id
  }
}
```

```query PricingQueue {
  pricingQueueById(id: 1) {
    id
    instrumentCode
    instrumentId
  }
}
```