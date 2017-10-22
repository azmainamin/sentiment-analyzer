var sentimentController = require('../controllers/sentimentAnalyzerController');

describe("analzyeSentiment", () => {
    it("returns sentiment score given a text", () => {
        var text = "Please RT!! #chelsea Kante?s recovery going better than expected, but Chelsea could still be short.. https://t.co/jTXfuXd1Ej";
        expect(sentimentController.analzyeSentiment(text)).toEqual(3);
    });
});

