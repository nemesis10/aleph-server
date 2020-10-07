module.exports = `
        type Mutation {
            updateCreationBucket(userInput: updateCreationBucketInputData): CreationBucket!
        }

        input updateCreationBucketInputData {
            objectId: String!,
            creationName: String,
            type: String,
            linkToPdfPhoto: String,
            description: String
        }
`;