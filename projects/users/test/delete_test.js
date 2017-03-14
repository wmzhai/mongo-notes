const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done)=>{
    joe = new User({name: "Joe"});
    joe.save()
      .then(()=>done());
  });

  it('model instance remove',(done)=>{
    joe.remove()
      .then(() => User.findOne({name:'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove',(done) => {
    //删除一些满足条件的数据
    User.remove({name:'Joe'})
      .then(() => User.findOne({name:'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove',(done)=>{
    // 删除一些满足条件的数据中的第一个
    User.findOneAndRemove({name:'Joe'})
      .then(() => User.findOne({name:'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove',(done)=>{
    //删除某个id的数据
    User.findByIdAndRemove({_id: joe._id})
      .then(() => User.findOne({name:'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  
});