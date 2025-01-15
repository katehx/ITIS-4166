const albums = [
    {
        id: 2125,
        title: 'Use Your Illusion',
        artist: "Guns N' Roses"
    },

    {
        id: 1678,
        title: 'A Night at the Opera',
        artist: 'Queen'
    },

    {
        id: 2975,
        title: '1999',
        artist: 'Prince'
    },

    {
        id: 3257,
        title: 'Space Oddity',
        artist: 'DavidBowie'
    }

];

//return an album that matches the id
function findById(id) {
    return albums.find(album => album.id === id);
}

//To do: implement save(album)


//To do: implement findByArtist(artist)



//To do: implement updateById(id, album)


//To do: implement removeById(id)


//To do: uncomment the following testing code when you are ready to test your functions

// save({ id: 1458, title: "G N' R Lies", artist: "Guns N' Roses" });
// save({ id: 3590, title: "School's Out", artist: 'Alice Cooper' });
// save({ id: 1257, title: 'Transformer', artist: 'Lou Reed' });
// console.log(albums);
// console.log(findByArtist("Guns N' Roses"));
// console.log(updateById(4000, {}));
// console.log(updateById(3257, {
//     id: 3257,
//     title: 'Space Oddity',
//     artist: 'David Bowie'
// }));
// console.log(albums);
// console.log(removeById(4000));
// console.log(removeById(1678));
// console.log(albums);