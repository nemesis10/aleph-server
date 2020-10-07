module.exports = `
        type Mutation {
            deleteProfile(userInput: deleteProfileInputData): Profile!
        }

        input deleteProfileInputData {
            userId: String!,
            type: String!,
            objectId: [String]
        }
`;