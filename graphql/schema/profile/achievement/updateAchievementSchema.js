module.exports = `
        type Mutation {
            updateAchievement(userInput: updateAchievementInputData): Achievement
        }

        input updateAchievementInputData {
            objectId: String!,
            icon: String,
            description: String,
            year: String,
            link: String,
        }
`;