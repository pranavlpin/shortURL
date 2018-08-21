const expect = require("expect");
const request = require("supertest");

const {
    app
} = require("./../server");
const Shorturl = require('../models/Shorturl');
const Analytics = require("../models/Analytics");

const shorturls = [{
        originalURL: "https://www.amazon.in/Philips-T-Bulb-Base-10-Watt-Light/dp/B075F9Z6XB/",
        shortURL: "https://shorturl-ms.herokuapp.com//vb4nkXClJ",
        shortCode: "vb4nkXClJ",
    },
    {
        originalURL: "https://www.amazon.in/Philips-Compatible-Amazon-HomeKit-Assistant/dp/B00UVHAC1O/ref=sr_1_14?s=kitchen&ie=UTF8&qid=1534753950&sr=1-14&keywords=hue",
        shortURL: "https://shorturl-ms.herokuapp.com/-KGaqQRwb",
        shortCode: "-KGaqQRwb",
    }
];

beforeEach((done) => {
    Shorturl.remove({}).then(() => {
        return Shorturl.insertMany(shorturls);
    }).then(() => done());
});

describe("POST /shortenurl : request to generate shortened url", () => {
    it('should create a new shortened URL and save it', (done) => {
        var baseurl = "https://shorturl-ms.herokuapp.com";
        var originalUrl = "https://www.amazon.in/dp/B0756VRJ25?pf_rd_p=94c7ecb9-d936-4c10-bff9-66da8d7443df&pf_rd_r=FAGBR5Y1N4ACND5ZJ8N6";

        request(app)
            .post('/shortenurl')
            .send({
                baseurl,
                originalUrl
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("URL details added to database");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Shorturl.find({
                    originalURL: "https://www.amazon.in/dp/B0756VRJ25?pf_rd_p=94c7ecb9-d936-4c10-bff9-66da8d7443df&pf_rd_r=FAGBR5Y1N4ACND5ZJ8N6"
                }).then((shurl) => {
                    expect(shurl.length).toBe(1);
                    expect(typeof shurl[0]['shortCode']).toBe('string')
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not create shortened url when originalUrl property is not present', (done) => {
        request(app)
            .post('/shortenurl')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Shorturl.find().then((shurl) => {
                    expect(shurl.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e)
                });
            });
    });
});

describe('GET /:shorturl redirects to original url', () => {
    it("Should redirect to correct url", (done) => {
        request(app)
            .get('/vb4nkXClJ')
            .expect(302)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.header['location']).toBe("https://www.amazon.in/Philips-T-Bulb-Base-10-Watt-Light/dp/B075F9Z6XB/");
                done();
            });
    });
});