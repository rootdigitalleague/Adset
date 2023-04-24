const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};
self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "gameSubmission.html",
      "css/gameSubmission.css",
      "css/normalize.css",
      "js/gameSubmission.js",
      "fonts/Luminari-Regular.woff",
      "fonts/Baskerville10Pro.woff",
      "img/vagrant.png",
      "img/vagrant-lg.png",
      "img/Medium_Box.png",
      "img/root-background.jpg",
      "img/autumn.jpg",
      "img/baseDeck.gif",
      "img/ExilesAndPartisansDeck.gif",
      "img/winter.jpg"
    ])
  );
});
