/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId("619cd9f85e744c3ba37454cb"),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: "$rating",
      },
      numOFReviews: {
        $sum: 1,
      },
    },
  },
];

MongoClient.connect(
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.uchor.mongodb.net/nodeshop?authSource=admin&replicaSet=atlas-y7bjz8-shard-0&readPreference=primary&appname=MongoDB+Compass&ssl=true",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("nodeshop").collection("reviews");
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  }
);
