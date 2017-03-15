const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// 这里不能用箭头函数
// 箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象，这里this是整个文件的上下文
// 而function定义的这个的this
UserSchema.virtual('postCount').get(function(){
  return this.posts.length;
});

UserSchema.pre('remove', function(next){
  //this === joe
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({_id: { $in : this.blogPosts }})
    .then(()=> next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;