const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
  limit: 5 // how many records on each page
};

const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    title: String,
    charity: String,
    date: Date,
    notes: String
});


EventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', EventSchema);
