module.exports = `
        type Mutation {
            addCreationBucket(userInput: [CreationBucketInputData]): [CreationBucket!]!
        }

        type CreationBucket {
            _id: ID!,
            userId: String!,
            creationName: String!,
            type: String!,
            linkToPdfPhoto: String!,
            description: String!
        }

        input CreationBucketInputData {
            userId: String!,
            creationName: String!,
            type: String!,
            linkToPdfPhoto: String!,
            description: String!
        }
`;