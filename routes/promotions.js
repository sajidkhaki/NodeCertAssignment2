var mongoose = require('mongoose');
var promotions = require("./promotions")

// Connection URL
var url = 'mongodb://localhost:27017/courseEra';
mongoose.connect(url)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {

    // Connection established
    console.log('Connected correctly to server');
    // rest code goes down here

    promotions.create({
        "name": "Uthapizza",
        "image": "images/uthapizza.png",
        "label": "Hot",
        "price": "4.99",
        "description": "A unique . . ."

    }, function (err,promotions) {
        if(err) throw(err);
        console.log("promotions created");
        console.log(promotions)

        var id = promotions._id;
        setTimeout(function() {

            Promotions.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
                .exec(function(err, promotions) {
                    if (err) throw err;
                    console.log('Updated promotion!');
                    console.log(promotions);

                    promotions.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling',
                        author: 'Leonardo di Carpaccio'
                    });

                    promotions.save(function(err, promotions) {
                        console.log('Updated Comments');
                        console.log(promotions);

                        db.collection('promotions').drop(function() {
                            db.close();
                        });
                    });
                });
        }, 3000);
    })
})