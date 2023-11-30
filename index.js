const express = require("express");
const app = express();
const fs = require('fs');
const PhotoOxy = require("@sl-code-lords/photooxy");
const TextPro = require("@sl-code-lords/text-pro-me");
const fileupload = require('express-fileupload');
var photooxy = new PhotoOxy()
var text_pro = new TextPro()
app.use(fileupload());

app.get('/', (req, res) => {
  res.json({message: 'Fuckyou 👎👎🫵'})
})

app.get('/photooxy', (req, res) => {
  (async () => {
    var photooxy = new PhotoOxy();
    var links = await photooxy.get_urls_list(); // Use await to wait for the Promise to resolve
    res.json(links);
  })();
})

app.get('/photooxy-1', (req, res) => {
  url = req.query.url;
  text = req.query.text;
  if (!url) return res.json({ 'message': 'No url provided' });
  if (!text) return res.json({ 'message': 'No text provided' });
  (async () => {
    var image1 = await photooxy.create({
        url : url,
        text : [text]
      })
      var img1_buf = await photooxy.image_to_buffer(image1.url)
      res.set({'Content-Type': 'image/jpeg'});
      res.send(img1_buf)
})();
})

app.get('/photooxy-2', (req, res) => {
  url = req.query.url;
  text1 = req.query.text1;
  text2 = req.query.text2;
  if (!url) return res.json({ 'message': 'No url provided' });
  if (!text1) return res.json({ 'message': 'No text1 provided' });
  if (!text2) return res.json({ 'message': 'No text2 provided' });
  (async () => {
    var image2 = await photooxy.create({
      url : url,
      text : [text1, text2]
    })
    var img2_buf = await photooxy.image_to_buffer(image2.url)
    res.set({'Content-Type': 'image/jpeg'});
    res.send(img2_buf)
})();
})

app.get('/textpro', (req, res) => {
  (async () => {
    var links = await text_pro.get_url_list()
    res.json(links);
  })();
})

app.get('/textpro-1', (req, res) => {
  url = req.query.url;
  text = req.query.text;
  if (!url) return res.json({ 'message': 'No url provided' });
  if (!text) return res.json({ 'message': 'No text provided' });
  (async () => {
    var image1 = await text_pro.one_text_create(
      url,
      text
      )
  var img1_buf = await text_pro.image_to_buffer(image1.url)
  res.set({'Content-Type': 'image/jpeg'});
  res.send(img1_buf)
})();
})

app.get('/textpro-2', (req, res) => {
  url = req.query.url;
  text1 = req.query.text1;
  text2 = req.query.text2;
  if (!url) return res.json({ 'message': 'No url provided' });
  if (!text1) return res.json({ 'message': 'No text1 provided' });
  if (!text2) return res.json({ 'message': 'No text2 provided' });
  (async () => {
    var image2 = await text_pro.double_text_create(
      url,
      text1,
      text2
      )
  var img2_buf = await text_pro.image_to_buffer(image2.url)
  res.set({'Content-Type': 'image/jpeg'});
  res.send(img2_buf)
})();
})

app.listen(8080, () => {
  console.log("Server started on port http://localhost:8080/");
});