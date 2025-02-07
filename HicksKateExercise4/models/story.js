const { DateTime } = require("luxon");
const { v4 : uuidv4 } = require('uuid');
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
    },
    {
        id: '3',
        title: 'Learning NBAD',
        content: 'I did lots of cool stuff with this assignment, I was scared when postman was mentioned but it was not actually that bad. Hopefully applying these concepts to my project later this semester is not too difficult. Backend javascript has been a lot more fun than front end javascript so far.',
        author: 'Kate',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.find = () => stories;

exports.findById = (id) => stories.find( story => story.id === id);

exports.save = (story) => {
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = (id, newStory) => {
    let story = stories.find( story => story.id === id);
    if (story) {
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
    }
    
}

exports.deleteById = (id) => {
    let index = stories.findIndex(story => story.id ===id);
    if(index !== -1) {
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
}