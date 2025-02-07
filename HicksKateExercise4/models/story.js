const { DateTime } = require("luxon");

const stories = [
    {
        id: '1',
        title: 'A funny story',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie laoreet elit, eget dapibus lectus gravida sed. Curabitur accumsan odio ac vehicula ultricies. ',
        author: 'Kate',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'It is rainy',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie laoreet elit, eget dapibus lectus gravida sed. Curabitur accumsan odio ac vehicula ultricies. ',
        author: 'Braxton',
        createdAt: DateTime.local(2019, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    }
]