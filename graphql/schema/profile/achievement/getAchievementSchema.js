module.exports = `

        type Query {
            getAchievement(userInput: getAchievementInputData): Achievement!
        }

        input getAchievementInputData {
            objectId: String!
        }

`;