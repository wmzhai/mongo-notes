// 设置测试环境

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {done();})
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done)=>{
  const { users, comments, blogposts } = mongoose.connection.collections; //所有名都会小写化
  users.drop(()=>{
    comments.drop(() => {
      blogposts.drop(() =>{
        // Ready to run the next test!
        done();
      });
    });
  });
});