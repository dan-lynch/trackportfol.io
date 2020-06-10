import { gql } from '@apollo/client'

export const CREATE_HOLDING = gql`
    mutation createHolding($userId: Int!, $instrumentId: Int!, $amount: BigFloat!) {
    createHolding(input: {holding: {userId: $userId, instrumentId: $instrumentId, amount: $amount}}) {
        query {
        currentUser {
            holdingsByUserId {
            nodes {
                amount
                instrumentByInstrumentId {
                id
                code
                description
                }
                instrumentId
            }
            }
        }
        }
    }
    }
`;