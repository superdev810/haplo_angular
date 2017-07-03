
const request = require('supertest'),
    express = require('express'),
    rewire = require('rewire'),
    index = require('../routes/index.js'),
    nock = require('nock'),
    path = require('path');

describe('The feed route', () => {
    let app,
    mockResponse = {
      "status": "200",
      "data": {
        "feeds": [
          {
            "_id": "58240cd9d56f071100dae8cd",
            "author": {
              "_id": "5823fbe42c5e7011006d1a8c",
              "username": "mente",
              "profileImage": "http://ustadium-media-files.s3.amazonaws.com/content/de/0a3520b09711e6994bd975f00065b5/master.jpg",
              "profileImageThumbnail": "http://ustadium-media-files.s3.amazonaws.com/content/de/0a3520b09711e6994bd975f00065b5/small.jpg",
              "nickname": "Mente",
              "city": "New Yawk Shitty",
              "bio": "Backend Guy",
              "numPosts": 42
            },
            "description": "",
            "name": "Community Chit Chat",
            "mediaFile": "http://ustadium-media-files.s3.amazonaws.com/content/e5/4d51a0a70a11e6988493fa791ca9f5/master.jpg",
            "mediaFileThumbnail": "http://ustadium-media-files.s3.amazonaws.com/content/e5/4d51a0a70a11e6988493fa791ca9f5/small.jpg",
            "updatedAt": "2016-11-30T21:23:15.038Z",
            "createdAt": "2016-11-10T05:59:53.062Z",
            "tags": [],
            "isDefault": false,
            "isVerified": false,
            "numSubscriptions": 12,
            "numPosts": 23
          },
          {
            "_id": "584037c24135fb1100a364b7",
            "author": {
              "_id": "58243ac9e6e0141100a2e42f",
              "username": "nickspano",
              "bio": "looking for a good qb!",
              "city": "NYC",
              "nickname": "NickSpano",
              "profileImage": "http://ustadium-media-files.s3.amazonaws.com/content/8a/ee94a0b7d411e692bea305f0ce3037/master.jpg",
              "profileImageThumbnail": "http://ustadium-media-files.s3.amazonaws.com/content/8a/ee94a0b7d411e692bea305f0ce3037/small.jpg",
              "numPosts": 46
            },
            "description": "",
            "name": "Tailgates!",
            "mediaFile": "http://ustadium-media-files.s3.amazonaws.com/content/ef/12df40b7d411e6a99f55080376aa71/master.jpg",
            "mediaFileThumbnail": "http://ustadium-media-files.s3.amazonaws.com/content/ef/12df40b7d411e6a99f55080376aa71/small.jpg",
            "updatedAt": "2016-12-01T14:56:46.873Z",
            "createdAt": "2016-12-01T14:46:26.991Z",
            "tags": [],
            "isDefault": false,
            "isVerified": false,
            "numSubscriptions": 1,
            "numPosts": 7
          }
        ],
        "subscribed": [
          {
            "_id": "583f23ec762fb611009dccd1",
            "author": {
              "_id": "582404582c5e7011006d1a94",
              "username": "frankievit",
              "bio": "Jets fan",
              "city": "white Plains",
              "nickname": "FrankieVit",
              "profileImage": "http://ustadium-media-files.s3.amazonaws.com/content/1d/b8bf70b73711e689fa7797a9e5ee89/master.jpg",
              "profileImageThumbnail": "http://ustadium-media-files.s3.amazonaws.com/content/1d/b8bf70b73711e689fa7797a9e5ee89/small.jpg",
              "numPosts": 35
            },
            "description": "",
            "name": "jets are terribl",
            "mediaFile": "http://ustadium-media-files.s3.amazonaws.com/content/85/0f8980b73011e69b1ab9a2d2b8412d/master.jpg",
            "mediaFileThumbnail": "http://ustadium-media-files.s3.amazonaws.com/content/85/0f8980b73011e69b1ab9a2d2b8412d/small.jpg",
            "updatedAt": "2016-12-01T14:44:16.641Z",
            "createdAt": "2016-11-30T19:09:32.329Z",
            "tags": [],
            "isDefault": false,
            "isVerified": false,
            "numSubscriptions": 2,
            "numPosts": 1
          }
        ]
      }
    },
    api, api1;

    before(() => {
      process.env.HOST_NAME='localhost';
      process.env.IS_LOCAL=true
        app = express();
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'pug');
        app.use('/feeds', index);
        });

    beforeEach(() => {
     api = nock("http://localhost")
        .get("/api/feeds")
        .reply(200, JSON.stringify(mockResponse));

    api1 = nock("http://localhost")
        .get("/api/feeds/trending")
        .reply(200, JSON.stringify(mockResponse));
    mockResponse1 = { data:
   { _id: '5908e4dac39885001ba07544'}}
    api2 = nock("http://localhost")
        .get("/api/feeds/name/test1")
        .reply(200, JSON.stringify(mockResponse1));
    mockResponse2 = { total: 2,
  data:
   [ { _id: '592e729a8f542a001b5ae475',
       author: [Object],
       text: 'TEST linking\nhttp://www.google.com\nwww.google.com\ngoogle.com',
       contentType: 'ContentTypeText',
       __v: 0,
       updatedAt: '2017-05-31T07:36:58.577Z',
       createdAt: '2017-05-31T07:36:58.568Z',
       isPrivate: false,
       mentioned: [],
       numComments: 0,
       dislikes: 0,
       likes: 0,
       feeds: [Object] },
     { _id: '5908e508c39885001ba07545',
       author: [Object],
       text: 'TEST POST',
       contentType: 'ContentTypeText',
       __v: 0,
       likesDictionary: [Object],
       updatedAt: '2017-06-26T08:18:23.967Z',
       createdAt: '2017-05-02T19:59:04.553Z',
       isPrivate: false,
       mentioned: [],
       numComments: 1,
       dislikes: 0,
       likes: 1,
       feeds: [Object] } ],
  nextPageId: '5908e508c39885001ba07545' }

  api3 = nock("http://localhost")
      .get("/api/feeds/5908e4dac39885001ba07544/posts")
      .reply(200, JSON.stringify(mockResponse2));

    })

    it('return feed all', () => {
        return request(app)
            .get('/feeds/all')
            .expect(200);
    });

    it('returns trending feed', () => {
      return request(app)
          .get('/feeds/trending')
          .expect(200);
    })

    it('returns individual feed', () => {
      return request(app)
          .get('/feeds/test1')
          .expect(200);
    })


});
