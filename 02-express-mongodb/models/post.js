const postCollection = require("../config/mongoDbConnection").getCollection(
  "postCollection"
);
const { ObjectId } = require("mongodb");

exports.save = async (post) => {
  try {
    const col = await postCollection();
    const result = await col.insertOne(post);
    return result.ops && result.ops[0];
  } catch (error) {
    throw "添加文章到数据库出错";
  }
};

exports.findAll = async () => {
  try {
    const col = await postCollection();
    return col.find({}).toArray();
  } catch (error) {
    throw "查询文章出错";
  }
};

exports.update = async (id, post) => {
  try {
    const col = await postCollection();
    const result = await col.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: post },
      { returnOriginal: false }
    );
    return result.value;
  } catch (error) {
    throw "更新文章出错";
  }
};

exports.delete = async (id) => {
  try {
    const col = await postCollection();
    await col.deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    throw "删除文章出错";
  }
};

exports.deleteCommentByUser = async (postId, user) => {
  try {
    const col = await postCollection();
    await col.updateOne(
      { _id: ObjectId(postId) },
      { $pull: { comments: { user } } }
    );
  } catch (error) {
    throw "根据用户名删除评论出错";
  }
};
