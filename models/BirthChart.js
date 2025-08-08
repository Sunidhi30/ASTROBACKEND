const mongoose = require('mongoose');
const { Schema } = mongoose;

const birthChartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chartName: { type: String, required: true },
  relation: String,
  dateOfBirth: { type: Date, required: true },
  timeOfBirth: { type: String, required: true },
  placeOfBirth: {
    city: { type: String, required: true },
    state: String,
    country: { type: String, required: true },
    latitude: Number,
    longitude: Number,
    timezone: String
  },
  astroData: {
    ascendant: String,
    moonSign: String,
    sunSign: String,
    nakshatra: String,
    planetaryPositions: Schema.Types.Mixed,
    divisionalCharts: Schema.Types.Mixed,
    currentMahadasha: String,
    currentAntardasha: String,
    doshas: [String],
    yogas: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BirthChart', birthChartSchema);
