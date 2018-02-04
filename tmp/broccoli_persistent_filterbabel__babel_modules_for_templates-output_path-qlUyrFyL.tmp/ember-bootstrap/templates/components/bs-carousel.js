define("ember-bootstrap/templates/components/bs-carousel", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = Ember.HTMLBars.template({ "id": "uRyc1FLX", "block": "{\"symbols\":[\"indicator\",\"_index\",\"&default\"],\"statements\":[[4,\"if\",[[20,[\"showIndicators\"]]],null,{\"statements\":[[0,\"  \"],[6,\"ol\"],[9,\"class\",\"carousel-indicators\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"indicators\"]]],null,{\"statements\":[[0,\"      \"],[6,\"li\"],[10,\"class\",[26,[[25,\"if\",[[25,\"bs-eq\",[[20,[\"currentIndex\"]],[19,2,[]]],null],\"active\"],null]]]],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"toSlide\",[19,2,[]]],null],null],[9,\"role\",\"button\"],[7],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"carousel-inner\"],[9,\"role\",\"listbox\"],[7],[0,\"\\n  \"],[11,3,[[25,\"hash\",null,[[\"slide\"],[[25,\"component\",[\"bs-carousel/slide\"],[[\"currentSlide\",\"directionalClassName\",\"followingSlide\",\"orderClassName\",\"presentationState\"],[[20,[\"currentSlide\"]],[20,[\"directionalClassName\"]],[20,[\"followingSlide\"]],[20,[\"orderClassName\"]],[20,[\"presentationState\"]]]]]]]]]],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"showControls\"]]],null,{\"statements\":[[0,\"  \"],[6,\"a\"],[10,\"class\",[26,[[18,\"prevControlClassName\"]]]],[10,\"href\",[26,[\"#\",[18,\"elementId\"]]]],[9,\"role\",\"button\"],[3,\"action\",[[19,0,[]],\"toPrevSlide\"]],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"aria-hidden\",\"true\"],[10,\"class\",[26,[[18,\"prevControlIcon\"]]]],[7],[8],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[1,[18,\"prevControlLabel\"],false],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"a\"],[10,\"class\",[26,[[18,\"nextControlClassName\"]]]],[10,\"href\",[26,[\"#\",[18,\"elementId\"]]]],[9,\"role\",\"button\"],[3,\"action\",[[19,0,[]],\"toNextSlide\"]],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"aria-hidden\",\"true\"],[10,\"class\",[26,[[18,\"nextControlIcon\"]]]],[7],[8],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[1,[18,\"nextControlLabel\"],false],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-bootstrap/templates/components/bs-carousel.hbs" } });
});