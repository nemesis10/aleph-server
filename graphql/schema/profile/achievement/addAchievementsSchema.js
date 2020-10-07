module.exports = `
        type Mutation {
            addAchievements(userInput: [AchievementInputData]): [Achievement!]!
        }

        input AchievementInputData {
            userId: String!,
            icon: String!,
            description: String!,
            year: String!,
            link: String,
        }
`;