module.exports = `
        type Mutation {
            addGoodAt(userInput: [GoodAtInputData]): [GoodAt!]!
        }

        input GoodAtInputData {
            userId: String!,
            activity: String!,
            category: String!
        }
`;