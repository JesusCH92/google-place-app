(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function(root, factory) {

	if (root === null) {
		throw new Error('Google-maps package can be used only in browser');
	}

	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.GoogleMapsLoader = factory();
	}

})(typeof window !== 'undefined' ? window : null, function() {


	'use strict';


	var googleVersion = '3.31';

	var script = null;

	var google = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;


	var GoogleMapsLoader = {};


	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

	GoogleMapsLoader.KEY = null;

	GoogleMapsLoader.LIBRARIES = [];

	GoogleMapsLoader.CLIENT = null;

	GoogleMapsLoader.CHANNEL = null;

	GoogleMapsLoader.LANGUAGE = null;

	GoogleMapsLoader.REGION = null;

	GoogleMapsLoader.VERSION = googleVersion;

	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


	GoogleMapsLoader._googleMockApiObject = {};


	GoogleMapsLoader.load = function(fn) {
		if (google === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
					ready(fn);
				};

				GoogleMapsLoader.createLoader();
			}
		} else if (fn) {
			fn(google);
		}
	};


	GoogleMapsLoader.createLoader = function() {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = GoogleMapsLoader.createUrl();

		document.body.appendChild(script);
	};


	GoogleMapsLoader.isLoaded = function() {
		return google !== null;
	};


	GoogleMapsLoader.createUrl = function() {
		var url = GoogleMapsLoader.URL;

		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

		if (GoogleMapsLoader.KEY) {
			url += '&key=' + GoogleMapsLoader.KEY;
		}

		if (GoogleMapsLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
		}

		if (GoogleMapsLoader.CLIENT) {
			url += '&client=' + GoogleMapsLoader.CLIENT;
		}

		if (GoogleMapsLoader.CHANNEL) {
			url += '&channel=' + GoogleMapsLoader.CHANNEL;
		}

		if (GoogleMapsLoader.LANGUAGE) {
			url += '&language=' + GoogleMapsLoader.LANGUAGE;
		}

		if (GoogleMapsLoader.REGION) {
			url += '&region=' + GoogleMapsLoader.REGION;
		}

		if (GoogleMapsLoader.VERSION) {
			url += '&v=' + GoogleMapsLoader.VERSION;
		}

		return url;
	};


	GoogleMapsLoader.release = function(fn) {
		var release = function() {
			GoogleMapsLoader.KEY = null;
			GoogleMapsLoader.LIBRARIES = [];
			GoogleMapsLoader.CLIENT = null;
			GoogleMapsLoader.CHANNEL = null;
			GoogleMapsLoader.LANGUAGE = null;
			GoogleMapsLoader.REGION = null;
			GoogleMapsLoader.VERSION = googleVersion;

			google = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.google !== 'undefined') {
				delete window.google;
			}

			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			GoogleMapsLoader.load(function() {
				release();
			});
		} else {
			release();
		}
	};


	GoogleMapsLoader.onLoad = function(fn) {
		onLoadEvents.push(fn);
	};


	GoogleMapsLoader.makeMock = function() {
		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

		GoogleMapsLoader.createLoader = function() {
			window.google = GoogleMapsLoader._googleMockApiObject;
			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
		};
	};


	var ready = function(fn) {
		var i;

		loading = false;

		if (google === null) {
			google = window.google;
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](google);
		}

		if (fn) {
			fn(google);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](google);
		}

		callbacks = [];
	};


	return GoogleMapsLoader;

});

},{}],2:[function(require,module,exports){
module.exports={
   "html_attributions" : [],
   "next_page_token" : "CrQCIQEAAAENqRXyoEjWo07Z1YSWothtA3euQDJwaTg6B_HLMYLp7Fkq2pKf8q5_Tf2JwNZXbXkozV2-hh0x0N7sfMaMrc6ECYPaBzFlYFvQPrCq6ahk7zY8yFB-nAcjxGAkMdzt7cT0f5OrB8_6oMUCI5QMkbY2nT7oy0545Hfpx9IyXcAesbNYJI9lsK5Tam_An38eWvY-1zwHzAHrkAkr2fIn9qXY3gk88XSQeFgpsLsPL_06WwSCAkiElhIDG5Clt8mEQUg_6KQpC1sBQ6W3VuMwpC2Q9uejE3ooG45YbKIsTkOptHC7612rEhWEiVoKv9566ErgM7ZkPttkibUkLNIHV956DXQVRtE1FF1FRcD4Ney1xP7gknPsbSjTA_FG5pc0rNAa3AJIzKbuK6Gr-eO0AcUSEDTyn1jcCwjVkwkKN935_r8aFIb-haJfk_nl7wIO1bq1CkrQN2XG",
   "results" : [
      {
         "geometry" : {
            "location" : {
               "lat" : 41.39419739999999,
               "lng" : 2.1490162
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3955408802915,
                  "lng" : 2.150527330291502
               },
               "southwest" : {
                  "lat" : 41.3928429197085,
                  "lng" : 2.147829369708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "1b6f5836118a6444d90dd415478896a3fa9e9b8f",
         "name" : "Hotel Hesperia Barcelona Presidente",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 970,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/103359066151863102260\"\u003eHotel Hesperia Barcelona Presidente\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAIcWohvOVfSGNxeZUj47hUpDfnfPmSeUZyh8O1u0QkK--n9zMqnZJGfq4M-y5PqlfqO653jvwBdlxf7dY-2ltLKQ85Yr4lbR7j1ytNbpXSB5Q5DC7yQbmKHV8Eum9da2PEhA5q_cikgKCVjddewnuAIzkGhSd-YbPAK-4FYEYOPcURHAhakooPQ",
               "width" : 2000
            }
         ],
         "place_id" : "ChIJw7XAZZyipBIRvIRiPPFeXQw",
         "plus_code" : {
            "compound_code" : "94VX+MJ Barcelona, Spain",
            "global_code" : "8FH494VX+MJ"
         },
         "rating" : 4.2,
         "reference" : "ChIJw7XAZZyipBIRvIRiPPFeXQw",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 979,
         "vicinity" : "Avinguda Diagonal, 570, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3944427,
               "lng" : 2.165064999999999
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.39569463029149,
                  "lng" : 2.166451530291502
               },
               "southwest" : {
                  "lat" : 41.3929966697085,
                  "lng" : 2.163753569708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "0fe623dde1eb897c1f748bdd1d0101d28ce4e73b",
         "name" : "Hotel Claris GL",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 3264,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/107987290780698555035\"\u003eNenad Stojanovic\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAApeGEHBcX0_rrgCXgtGPF7NWBH8Xd5IkKq4M5lztqF49GvGL2WIi4uyJjj2Kbdka9t_7putifEsE5616kZvNJWSJGyy7ZsyMP2Gx9D697tyNLPHNOSI-3lpb4s1tdwlROEhDIA3aC2D9IoCIpYgP5mSGGGhS3G7qhiepWUbYzJuRxdKKAEdJMgw",
               "width" : 2448
            }
         ],
         "place_id" : "ChIJ9WP3y-yipBIRHF1rHOaq5Y4",
         "plus_code" : {
            "compound_code" : "95V8+Q2 Barcelona, Spain",
            "global_code" : "8FH495V8+Q2"
         },
         "rating" : 4.5,
         "reference" : "ChIJ9WP3y-yipBIRHF1rHOaq5Y4",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 748,
         "vicinity" : "Carrer de Pau Claris, 150, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3752423,
               "lng" : 2.1683955
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3764694802915,
                  "lng" : 2.169722530291502
               },
               "southwest" : {
                  "lat" : 41.3737715197085,
                  "lng" : 2.167024569708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "5db81e470439f1dc0c08d1b4bf0d6abc3a1b7fd7",
         "name" : "Hotel Barcelona Universal",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 664,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/114243081498579221906\"\u003eHotel Barcelona Universal\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAEyHoxvCBbhY9dFQxg29M_r229LIv5SBHcuha1PhZ140oVBgLnuwFK-7b75WnV2EJv540CMtXFQZJAa5o8SCdfP4vOoFvYccGEMr-uF5q8jaPiLZkThf6mOT5IfE-iGYUEhA4gsyVkJ5IiSq6ay9-InzqGhRfqb2uSvqbFi7vWAEtdDjtKsWaFg",
               "width" : 1000
            }
         ],
         "place_id" : "ChIJzxsVFlyipBIRV_JlzXfW9bA",
         "plus_code" : {
            "compound_code" : "95G9+39 Barcelona, Spain",
            "global_code" : "8FH495G9+39"
         },
         "rating" : 4.4,
         "reference" : "ChIJzxsVFlyipBIRV_JlzXfW9bA",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 1293,
         "vicinity" : "Avinguda del Paral·lel, 76, 80, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3849852,
               "lng" : 2.1776613
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3862778802915,
                  "lng" : 2.178947430291502
               },
               "southwest" : {
                  "lat" : 41.3835799197085,
                  "lng" : 2.176249469708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "bbe0956259061a38b3604e5e817321ccf4bc1825",
         "name" : "Grand Hotel Central",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 1260,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAdF18uGoKz2kd0cDjeH4E2e7rj0Rmq5H9WBeyfEyLAvnrTMHLdjISj3UV46ljkq0EfA-_TjhZL_fO2EM2YjYLRb9Bfn2zXwlFYidl6aiQaMA2iIc-UemF9UyXAx5f6N8GEhA4O0Fm2KV6CMx6uDhEBrhLGhQ2oMW6tR-TQFMShMXSF8dsbdBTdg",
               "width" : 960
            }
         ],
         "place_id" : "ChIJg1-2b_mipBIRirLgoXI-GXU",
         "plus_code" : {
            "compound_code" : "95MH+X3 Barcelona, Spain",
            "global_code" : "8FH495MH+X3"
         },
         "rating" : 4.5,
         "reference" : "ChIJg1-2b_mipBIRirLgoXI-GXU",
         "scope" : "GOOGLE",
         "types" : [
            "spa",
            "travel_agency",
            "lodging",
            "bar",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 815,
         "vicinity" : "Via Laietana, 30, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3858392,
               "lng" : 2.1947363
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3872847302915,
                  "lng" : 2.195954530291502
               },
               "southwest" : {
                  "lat" : 41.3845867697085,
                  "lng" : 2.193256569708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "4f04444add294d3d15a12aa6037c1106d87e9b0e",
         "name" : "Pullman Barcelona Skipper",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 2411,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/116813267702312913006\"\u003ePullman Barcelona Skipper\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAATHJvIw6vdQdKhtTD4-APnXSY0pk51Zjpj4TUJafLtv9At1MspODxNMkJPgxktoLg79v-MsEYD044KRuFv6NPXIasmITH-6kzLkR-hnbqBvxqYU4XZBrKRcl1O2Y6Im4mEhCTsEfiwOXvbfF8szoZYVCwGhQsyXCD8tSrcWSgXSiSMjL5SkstkQ",
               "width" : 3617
            }
         ],
         "place_id" : "ChIJcxL-UA-jpBIRY6Zc_Z_1fBM",
         "plus_code" : {
            "compound_code" : "95PV+8V Barcelona, Spain",
            "global_code" : "8FH495PV+8V"
         },
         "price_level" : 1,
         "rating" : 4.4,
         "reference" : "ChIJcxL-UA-jpBIRY6Zc_Z_1fBM",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 1646,
         "vicinity" : "Avinguda del Litoral, 10, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.4038774,
               "lng" : 2.1911894
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.4051248802915,
                  "lng" : 2.192540080291502
               },
               "southwest" : {
                  "lat" : 41.4024269197085,
                  "lng" : 2.189842119708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "c283a8d7826904ef936abfd5b192a9ac5ad2ebad",
         "name" : "Hotel Novotel Barcelona City",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 3620,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/100388122990254496077\"\u003eHotel Novotel Barcelona City\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAD_Pqe_sH54j5EDQyWrdvWMLfmsPaYOCV6pkdb2LL0QR3ZddZGvK-ZPYcStei9ISj4ocag_KEh20R0aIQ0vdtojnjzb5rOJy8ShVWC2W3HowMYe9BzJPAOppO5CSpl9z9EhC7aoK4bd-moy2Lc7KKqZrxGhR-bWRewbd8hu7_PRZ2Q0R2ac1S3A",
               "width" : 2414
            }
         ],
         "place_id" : "ChIJL_SMmCOjpBIRghm7WfY2UnU",
         "plus_code" : {
            "compound_code" : "C53R+HF Barcelona, Spain",
            "global_code" : "8FH4C53R+HF"
         },
         "rating" : 4.3,
         "reference" : "ChIJL_SMmCOjpBIRghm7WfY2UnU",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 2519,
         "vicinity" : "Entrada por, Avenida Diagonal, Carrer de la Ciutat de Granada, 201, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3922,
               "lng" : 2.1524
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3934758302915,
                  "lng" : 2.153650530291502
               },
               "southwest" : {
                  "lat" : 41.3907778697085,
                  "lng" : 2.150952569708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "e41ee2b79ee15211d8ac59ab625d0b3e0d50ca67",
         "name" : "Tàmara - Barcelona",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 2268,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/112522583854561150187\"\u003eCarlos Guillot\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAA-3wGsV6KfTlG70vON75pChiphxEYIxPfXAdkVmjLsxVePlkxma2kbqbZE7N_NvjaGR3VrH81Llf_Fkmthb2IuKPtgVX-ehpzTbBo-GGh-OYfpMmK9Oh9epataIwIK3nYEhBkAeTUyTFAQWn8-hW2XtHwGhQL7CDS2OiwRxDm9myCxIWzZTrY7w",
               "width" : 4032
            }
         ],
         "place_id" : "ChIJPWK2IJuipBIRsPCRNMm1N1Q",
         "plus_code" : {
            "compound_code" : "95R2+VX Barcelona, Spain",
            "global_code" : "8FH495R2+VX"
         },
         "price_level" : 2,
         "rating" : 3.8,
         "reference" : "ChIJPWK2IJuipBIRsPCRNMm1N1Q",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 710,
         "vicinity" : "Carrer de Muntaner, 178, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.38072150000001,
               "lng" : 2.167244
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3819865802915,
                  "lng" : 2.168612830291502
               },
               "southwest" : {
                  "lat" : 41.3792886197085,
                  "lng" : 2.165914869708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "5941db93cd82475782249cf024f538010a9509e0",
         "name" : "Marmalade",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 490,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/105030225187527585929\"\u003eMarmalade\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAA_k9G3pjJhi3csK2MNtVKYtHumB6qr2LwN04hsSWlOlCyVKixUhgCJM06ZEVT2tpv_CH2jvZ5dXEFDfnq6xqnk8wwPDwX3KwklC5LTbMEU3WRUiYVFmWh_2UvmeGvR72DEhBSndZEvfIY6u8osDdb8OYvGhS63UlzgEJ0RKFbGJPNbrafBeFLGg",
               "width" : 863
            }
         ],
         "place_id" : "ChIJBUlSf1-ipBIRE4mG5gos82o",
         "plus_code" : {
            "compound_code" : "95J8+7V Barcelona, Spain",
            "global_code" : "8FH495J8+7V"
         },
         "price_level" : 2,
         "rating" : 4.3,
         "reference" : "ChIJBUlSf1-ipBIRE4mG5gos82o",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "bar", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 1147,
         "vicinity" : "Carrer de la Riera Alta, 4, 6, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3812711,
               "lng" : 2.1086871
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3827274802915,
                  "lng" : 2.110200180291502
               },
               "southwest" : {
                  "lat" : 41.3800295197085,
                  "lng" : 2.107502219708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "bcec95eb07d2805d23a4f021966deeac2d822f20",
         "name" : "Hotel Fairmont Rey Juan Carlos I - Barcelona",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 1000,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/110746984043003317846\"\u003eHotel Fairmont Rey Juan Carlos I - Barcelona\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAhBozoVNAc-BhDhODi4hGcbY7m0oeTrZL1sTzgLF1SV-n9BhgF2x51k1a_x7jYOylLMoqLi1apb2206ks3BetfVlsNXFcSM_iiS8PQefZ3gtEJnnWxukQVdlHvsyElSk6EhCFIrfEytLVJuwtAeETsRN9GhRw-HVIRg19hUUIK2UAknGQcWsWiQ",
               "width" : 1500
            }
         ],
         "place_id" : "ChIJm4KYeVaYpBIRF7q31ke_EtU",
         "plus_code" : {
            "compound_code" : "94J5+GF Barcelona, Spain",
            "global_code" : "8FH494J5+GF"
         },
         "rating" : 4.5,
         "reference" : "ChIJm4KYeVaYpBIRF7q31ke_EtU",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 2545,
         "vicinity" : "Avinguda Diagonal, 661, 671, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3909532,
               "lng" : 2.1675783
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3922687802915,
                  "lng" : 2.168972480291502
               },
               "southwest" : {
                  "lat" : 41.3895708197085,
                  "lng" : 2.166274519708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "97ce2246345fedda0f632fffcd454060d8cad189",
         "name" : "Thai Barcelona",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 1034,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/114930327902147830702\"\u003eThai Barcelona | Royal Cuisine\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAA8MjNYfIxGzRtnAEzU0JN29u31rEmKDmS0chD2caSWv6jRI0p4D8EMGa9pfacprKOISHQxu-HL1f6jmJOOFrhtk_p5lydw-t-iFfhg-1BFAZ0lNWwf03KzS_EdIFAmY1AEhCLQn8PiGApv9U9-7Q539n3GhQ6Rw2BLQpIStqKTEgozTysfUL5Kw",
               "width" : 2048
            }
         ],
         "place_id" : "ChIJDag3hu2ipBIR7vZDpaM-foo",
         "plus_code" : {
            "compound_code" : "95R9+92 Barcelona, Spain",
            "global_code" : "8FH495R9+92"
         },
         "price_level" : 2,
         "rating" : 4.3,
         "reference" : "ChIJDag3hu2ipBIR7vZDpaM-foo",
         "scope" : "GOOGLE",
         "types" : [
            "meal_delivery",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 1784,
         "vicinity" : "Carrer de la Diputació, 273, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3937466,
               "lng" : 2.1362659
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3952632302915,
                  "lng" : 2.137541880291502
               },
               "southwest" : {
                  "lat" : 41.39256526970851,
                  "lng" : 2.134843919708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "1b0910bafd983dac2cbffb3514c15bec29028d6b",
         "name" : "Ándele Santa Fe",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 3096,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/109657368848703725707\"\u003eCharlie 9P\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAA1hH5qZwIDZekfq_u_YM3uJrPmWrzLOUbLQkoQqirF139tz4yZz050Nmb22kWPWds2-H2zUr5PQkzLpLgm4IoTelCm9IlCLwcF28FwIoMWWZT7n-3C_Ed8nkq4LF1cLA_EhAAG-IIgOi2c6mMvst0hAGBGhQawq_r9trQCKBWY2Zz5n3XNw78uA",
               "width" : 4128
            }
         ],
         "place_id" : "ChIJ8dRB0nqYpBIRTnBNVYyYh_o",
         "plus_code" : {
            "compound_code" : "94VP+FG Barcelona, Spain",
            "global_code" : "8FH494VP+FG"
         },
         "price_level" : 2,
         "rating" : 4.1,
         "reference" : "ChIJ8dRB0nqYpBIRTnBNVYyYh_o",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 3612,
         "vicinity" : "Carrer de Santa Fe de Nou Mèxic, 6, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.391559,
               "lng" : 2.1728625
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3929740302915,
                  "lng" : 2.174297680291502
               },
               "southwest" : {
                  "lat" : 41.3902760697085,
                  "lng" : 2.171599719708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "7af71bfd054a4ce61b5ca210b59358ff5b7c9985",
         "name" : "Hotel Constanza",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 1207,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/104782050411654368077\"\u003eHotel Constanza Barcelona\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAFeCWOSoWeVfd-skkM7y-aF2tXiY-A-RtrrwjwTSSUhCIGQoT73xZnfBV3eTmobVLXvaLy44RM9BzDwC8rtV-nhynppL-QYL0N3F3p5R_tE3BuAgiENxIUL2gIDDNi0adEhCJ592-3hPeyKkIL16dj8TsGhS3vNPZr9GjY_f-eU-_G79jh8Pyng",
               "width" : 1984
            }
         ],
         "place_id" : "ChIJLXoIxO-ipBIR7hryh1WNOsA",
         "plus_code" : {
            "compound_code" : "95RF+J4 Barcelona, Spain",
            "global_code" : "8FH495RF+J4"
         },
         "rating" : 4.3,
         "reference" : "ChIJLXoIxO-ipBIR7hryh1WNOsA",
         "scope" : "GOOGLE",
         "types" : [
            "lodging",
            "bar",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 432,
         "vicinity" : "Carrer del Bruc, 33, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.385549,
               "lng" : 2.125518
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3867708302915,
                  "lng" : 2.126947280291502
               },
               "southwest" : {
                  "lat" : 41.3840728697085,
                  "lng" : 2.124249319708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "a8868fa7f1e3cf714e624852f9cfc4bb13804086",
         "name" : "Catalonia Rigoletto",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 2800,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/111427210686711932709\"\u003eHotel Catalonia Rigoletto\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAA-WAP2drLMznlXBfRLYy6y2XwkYqOA40hSn1rkVIhvTO5iJHqtNxCNpgF7WILEOD6fPKEV0-Q_bEcujO183iFT38tyrRayF58btKB1s_8K-_ir-F1QUeESTA0P7Coarx8EhCFkxfM9ry6ercDSVQ7PGJnGhSkxPwhoWFq7eYV0x34Wun84Baq6g",
               "width" : 4207
            }
         ],
         "place_id" : "ChIJTTeWIV6YpBIRbVMQu7q2HDU",
         "plus_code" : {
            "compound_code" : "94PG+66 Barcelona, Spain",
            "global_code" : "8FH494PG+66"
         },
         "rating" : 4.2,
         "reference" : "ChIJTTeWIV6YpBIRbVMQu7q2HDU",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 488,
         "vicinity" : "Carrer de Sabino Arana, 22, 24, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.386967,
               "lng" : 2.174348
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.38844038029151,
                  "lng" : 2.175744580291501
               },
               "southwest" : {
                  "lat" : 41.38574241970851,
                  "lng" : 2.173046619708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "f520ea152626b0fc153f7df35f9eab845deef62c",
         "name" : "Ohla Barcelona",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 3727,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/112737249190929384536\"\u003eOhla Barcelona\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAASVYXfU8tyA8XG_mebnpfSMQhaVt-qxmP483iI-YQ4Afa93Ya-6n8t4yhYmq1g2lVP9ADgpPEof-h7TyKBl-ur3c809X6GwstrYrP_WQMUZexndPJrzGOhuKou-bYXX3lEhDLpNwXC8f4S5-pOUA8FdZ4GhR3GPCEaYZWYQS3G_b7-imWGNz5ew",
               "width" : 5590
            }
         ],
         "place_id" : "ChIJWwhpnvCipBIRt0wPJD16Jv0",
         "plus_code" : {
            "compound_code" : "95PF+QP Barcelona, Spain",
            "global_code" : "8FH495PF+QP"
         },
         "rating" : 4.5,
         "reference" : "ChIJWwhpnvCipBIRt0wPJD16Jv0",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 650,
         "vicinity" : "Via Laietana, 49, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3852732,
               "lng" : 2.1826869
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.38664998029149,
                  "lng" : 2.184072080291502
               },
               "southwest" : {
                  "lat" : 41.3839520197085,
                  "lng" : 2.181374119708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "69de68fa5b6f0387857effc665273e4a4b89bbe0",
         "name" : "Little Italy",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 426,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/103737223105882715216\"\u003eRistorante Little Italy\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAQiF264HecbAoqPi0KJNZo3T84vRLlA97O5DLSNx3TZhR9PshzFh2cKsb3EeFKHAV8agk0Awwr-56UEN1roadWIeAX2rVQThYsXybB4h9dMV7Ks5ACTSGlg_eF5svPoL7EhD78M5OC8GaJaHJ0dNwKwUAGhSV0EEiafFqoM4ddk3wJRCS0X4hSw",
               "width" : 640
            }
         ],
         "place_id" : "ChIJk_S0dv6ipBIRTseTfN_uc1g",
         "plus_code" : {
            "compound_code" : "95PM+43 Barcelona, Spain",
            "global_code" : "8FH495PM+43"
         },
         "price_level" : 2,
         "rating" : 3.8,
         "reference" : "ChIJk_S0dv6ipBIRTseTfN_uc1g",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 573,
         "vicinity" : "Carrer del Rec, 30, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.40080999999999,
               "lng" : 2.15913
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.40212668029149,
                  "lng" : 2.160428430291502
               },
               "southwest" : {
                  "lat" : 41.3994287197085,
                  "lng" : 2.157730469708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "ddb760e0cea70e7724c4f75e0aba7826a0d66b8e",
         "name" : "La Vietnamita",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 490,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/100751385249644108797\"\u003eLa Vietnamita\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAA_bKcZ9KAjPG0Y5stpFYMvs1TZflKBhkyISAShCxgm-eEY3qvYX4Lmu1OBmbhIbmfzRmveAhkoOOcmelrHftYKkRXFpghU3HdJlXrSZUaedMp8EJTDJae6xOjaOltGEHSEhCSgrK0U37PI3kznokPeGfYGhR8kizc94nf9n1uwm4JO8YDSl06vw",
               "width" : 863
            }
         ],
         "place_id" : "ChIJcRNmG5aipBIRvjtddo3D5pk",
         "plus_code" : {
            "compound_code" : "C525+8M Barcelona, Spain",
            "global_code" : "8FH4C525+8M"
         },
         "price_level" : 2,
         "rating" : 3.9,
         "reference" : "ChIJcRNmG5aipBIRvjtddo3D5pk",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 1051,
         "vicinity" : "Carrer del Torrent de l'Olla, 78, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.3515502,
               "lng" : 2.090415699999999
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3529675802915,
                  "lng" : 2.091683230291502
               },
               "southwest" : {
                  "lat" : 41.35026961970851,
                  "lng" : 2.088985269708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "871bb70a456619f133ab526303b0cee2ad2b6f0b",
         "name" : "Hotel Novotel Barcelona Cornellà",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 621,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/106513467477738128719\"\u003eHotel Novotel Barcelona Cornellà\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAwigkkjzPBYRwPSK2ckqzb-bETmGMYIaPtAQnPspDxwrHUjOZGtKudW1kr4QNwjBmN5jQdUk5j9G0GrObk_pU1W-5K7ljq6C6Y5uOPDx4uE2PTqhjSLt_Y_zQxc5aGQPPEhDxgM6QnjCU9HHp4FoXK-jkGhTI9JyrJcoAySzpmo8bU03xe3iVRQ",
               "width" : 1024
            }
         ],
         "place_id" : "ChIJDXQZRTeZpBIRyV43ndgZXKY",
         "plus_code" : {
            "compound_code" : "932R+J5 Cornellà de Llobregat, Spain",
            "global_code" : "8FH4932R+J5"
         },
         "rating" : 4.1,
         "reference" : "ChIJDXQZRTeZpBIRyV43ndgZXKY",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 1553,
         "vicinity" : "Avinguda del Maresme, 78, Cornellà de Llobregat"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.38479439999999,
               "lng" : 2.1750758
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.38615658029149,
                  "lng" : 2.176370480291502
               },
               "southwest" : {
                  "lat" : 41.38345861970849,
                  "lng" : 2.173672519708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "3aa75509ece806d0302e64790d932fedfe6b1bfa",
         "name" : "Hotel Barcelona Catedral",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 1333,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/114102022975157413296\"\u003eHotel Barcelona Catedral\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAj-USqb6TGrPiLsloFP5DgWQSa0Gl5ppmuNsVwERXL-GXSP_kisUymqySlNsci0OIucUbhn6_Bto3XbRJTtYYPp0GtA1UWzU8zGnjU-CNtHwhfwG5Brf2TG_rR86IKXeYEhCy8pP5mmKn8f5cxQ19Ik6-GhQ6Fwon6MLJqOFEPAZgHnLXa7uyUA",
               "width" : 2000
            }
         ],
         "place_id" : "ChIJmRxO7_mipBIRdCiunF_6N_U",
         "plus_code" : {
            "compound_code" : "95MG+W2 Barcelona, Spain",
            "global_code" : "8FH495MG+W2"
         },
         "rating" : 4.2,
         "reference" : "ChIJmRxO7_mipBIRdCiunF_6N_U",
         "scope" : "GOOGLE",
         "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 585,
         "vicinity" : "Carrer dels Capellans, 4, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.376801,
               "lng" : 2.1460443
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3780985302915,
                  "lng" : 2.147432380291501
               },
               "southwest" : {
                  "lat" : 41.3754005697085,
                  "lng" : 2.144734419708497
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "b3142475e7a5a38a487518607fdd67f391311652",
         "name" : "Pestana Arena Barcelona",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 4005,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/101010805306894166594\"\u003ePestana Arena Barcelona\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAT6EFp2-rQP_mu0u8jcgvqBYyGXnJYatGWpthB1m9chreKZcJM0iP-ECsCNykueArwec-RhXm-7_LO4NfEImzGMcujIykNK-zW3LYzUgWy7UUBe8RWjJHmA9F210imsCIEhC4q-peq21qfTKRnHNXJSrXGhSz-lmxx75DIuINQNZ3_06X05Cn7Q",
               "width" : 5999
            }
         ],
         "place_id" : "ChIJVdotT3-ipBIRbtiXESy5sSM",
         "plus_code" : {
            "compound_code" : "94GW+PC Barcelona, Spain",
            "global_code" : "8FH494GW+PC"
         },
         "rating" : 4.3,
         "reference" : "ChIJVdotT3-ipBIRbtiXESy5sSM",
         "scope" : "GOOGLE",
         "types" : [
            "spa",
            "lodging",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 687,
         "vicinity" : "Carrer del Consell de Cent, 51, 53, Barcelona"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 41.38815140000001,
               "lng" : 2.1742114
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 41.3894896302915,
                  "lng" : 2.175519780291502
               },
               "southwest" : {
                  "lat" : 41.3867916697085,
                  "lng" : 2.172821819708498
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "e06a4cc806c003512fec4501a470953ea50fce70",
         "name" : "Restaurant Flo",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 512,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/114853488160750125385\"\u003eBrasserie Flo\u003c/a\u003e"
               ],
               "photo_reference" : "CmRZAAAAl9Q27TinoMvhQylY57U9XKsdqkhhcFbuus1sWPhykOfFhI80S7A7si2dgK8fywKi8PMHAtSMpLCeNmMF0wYvtFXabOb0OdfBDOeRivuJ_Li2E2EhiKJbldZXM2Whc1sSEhDUanhtgZOjvRbcIgnWWRuLGhRR3OAZ3OIsR0qrX6BEPGHjoskEyg",
               "width" : 768
            }
         ],
         "place_id" : "ChIJ0U_mffCipBIR_Zgmgzbi5LM",
         "plus_code" : {
            "compound_code" : "95QF+7M Barcelona, Spain",
            "global_code" : "8FH495QF+7M"
         },
         "price_level" : 3,
         "rating" : 3.8,
         "reference" : "ChIJ0U_mffCipBIR_Zgmgzbi5LM",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 982,
         "vicinity" : "Carrer de les Jonqueres, 10, Barcelona"
      }
   ],
   "status" : "OK"
}

},{}],3:[function(require,module,exports){
module.exports={
   "html_attributions" : [],
   "result" : {
      "address_components" : [
         {
            "long_name" : "30",
            "short_name" : "30",
            "types" : [ "street_number" ]
         },
         {
            "long_name" : "Via Laietana",
            "short_name" : "Via Laietana",
            "types" : [ "route" ]
         },
         {
            "long_name" : "Barcelona",
            "short_name" : "Barcelona",
            "types" : [ "locality", "political" ]
         },
         {
            "long_name" : "Barcelona",
            "short_name" : "Barcelona",
            "types" : [ "administrative_area_level_2", "political" ]
         },
         {
            "long_name" : "Catalunya",
            "short_name" : "CT",
            "types" : [ "administrative_area_level_1", "political" ]
         },
         {
            "long_name" : "Spain",
            "short_name" : "ES",
            "types" : [ "country", "political" ]
         },
         {
            "long_name" : "08003",
            "short_name" : "08003",
            "types" : [ "postal_code" ]
         }
      ],
      "adr_address" : "\u003cspan class=\"street-address\"\u003eVia Laietana, 30\u003c/span\u003e, \u003cspan class=\"postal-code\"\u003e08003\u003c/span\u003e \u003cspan class=\"locality\"\u003eBarcelona\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eSpain\u003c/span\u003e",
      "formatted_address" : "Via Laietana, 30, 08003 Barcelona, Spain",
      "formatted_phone_number" : "932 95 79 00",
      "geometry" : {
         "location" : {
            "lat" : 41.3849852,
            "lng" : 2.1776613
         },
         "viewport" : {
            "northeast" : {
               "lat" : 41.3862778802915,
               "lng" : 2.178947430291502
            },
            "southwest" : {
               "lat" : 41.3835799197085,
               "lng" : 2.176249469708498
            }
         }
      },
      "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
      "id" : "bbe0956259061a38b3604e5e817321ccf4bc1825",
      "international_phone_number" : "+34 932 95 79 00",
      "name" : "Grand Hotel Central",
      "opening_hours" : {
         "open_now" : true,
         "periods" : [
            {
               "open" : {
                  "day" : 0,
                  "time" : "0000"
               }
            }
         ],
         "weekday_text" : [
            "Monday: Open 24 hours",
            "Tuesday: Open 24 hours",
            "Wednesday: Open 24 hours",
            "Thursday: Open 24 hours",
            "Friday: Open 24 hours",
            "Saturday: Open 24 hours",
            "Sunday: Open 24 hours"
         ]
      },
      "photos" : [
         {
            "height" : 1260,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAWpZq_QRfEn3hScrASrVa2Sg27twNH4EZWklaKIbk25qv7WJawXwBpf2pIeZ1OrP_i-IAJWDX1G3geN2EKytI9N95Jg_WIMcpQV2o8EJkWx_Ww6QNpkygdbtazRTBHxLEEhDVgURJq7hY1iXCYQ-y77YcGhTWyUdcZpCfftAWdoJPkf13-AFI3g",
            "width" : 960
         },
         {
            "height" : 1367,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAArmV6AiebrkU6q87u4vjvR90YyPLwAQA22zArXUyFm-BZ6Q25CB63u6wZL0V1h8Lhpl1Sb-M3dxuQKU1BmLHesqxwKk5zSdKkX5wSH9SQMQwitLskgGnzk__YxYUwMbV6EhDhu9nYakLZfq4n2WoG11f9GhS95vR9n99DQc7ufdlC8jsYeaUzjA",
            "width" : 2048
         },
         {
            "height" : 1536,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAVy4jk8Cd5jizMlJ3VnAOCBoxg7Ip2s_JbCuJUy_hcf5wwMYdzPFfhULG3-LOduuOwvRwGJTJhrD8n4dMKFAyNef5_O7F6-woi3aRwYU2m5gOnJ81X0zXJLeWH95aRXVxEhCxpYRWCrYItWzUCLHcT0zcGhT0djkY6zIPyrPRi8IFJJrlNJc5VQ",
            "width" : 2048
         },
         {
            "height" : 1367,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAryg7Ogc1MssEe1koZyUxKkIHHbPNNGYMc0RLKpOtTI3H9ahwnSjsklWKhe83OuBlJ0g5kSrEkaW5SPFI37PxmyFWRDI2PTNcqyMElPpxX7kof48sxpd1cSR-j7bIR2hXEhDqtUd7W1B9cZNIqLD5oK2yGhSGIAi4prq3HP6psyfd7xVdzLc8ng",
            "width" : 2048
         },
         {
            "height" : 3337,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAX7ibnGj9mz5la5gggH3OQUakYMPIxfYPa2TI1_7jq_oiP8100YQOZqVxUFDfH2O9gIG7jXm7hUwyv1BAbdd2NpsBgPVhpL6Tiq3jMR9gXaR7JyuXiOSfoI-UHTRl34qKEhBU4bHtNlzGF5KFgMBs7R30GhTIdQ9IR-cc7dEsZCpbUw0J4og8ZA",
            "width" : 5000
         },
         {
            "height" : 1367,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAHJJgDvSTh6ll_rj4igwhb43UdwTD8w2H4wJUaYQKjlDyfzKndIvWRjseEAFIsgEcoTSTPyASJH4ztQfpulbbdC1jAAeBZAUKNU_SNHL7YsMiiR3JTxAeqFfn9MDqTLaEEhBwebypdbDeGyAVtO6qyYc8GhTIHYjjeo3HFYOX2EIB8QJYLydrjg",
            "width" : 2048
         },
         {
            "height" : 4912,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAi8eCGd0xwJOcFtjujos-ImnrbvrpD_YweN5apt3eHau9xLMp9A_CwpNbiXZmBmh4h7E4vfEtvR_FgBHlIsvdUaHJP3wLkJxQhhnh1SWQKaBP7RvF3oHbtrofXNoEJXLHEhDkpLtd5ttLmJ0PtEBn_m7oGhTY0PNPHlI90xc-L7qPe41XQ2GrdA",
            "width" : 7360
         },
         {
            "height" : 4912,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAhTVUNYx6S9b6JTEdTTSaiMo_hoW316bnWOK-yrGl-CULxIt7AaiVNOHc3M9UtADLP3NqUDxB0Ro2nkzRCJTl_ospqoCbAXJipElLMRnzmBLFDJzj4xSJ9cAfh_q1Ko1SEhBb7t8_JxGaEnmKa01CIEHLGhTVheDJDNM3YqWkUrzvY4XXuvh0mA",
            "width" : 7360
         },
         {
            "height" : 1536,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAUQFaZT7jfBtNZUHISDFqHgWomjw2XffQU_q2J6fwYEJIRjEwEc4MH8q-7YMcyVRc9b-L3oiqzi0Hboj29aDlmIBtdnsFnHqCauJV_5i-3AaE5ncDkZqCQW4XPRbylA6kEhB6whal7vLHTXsPF_ZExS1IGhRuMoIJEwglz03OVeURL_K0ndqTfg",
            "width" : 2048
         },
         {
            "height" : 1536,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102819907393636019050\"\u003eGrand Hotel Central Barcelona\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAnbI6dBP556_XCTwPSQ0LpCYeKa0r_PCfm1FBJY7qHWcNKIJN7SxZ8-fV7vdj5myuNTvcrOBz9b0v1PWX6mLW8EM092V2igTxkFc-imbMjD0wOilmV-UQ_0yj857hifTzEhC6JeKL8zQHNJIagrs1HLC9GhTyqN34Yi8l34D9RQlsWlqaDBjL6g",
            "width" : 2048
         }
      ],
      "place_id" : "ChIJg1-2b_mipBIRirLgoXI-GXU",
      "plus_code" : {
         "compound_code" : "95MH+X3 Barcelona, Spain",
         "global_code" : "8FH495MH+X3"
      },
      "rating" : 4.5,
      "reference" : "ChIJg1-2b_mipBIRirLgoXI-GXU",
      "reviews" : [
         {
            "author_name" : "Nat Ryder",
            "author_url" : "https://www.google.com/maps/contrib/115584626446004939554/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh6.googleusercontent.com/-SEuum4lNHAg/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdH6WMLN7fs2xVNMKAWvFRP3zbfSQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "a month ago",
            "text" : "Had a fabulous stay at Grand Hotel Central. All staff were a pleasure to deal with, nothing was a problem, Marta in particular was exceptionally helpful. Excellent location, fabulous room and the perfect base for exploring Barcelona (We Love Barcelona). Rooftop pool and terrace the perfect place to wake up/take a dip in. See you all very soon. Nat Ryder",
            "time" : 1575466537
         },
         {
            "author_name" : "Michael Sanz",
            "author_url" : "https://www.google.com/maps/contrib/109064018350886780401/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh3.googleusercontent.com/a-/AAuE7mBpQwBR0_qAP6P6ShjJSpzrc_U32VEo-LQlEXs3Jg=s128-c0x00000000-cc-rp-mo-ba4",
            "rating" : 5,
            "relative_time_description" : "2 months ago",
            "text" : "We had a great stay here. \n\nThe check in process was easy and simple. Staff spoke multiple languages. \n\nThe hotel is extremely clean. All the staff were attentive. \n\nThe rooms were small but clean. Mini bar was included and simple for what we needed. \n\nRoof top pool was amazing! Infinity pool!! \n\nOverall we would recommend and stay here again!!",
            "time" : 1571166776
         },
         {
            "author_name" : "A Brown",
            "author_url" : "https://www.google.com/maps/contrib/111650934251297641776/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh4.googleusercontent.com/-paznhY_eA8o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf5ych5uoOattOuqsalzoVb_xNM4w/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "2 months ago",
            "text" : "Glad I happened upon this gem in Barcelona. Everything about my stay was perfect - from the room service to the room itself. Personal touches all around and the service from the staff was probably the best I’ve ever encountered. Also the location was convenient with a Starbucks in walking distance and restaurants all around. Would highly recommend this hotel to all.",
            "time" : 1571519997
         },
         {
            "author_name" : "Carlos Lopez",
            "author_url" : "https://www.google.com/maps/contrib/114489628425685201334/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh3.googleusercontent.com/a-/AAuE7mBTanCHPyxgCkoMWavJebZbiqiqTXp3fxv0I11dUw=s128-c0x00000000-cc-rp-mo-ba5",
            "rating" : 5,
            "relative_time_description" : "2 weeks ago",
            "text" : "Excellent hotel in a great location, walking distance to all the key attractions in the city but in a quiet area for peace and quiet at night. The hotel staff are incredibly attentive and kind. The breakfast was delicious, although the coffee is just Nespresso, if you're into that. Location was perfect to walk around and see the city.",
            "time" : 1576345400
         },
         {
            "author_name" : "Ann Pope",
            "author_url" : "https://www.google.com/maps/contrib/101384839006728760573/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh3.googleusercontent.com/a-/AAuE7mByef60D9W3Ei2kArXrTc6FDq5K_bG2dovBg8H90aM=s128-c0x00000000-cc-rp-mo-ba3",
            "rating" : 5,
            "relative_time_description" : "a month ago",
            "text" : "Great location. Very friendly staff. Rooms are spacious and very well-done. We enjoyed our stay here and would definitely book this hotel again if we return.",
            "time" : 1572962734
         }
      ],
      "scope" : "GOOGLE",
      "types" : [
         "spa",
         "travel_agency",
         "lodging",
         "bar",
         "restaurant",
         "food",
         "point_of_interest",
         "establishment"
      ],
      "url" : "https://maps.google.com/?cid=8437844038918386314",
      "user_ratings_total" : 823,
      "utc_offset" : 60,
      "vicinity" : "Via Laietana, 30, Barcelona",
      "website" : "http://www.grandhotelcentral.com/"
   },
   "status" : "OK"
}

},{}],4:[function(require,module,exports){
module.exports={
   "html_attributions" : [],
   "result" : {
      "address_components" : [
         {
            "long_name" : "1",
            "short_name" : "1",
            "types" : [ "street_number" ]
         },
         {
            "long_name" : "Plaça de Prim",
            "short_name" : "Plaça de Prim",
            "types" : [ "route" ]
         },
         {
            "long_name" : "Barcelona",
            "short_name" : "Barcelona",
            "types" : [ "locality", "political" ]
         },
         {
            "long_name" : "Barcelona",
            "short_name" : "Barcelona",
            "types" : [ "administrative_area_level_2", "political" ]
         },
         {
            "long_name" : "Catalunya",
            "short_name" : "CT",
            "types" : [ "administrative_area_level_1", "political" ]
         },
         {
            "long_name" : "Spain",
            "short_name" : "ES",
            "types" : [ "country", "political" ]
         },
         {
            "long_name" : "08005",
            "short_name" : "08005",
            "types" : [ "postal_code" ]
         }
      ],
      "adr_address" : "\u003cspan class=\"street-address\"\u003ePlaça de Prim, 1\u003c/span\u003e, \u003cspan class=\"postal-code\"\u003e08005\u003c/span\u003e \u003cspan class=\"locality\"\u003eBarcelona\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eSpain\u003c/span\u003e",
      "formatted_address" : "Plaça de Prim, 1, 08005 Barcelona, Spain",
      "formatted_phone_number" : "932 25 20 18",
      "geometry" : {
         "location" : {
            "lat" : 41.39960730000001,
            "lng" : 2.207009100000001
         },
         "viewport" : {
            "northeast" : {
               "lat" : 41.4008278302915,
               "lng" : 2.208261380291502
            },
            "southwest" : {
               "lat" : 41.39812986970851,
               "lng" : 2.205563419708498
            }
         }
      },
      "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id" : "7e004d0a5aa88a19f4f6d7807a82e683be566971",
      "international_phone_number" : "+34 932 25 20 18",
      "name" : "Els Pescadors",
      "opening_hours" : {
         "open_now" : false,
         "periods" : [
            {
               "close" : {
                  "day" : 0,
                  "time" : "1530"
               },
               "open" : {
                  "day" : 0,
                  "time" : "1300"
               }
            },
            {
               "close" : {
                  "day" : 0,
                  "time" : "2230"
               },
               "open" : {
                  "day" : 0,
                  "time" : "1945"
               }
            },
            {
               "close" : {
                  "day" : 1,
                  "time" : "1530"
               },
               "open" : {
                  "day" : 1,
                  "time" : "1300"
               }
            },
            {
               "close" : {
                  "day" : 1,
                  "time" : "2230"
               },
               "open" : {
                  "day" : 1,
                  "time" : "1945"
               }
            },
            {
               "close" : {
                  "day" : 2,
                  "time" : "1530"
               },
               "open" : {
                  "day" : 2,
                  "time" : "1300"
               }
            },
            {
               "close" : {
                  "day" : 2,
                  "time" : "2230"
               },
               "open" : {
                  "day" : 2,
                  "time" : "1945"
               }
            },
            {
               "close" : {
                  "day" : 3,
                  "time" : "1530"
               },
               "open" : {
                  "day" : 3,
                  "time" : "1300"
               }
            },
            {
               "close" : {
                  "day" : 3,
                  "time" : "2230"
               },
               "open" : {
                  "day" : 3,
                  "time" : "1945"
               }
            },
            {
               "close" : {
                  "day" : 4,
                  "time" : "1530"
               },
               "open" : {
                  "day" : 4,
                  "time" : "1300"
               }
            },
            {
               "close" : {
                  "day" : 4,
                  "time" : "2230"
               },
               "open" : {
                  "day" : 4,
                  "time" : "1945"
               }
            },
            {
               "close" : {
                  "day" : 5,
                  "time" : "1530"
               },
               "open" : {
                  "day" : 5,
                  "time" : "1300"
               }
            },
            {
               "close" : {
                  "day" : 5,
                  "time" : "2230"
               },
               "open" : {
                  "day" : 5,
                  "time" : "1945"
               }
            },
            {
               "close" : {
                  "day" : 6,
                  "time" : "1530"
               },
               "open" : {
                  "day" : 6,
                  "time" : "1300"
               }
            },
            {
               "close" : {
                  "day" : 6,
                  "time" : "2230"
               },
               "open" : {
                  "day" : 6,
                  "time" : "1945"
               }
            }
         ],
         "weekday_text" : [
            "Monday: 1:00 – 3:30 PM, 7:45 – 10:30 PM",
            "Tuesday: 1:00 – 3:30 PM, 7:45 – 10:30 PM",
            "Wednesday: 1:00 – 3:30 PM, 7:45 – 10:30 PM",
            "Thursday: 1:00 – 3:30 PM, 7:45 – 10:30 PM",
            "Friday: 1:00 – 3:30 PM, 7:45 – 10:30 PM",
            "Saturday: 1:00 – 3:30 PM, 7:45 – 10:30 PM",
            "Sunday: 1:00 – 3:30 PM, 7:45 – 10:30 PM"
         ]
      },
      "photos" : [
         {
            "height" : 1365,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/109919931297708389691\"\u003eEls Pescadors\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAd-RB2ciDpWBs38Y4tNLv-01o8PiaYwoyrW8VtSouliVJPuFn2Vnr4yY6MMlNMy1xUMU-yOt7TYxKoNVmteLMExWUUn7Y7MWhqljxmQ73sn_Hvrxl_2s2EYxVEZqYwvXkEhDXYOwfTtuMQSykBo32k4A2GhRYZoQilrX5huOnTFDe5f7S0_Nd5g",
            "width" : 2048
         },
         {
            "height" : 2268,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/114479609829154640783\"\u003eYannick Callebaut\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAns0oLbnnTPA4kYTKzPLYtSjKzRumUTwmmZMddckHHAgxRVI5R91VzNffbnjSjglW6sc_24wfNRTCar4itp_H0TbPuo9VTZaBkjXIoGZRSGRTpvGBa3EDJ6b0lg9S7WKgEhBkb8pUcXxP7uRsGgrCyHTmGhQ3bv-AE3sypE3Xgvr7knNXu2eU3w",
            "width" : 4032
         },
         {
            "height" : 1200,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/117511007243226519719\"\u003emagda santos\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAgreuUVsFo4DNITQ7uynSYmagb7G8sKioC50ehaZthHYyW49x4TEdSxaxWoWJvbanT4CLQxXmD0kph3EF9Mp9zWxz2J6Kojdiy3NHFPzPFzFjGTKzPEDX_ic8KtF3XHF3EhBQ9tVjQdGExwQcZcgpUZzfGhRpxcDjmVodt4Fn3M_W9P6vAUj6ZA",
            "width" : 1600
         },
         {
            "height" : 2988,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/108824393151146036569\"\u003eCarla Clemente Ribas\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAbNPmGrBrvFv0_jhAoNxWBBNODN16GnkWezddqixdVgk2Qr2dtbZ8muc5ttKOdcQ09pr76q7KFjhQ_SrKnds4gvDCilrnhQJLPrDfXm3AxmM2XYr3rgXa4gB5e1npTxcHEhDouWXADyDGLe9Txf7xwfOYGhRgFOr3R-ljcQPU4b_UF3N5LClHag",
            "width" : 5312
         },
         {
            "height" : 1600,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/109919931297708389691\"\u003eEls Pescadors\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAXtP_bshM3Ja-O5bfArBhzKdCPuDXa-OmGlb_llkgiKbiAlfVnL_0BYuVvvbtYM8WktB4T0shp7lhvLeXjZKhEtlt9FYhI_2CfuBfzH85L54qyLODn0GB-bE-KzLfYeqkEhCjugSXO-EJu7MglSj6HT69GhQwnU3cNYs7vM1Ldu_P9u6_CEltVg",
            "width" : 2400
         },
         {
            "height" : 1600,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/109919931297708389691\"\u003eEls Pescadors\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAd7yoSbjeQOf1IEjVJj51aquDeZwgAbGrFm0zICIgbutIjsY_ak-f3QWmgHvkCg4oHHfpQjP92DGfFn50mGnLhb4cXsreqbGuKdS4vkqcEZ2inEuZJQiwUbo_qmTLlHmdEhAdlpSGEJjSaZ8-uXoGv-0VGhS-5KjPoDTlxzW-fknTx0buCnklfA",
            "width" : 2400
         },
         {
            "height" : 3840,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/109919931297708389691\"\u003eEls Pescadors\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAa4aGtlgCXK7KuHtRg0G14ECNk0lbYCMoSCD1f3GZGmjMQP-gASPqZq_CUjw8E2tLqZYmax4Euv-HCGB9kQNbFA_EenvwaCn0v6mJJJ-qJFuEWfJxPvg8F3hWSU4X19ilEhDnhxukGiqEI4glweF7hiokGhT50MuUYkMPFWwuCT72jZ9-ahVHNw",
            "width" : 5760
         },
         {
            "height" : 768,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/111185455996447323495\"\u003eThe BozaProject\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAWeeLsMXU5YpdD0gUw4a9zfQI-_q1zIndRIV00oaHkQpPTOSHOe0nfTyV6V8XyynO4OqG2PSd9Mdvfw09J9M-p3Q9Zu7FcDDL3pq4A3rmzCXpTo0bbnIgLI84sa4ePRNdEhBgWFZuPYVbqtEoBs_OJcKaGhT9TYDair6PWe1xS2lK7fgBi4I0rg",
            "width" : 1024
         },
         {
            "height" : 2208,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/102564396855913424492\"\u003eBàrbara Gelabert\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAAjBihzB0u1dy7qQ-jLsO4Pvxv0VEs1WDB1Wvk5MSFR7lsRQ7pj3xWn88jaAItGNSlhuBw3lb-afOCkxTB9Sh3K_INXSafvUppRb9rVZTQJFiDOpk8eHBvoTGDYbdcwzrsEhAeWCPMrnq4FS8RmheMeQihGhQ0zTudbjVKMBGa13QVlX47B-MN8A",
            "width" : 3920
         },
         {
            "height" : 3648,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/106224198383708711772\"\u003echilledmunki\u003c/a\u003e"
            ],
            "photo_reference" : "CmRaAAAA6y1KgEPHKRqQq0STgw652FKwLTW5kVRobYmkTs-uHyVwjGwzP2ftPXQ_v4h_m1RUpctKT0Qm5ekW6ZYFi75YtnS9EHnw8MVF5aS-NN3gFHIejx3KxFBRkLtAJXvf6wCVEhDGX9TV4ySIcE_pFjVW10B9GhSDDQiMMiju7_DvvX89hbqeoNVEHA",
            "width" : 2736
         }
      ],
      "place_id" : "ChIJ3c6OY2qjpBIRCvhSGaokarE",
      "plus_code" : {
         "compound_code" : "96X4+RR Barcelona, Spain",
         "global_code" : "8FH496X4+RR"
      },
      "price_level" : 4,
      "rating" : 4,
      "reference" : "ChIJ3c6OY2qjpBIRCvhSGaokarE",
      "reviews" : [
         {
            "author_name" : "Michael Robertson",
            "author_url" : "https://www.google.com/maps/contrib/107659306204524445554/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh4.ggpht.com/-q17ZKH_gd68/AAAAAAAAAAI/AAAAAAAAAAA/fA98vcT6KOg/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "3 months ago",
            "text" : "We traveled a good distance from our hotel to go to this restaurant. We were fortunate to experience the square and restaurant during a thunderstorm and heavy rain. The staff were friendly and attentive. The food was exceptional. My parents really enjoyed the presentation and serving style and loved the flavours and fish. I recommend you try.",
            "time" : 1570186869
         },
         {
            "author_name" : "chilledmunki",
            "author_url" : "https://www.google.com/maps/contrib/106224198383708711772/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh3.ggpht.com/-Ayp2hNeCK0U/AAAAAAAAAAI/AAAAAAAAAAA/QB3ZRlc48WE/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "2 months ago",
            "text" : "Located in a quiet courtyard, with the trees draping over the restaurant.\n\nThe service is great, the chef comes out with a cart showing you the fresh seafood and recommendations for the day.\n\nThe main event is the fish, that is what they are known for. The plating is beautiful arranged just like a fish and compliments well with the caramelised onions and fried potatoes.",
            "time" : 1570519746
         },
         {
            "author_name" : "Christopher Wade",
            "author_url" : "https://www.google.com/maps/contrib/116583655019144998578/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh5.ggpht.com/-fvQeHpxI5Os/AAAAAAAAAAI/AAAAAAAAAAA/xxP0_quevNI/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "a month ago",
            "text" : "Over the years I have brought many people to this restaurant and without fail it continues to impress and deliver. A wonderfully knowledgeable seafood restaurant that delivers seasonable produce in classic Catalan style...",
            "time" : 1573002529
         },
         {
            "author_name" : "Didier Unglik",
            "author_url" : "https://www.google.com/maps/contrib/111146194178688735418/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh5.ggpht.com/-cvJ_hyiTd4E/AAAAAAAAAAI/AAAAAAAAAAA/DspZ_h1JB2w/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "3 months ago",
            "text" : "One of the best restaurant in Barcelona. All is very good and the service  makes you happy. A must go !",
            "time" : 1569005876
         },
         {
            "author_name" : "A Codes",
            "author_url" : "https://www.google.com/maps/contrib/101256267349827014982/reviews",
            "language" : "en",
            "profile_photo_url" : "https://lh4.ggpht.com/-vYVuQIiUQoE/AAAAAAAAAAI/AAAAAAAAAAA/7kfULyE2b7U/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
            "rating" : 5,
            "relative_time_description" : "2 months ago",
            "text" : "Great menu options from starters to desserts. On the pricey side but definitely worth going. Location, ambiance and service all are top notch! Will be coming back.",
            "time" : 1572358461
         }
      ],
      "scope" : "GOOGLE",
      "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
      "url" : "https://maps.google.com/?cid=12784070805232482314",
      "user_ratings_total" : 851,
      "utc_offset" : 60,
      "vicinity" : "Plaça de Prim, 1, Barcelona",
      "website" : "http://www.elspescadors.com/"
   },
   "status" : "OK"
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _response_category = require('../../response_category.json');

var _response_category2 = _interopRequireDefault(_response_category);

var _response_details_els_pescador = require('../../response_details_els_pescador.json');

var _response_details_els_pescador2 = _interopRequireDefault(_response_details_els_pescador);

var _response_details_Grand_Hotel_Central = require('../../response_details_Grand_Hotel_Central.json');

var _response_details_Grand_Hotel_Central2 = _interopRequireDefault(_response_details_Grand_Hotel_Central);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlaceController = function () {
    function PlaceController(_ref) {
        var element = _ref.element,
            submitBtn = _ref.submitBtn,
            inputQuery = _ref.inputQuery,
            containerCard = _ref.containerCard,
            containerCardTitle = _ref.containerCardTitle,
            placeCategoriesView = _ref.placeCategoriesView,
            PlaceModel = _ref.PlaceModel;

        _classCallCheck(this, PlaceController);

        this._element = element;
        this._submitBtn = submitBtn;
        this._inputQuery = inputQuery;
        this._container = containerCard;
        this._containerTitle = containerCardTitle;
        this._placeCategoriesView = placeCategoriesView;
        this._placeModel = PlaceModel;
    }

    _createClass(PlaceController, [{
        key: 'initEvents',
        value: function initEvents() {
            var _this = this;

            this._container.addEventListener('click', function (event) {
                var namePlace = event.target;
                switch (namePlace.className) {
                    case "name-place":
                        _this._containerTitle.innerHTML = "Place details";
                        var placeIdSelected = namePlace.getAttribute('id-place');
                        console.log("Place ID selected: " + placeIdSelected);
                        _this._placeModel.getPlaceDetails({ placeId: placeIdSelected, callback: _this._placeCategoriesView.paintPlaceDetailsCard });
                        break;
                    case "test-paint-category-cards":
                        _this._containerTitle.innerHTML = "Places";
                        console.log("Test modo: paint-> restaurant category");
                        _this._placeCategoriesView.paintPlaceCards(_response_category2.default.results);
                        break;
                    case "test-paint-details-card":
                        _this._containerTitle.innerHTML = "Place details";
                        var detailsTest = namePlace.id == "restaurant" ? _response_details_els_pescador2.default : _response_details_Grand_Hotel_Central2.default;
                        console.log("Test modo: paint-> " + namePlace.id);
                        _this._placeCategoriesView.paintPlaceDetailsCard(detailsTest.result);
                        break;
                }
            });
            this._element.addEventListener('click', function (event) {
                _this._containerTitle.innerHTML = "Places";
                var placeSelect = event.target.getAttribute('category-id');
                console.log("Category selected: " + placeSelect);
                _this._placeModel.getPlaceByCategory({ type: [placeSelect], callback: _this._placeCategoriesView.paintPlaceCards });
            });

            this._submitBtn.addEventListener('click', function (event) {
                event.preventDefault();
                var queryInput = _this._inputQuery.value;
                console.log("Search query: " + queryInput);
                if (queryInput !== "") {
                    _this._placeModel.getFindingPlace({ findPlace: queryInput, callback: _this._placeCategoriesView.paintPlaceCards });
                }
            });
        }
    }]);

    return PlaceController;
}();

exports.default = PlaceController;

},{"../../response_category.json":2,"../../response_details_Grand_Hotel_Central.json":3,"../../response_details_els_pescador.json":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('../utils/request');

var _googleMaps = require('google-maps');

var _googleMaps2 = _interopRequireDefault(_googleMaps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _GoogleMapsLoader = _googleMaps2.default;
// _GoogleMapsLoader.KEY = 'AIzaSyC9rizUY6WA1kOqUatAquVwnDPiQon__PE';   //!Cuenta en jcocaharo@hotmail.com
_GoogleMapsLoader.KEY = 'AIzaSyCz6T-LfOdTwU3FDzza1w03Ws5cdotqI5o'; //!Cuenta en dayanxd@hotmail.com
_GoogleMapsLoader.LIBRARIES = ['places'];
_GoogleMapsLoader.VERSION = "3.37";
var BARCELONA = { lat: 41.390205, lng: 2.154007 };
var mapContainer = document.querySelector("#map");

var PlaceModel = {
    _GoogleMapsLoader: _GoogleMapsLoader,
    BARCELONA: BARCELONA,
    mapContainer: mapContainer,
    getPlaceByCategory: function getPlaceByCategory(_ref) {
        var _ref$radius = _ref.radius,
            radius = _ref$radius === undefined ? '15000' : _ref$radius,
            _ref$type = _ref.type,
            type = _ref$type === undefined ? ['restaurant'] : _ref$type,
            callback = _ref.callback;

        _GoogleMapsLoader.load(function () {
            var service = (0, _request.serviceGoogleMaps)(mapContainer, BARCELONA);
            var request = {
                location: BARCELONA,
                radius: radius,
                type: type
            };
            service.nearbySearch(request, function (results, status) {
                (0, _request.requestCallback)(results, status, callback);
            });
        });
    },
    getFindingPlace: function getFindingPlace(_ref2) {
        var _ref2$radius = _ref2.radius,
            radius = _ref2$radius === undefined ? '15000' : _ref2$radius,
            findPlace = _ref2.findPlace,
            callback = _ref2.callback;

        _GoogleMapsLoader.load(function () {
            var service = (0, _request.serviceGoogleMaps)(mapContainer, BARCELONA);
            var request = {
                location: BARCELONA,
                radius: radius,
                query: findPlace
            };
            service.textSearch(request, function (results, status) {
                (0, _request.requestCallback)(results, status, callback);
            });
        });
    },
    getPlaceDetails: function getPlaceDetails(_ref3) {
        var placeId = _ref3.placeId,
            callback = _ref3.callback;

        _GoogleMapsLoader.load(function () {
            var service = (0, _request.serviceGoogleMaps)(mapContainer, BARCELONA);
            var request = {
                placeId: placeId
            };
            service.getDetails(request, function (results, status) {
                (0, _request.requestCallback)(results, status, callback);
            });
        });
    }
};

exports.default = PlaceModel;

},{"../utils/request":8,"google-maps":1}],7:[function(require,module,exports){
'use strict';

var _PlaceCategoriesView = require('./views/PlaceCategoriesView');

var _PlaceCategoriesView2 = _interopRequireDefault(_PlaceCategoriesView);

var _PlaceController = require('./controllers/PlaceController');

var _PlaceController2 = _interopRequireDefault(_PlaceController);

var _PlaceModel = require('./models/PlaceModel');

var _PlaceModel2 = _interopRequireDefault(_PlaceModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var categories = document.querySelector(".list-group");
var containerCard = document.querySelector('.categories-container');
var containerCardTitle = document.querySelector('#container-card-title');
var placeCategoriesView = new _PlaceCategoriesView2.default({ container: containerCard });

var submitBtn = document.querySelector('input[type="submit"]');
var inputQuery = document.querySelector('input[name="query"]');

var placeController = new _PlaceController2.default({
    element: categories,
    containerCard: containerCard,
    containerCardTitle: containerCardTitle,
    inputQuery: inputQuery,
    submitBtn: submitBtn,
    placeCategoriesView: placeCategoriesView,
    PlaceModel: _PlaceModel2.default
});

placeController.initEvents();

},{"./controllers/PlaceController":5,"./models/PlaceModel":6,"./views/PlaceCategoriesView":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestCallback = requestCallback;
exports.serviceGoogleMaps = serviceGoogleMaps;
function requestCallback(results, status) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;

    if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(results);
    } else {
        var containerCard = document.querySelector('.categories-container');
        var statusErrorContainerMessage = '\n            <div class="error-status">\n                <span class="text-danger">' + status + '</span><br>\n                <a href="#" class="test-paint-category-cards">Paint restaurant category cards (test)</a><br>\n                <a href="#" class="test-paint-details-card" id="restaurant">Paint details "Els pescador" card (test)</a><br>\n                <a href="#" class="test-paint-details-card" id="hotel">Paint details "Grand Hotel Central" card (test)</a><br>\n            </div>\n        ';
        containerCard.innerHTML = statusErrorContainerMessage;
    }
};

function serviceGoogleMaps(container, city) {
    var _map = new google.maps.Map(container, { center: city, zoom: 15 });
    var service = new google.maps.places.PlacesService(_map);
    return service;
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PlaceCategoriesView = function PlaceCategoriesView(_ref) {
    var container = _ref.container;

    var _container = container;

    var paintPlaceCards = function paintPlaceCards(JSONData) {
        var placeCards = "";
        var numberCards = JSONData.length > 6 ? 6 : JSONData.length;
        for (var i = 0; i < numberCards; i++) {
            var infoAdress = typeof JSONData[i]["vicinity"] == "undefined" ? JSONData[i]["formatted_address"] : JSONData[i]["vicinity"];
            var photoPlace = typeof JSONData[i]["photos"][0].getUrl == "undefined" ? "http://placehold.it/700x400" : JSONData[i]["photos"][0].getUrl();
            var cardHTML = "\n            <div class=\"col-lg-4 col-md-6 mb-4\">\n                <div class=\"card h-100\">\n                <a href=\"#\"><img class=\"card-img-top\" src=\"" + photoPlace + "\" alt=\"\"></a>\n                <div class=\"card-body\">\n                    <h4 class=\"card-title\">\n                    <a href=\"#\" class=\"name-place\" id-place=\"" + JSONData[i]["place_id"] + "\">" + JSONData[i]["name"] + "</a>\n                    </h4>\n                    <p><strong>" + infoAdress + "</strong></p>\n                </div>\n                <div class=\"card-footer\">\n                    <small class=\"text-warning\">" + _putStar(JSONData[i]["rating"]) + "</small>\n                </div>\n                </div>\n            </div>";
            placeCards += cardHTML;
        };
        _container.innerHTML = placeCards;
    };

    var paintPlaceDetailsCard = function paintPlaceDetailsCard(JSONData) {
        var infoAdress = typeof JSONData["vicinity"] == "undefined" ? JSONData["formatted_address"] : JSONData["vicinity"];
        var infoNumber = typeof JSONData["formatted_phone_number"] == "undefined" ? "" : "<li>" + JSONData["formatted_phone_number"] + "</li>";
        var infoHorary = typeof JSONData["opening_hours"] == "undefined" ? "" : _putHorary(JSONData["opening_hours"]);
        var infoWebsite = typeof JSONData["website"] == "undefined" ? "" : "<li><a href=\"" + JSONData["website"] + "\" target=\"_blank\">Website</a></li>";
        var photoPlace = typeof JSONData["photos"][0].getUrl == "undefined" ? "http://placehold.it/900x400" : JSONData["photos"][0].getUrl();
        var cardHTLM = "\n        <div class=\"card mt-4\">\n            <img class=\"card-img-top img-fluid\" src=\"" + photoPlace + "\" alt=\"\">\n            <div class=\"card-body\">\n                <div>\n                <h3 class=\"card-title\">" + JSONData["name"] + "</h3>\n                <span class=\"text-warning\" style=\"float:right;\">" + _putStar(JSONData["rating"]) + "</span>\n                </div>\n                <p><strong>" + infoAdress + "</strong></p>\n                <ul>\n                " + infoNumber + infoHorary + infoWebsite + "\n                </ul>\n            </div>\n        </div>";
        _container.innerHTML = cardHTLM;
        if (typeof JSONData["reviews"] != "undefined") {
            var _reviewCard = document.createElement("div");
            _reviewCard.className = "card card-outline-secondary my-4";
            _container.appendChild(_reviewCard);
            _reviewCard.innerHTML = "\n                <div class=\"card-header\">\n                Place Reviews\n                </div>\n                <div class=\"card-body\" id=\"container-reviews\">\n                </div>";
            var _reviewContainer = document.querySelector("#container-reviews");
            _paintReviewCards(JSONData["reviews"], _reviewContainer);
        }
    };

    var _paintReviewCards = function _paintReviewCards(ArrayData, container) {
        var reviewCards = "";
        var numberReviews = ArrayData.length > 10 ? 10 : ArrayData.length;
        for (var i = 0; i < numberReviews; i++) {
            var cardHTML = "\n            <span class=\"text-warning\">" + _putStar(ArrayData[i]["rating"]) + "</span>" + ArrayData[i]["rating"] + " stars\n            <p>" + ArrayData[i]["text"] + "</p>\n            <small class=\"text-muted\">Posted by " + ArrayData[i]["author_name"] + " on " + ArrayData[i]["relative_time_description"] + "</small>\n            <hr>";
            reviewCards += cardHTML;
        };
        container.innerHTML = reviewCards;
    };
    var _putStar = function _putStar(rating) {
        var fullStar = "&#9733; ";
        var emptyStar = "&#9734; ";
        return fullStar.repeat(parseInt(rating)) + emptyStar.repeat(5 - parseInt(rating));
    };
    var _putHorary = function _putHorary(JSONOpeningHours) {
        var horary = "";
        var dateNow = new Date();
        var dayNow = dateNow.getDay() - 1;
        dayNow = dayNow == -1 ? 6 : dayNow;
        var isOpen = typeof JSONOpeningHours["open_now"] == "undefined" ? "" : JSONOpeningHours["open_now"] ? "<span class=\"text-success\">Now : Open</span>" : "<span class=\"text-danger\">Now : Close</span>";
        var isWeekday_text = typeof JSONOpeningHours["weekday_text"] == "undefined" ? [] : JSONOpeningHours["weekday_text"];
        var selectOpenDay = "";
        for (var i = 0; i < isWeekday_text.length; i++) {
            var selectOptionDay = dayNow == i ? "selected" : "";
            var opt = "<option " + selectOptionDay + ">" + isWeekday_text[i] + "</option>";
            selectOpenDay += opt;
        };
        if (selectOpenDay != "") {
            selectOpenDay = "<select>" + selectOpenDay + "</select>";
        }
        if (isOpen != "" || selectOpenDay != "") {
            horary = "<li>" + isOpen + " " + selectOpenDay + " </li>";
        }
        return horary;
    };
    return {
        paintPlaceCards: paintPlaceCards,
        paintPlaceDetailsCard: paintPlaceDetailsCard
    };
};

exports.default = PlaceCategoriesView;

},{}]},{},[7]);
