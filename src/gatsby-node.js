const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                react: path.join(process.cwd(), 'node_modules/react'),
            },
        },
    })
}
