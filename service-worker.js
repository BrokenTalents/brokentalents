"use strict";var precacheConfig=[["dist/assets/TalentGrab.jpg","3e361406f2124104228af4794e7dd2e0"],["dist/assets/TalentGrab_square.jpg","597eeab3c4b12e97364ef60ef32fa503"],["dist/assets/backend-flow.png","61db84489bb0f929df8220a9378e3a59"],["dist/assets/gwenbarf.png","1d290fd6aeddde8d1fb5fa3855b9fa84"],["dist/assets/hero-icons/adagio.png","131c5e486d6d81517027e21ddec40127"],["dist/assets/hero-icons/alpha.png","fa128901768496e402442cbf2b7e2d94"],["dist/assets/hero-icons/ardan.png","cd70fc1ff1c1fbff8784c1232ee2418a"],["dist/assets/hero-icons/baptiste.png","3520271a42310f3e20f8e3e928de0ba1"],["dist/assets/hero-icons/baron.png","1a46c156c60bbf69c1454e8c72f8291c"],["dist/assets/hero-icons/blackfeather.png","b06d0767f4a488b86fdf383d9d9f06a1"],["dist/assets/hero-icons/catherine.png","950d4854798a710a7381a412bcdfc0a2"],["dist/assets/hero-icons/celeste.png","0527e2a80b6488fa6331c41807970346"],["dist/assets/hero-icons/churnwalker.png","cbad33bd8158f785cdff89388ac96cc5"],["dist/assets/hero-icons/flicker.png","918809ed83162cee7eab40ad0ddd529f"],["dist/assets/hero-icons/fortress.png","8ea1966760c5935a0d323cdec46e3f60"],["dist/assets/hero-icons/glaive.png","feb1376cba6dd4612c927778c119b7e1"],["dist/assets/hero-icons/grace.png","e3d5e888a46ac1f8d59b2be1ac4d9e03"],["dist/assets/hero-icons/grumpjaw.png","d270e55e037b2e9c4db13daed0ebdc27"],["dist/assets/hero-icons/gwen.png","9b1f6451da6024ed410f176a897d283f"],["dist/assets/hero-icons/idris.png","4991af1ff4ab6286edc1fe471fe1a283"],["dist/assets/hero-icons/joule.png","9e3e83ecc43aa59484aa3089198bd490"],["dist/assets/hero-icons/kensei.png","67b780446d55f5078daa93e64987e504"],["dist/assets/hero-icons/kestrel.png","9225c2888ccc5fb8248b572b61d2d816"],["dist/assets/hero-icons/koshka.png","c0768a4d8df649e84b23fc05de864a61"],["dist/assets/hero-icons/krul.png","3b001c9b9532fd330c7271077173e843"],["dist/assets/hero-icons/lance.png","fa018ba2737905dbe3ce57a05c2ea58f"],["dist/assets/hero-icons/lorelai.png","0f2f0a2c3892c9283018f799da4fcfc5"],["dist/assets/hero-icons/lyra.png","2414d8449802f123b9d78f00081140ae"],["dist/assets/hero-icons/malene.png","4a8d53380c836e0e97ba8eb680ea856c"],["dist/assets/hero-icons/ozo.png","cf8853364fb0f815b2a593f7dbd00f08"],["dist/assets/hero-icons/petal.png","6094cdb36d5c5723ac82960cabacf41b"],["dist/assets/hero-icons/phinn.png","eb27b2d232dfdcca7f49cc2db8e677ce"],["dist/assets/hero-icons/reim.png","8718110b65c4d45dc903456adbbbe238"],["dist/assets/hero-icons/reza.png","9477d58cd2435714a51070c4c18c2654"],["dist/assets/hero-icons/ringo.png","e18b8241ecf13fa412b92d194bb346d1"],["dist/assets/hero-icons/rona.png","6b2402811c935973d38735a15b343374"],["dist/assets/hero-icons/samuel.png","2de92a204967debe71291049a3204079"],["dist/assets/hero-icons/saw.png","f541576f1b572c064162410bcff979d1"],["dist/assets/hero-icons/skaarf.png","618fd866d01cc1eca063b0283a5019e9"],["dist/assets/hero-icons/skye.png","f899c92f57a61f5d105d95f727560455"],["dist/assets/hero-icons/taka.png","dc165f00ef9bd7eae339750c4b3ae17a"],["dist/assets/hero-icons/tony.png","8f90e3ce049aa7f81c3ef747f55f006c"],["dist/assets/hero-icons/varya.png","0c19029771a2452ee1f4803e0ad7c1b4"],["dist/assets/hero-icons/vox.png","0f1d2dc937f0d758774e00c92dd61d44"],["dist/assets/talent-icons-small/Adagio/Adagio_Epic.png","8e79c376e64310fd48c3fb837fab3401"],["dist/assets/talent-icons-small/Adagio/Adagio_Legendary.png","868ccb2868d871c6f80ef3783ba153e7"],["dist/assets/talent-icons-small/Adagio/Adagio_Rare.png","226f451f08a7b30905e5b384ac6b19ee"],["dist/assets/talent-icons-small/Alpha/Alpha_Epic.png","689e588261d988a037c6efac4a284028"],["dist/assets/talent-icons-small/Alpha/Alpha_Legendary.png","59f24cb81642d04891727dab6f4b4ea3"],["dist/assets/talent-icons-small/Alpha/Alpha_Rare.png","ab62b100f04c7cb35c178e39a8f910e4"],["dist/assets/talent-icons-small/Ardan/Ardan_Epic.png","0b99fa19d3253014d2eb672f0ec2ee91"],["dist/assets/talent-icons-small/Ardan/Ardan_Legendary.png","da299d8b74d5ae258b54ed55d056fd59"],["dist/assets/talent-icons-small/Ardan/Ardan_Rare.png","a3dc8d3b83e940f513920ee1bf139337"],["dist/assets/talent-icons-small/Baptiste/Baptiste_Epic.png","f47be4e1b44737a1a7e38ecc70a0dbb1"],["dist/assets/talent-icons-small/Baptiste/Baptiste_Legendary.png","25da0854343566613da974bf54bacbf0"],["dist/assets/talent-icons-small/Baptiste/Baptiste_Rare.png","b21467c6fa5cb797025e7f942e147c2d"],["dist/assets/talent-icons-small/Baron/Baron_Epic.png","df65bc8379486ef50db6c90e9cce8c30"],["dist/assets/talent-icons-small/Baron/Baron_Legendary.png","3fd7beca47054965098ed78870dd8b66"],["dist/assets/talent-icons-small/Baron/Baron_Rare.png","bd8911bf5b0833c0e070fe7a2107cc12"],["dist/assets/talent-icons-small/Blackfeather/Blackfeather_Epic.png","7e6818a86cf96aac02f44449dd4eaf7e"],["dist/assets/talent-icons-small/Blackfeather/Blackfeather_Legendary.png","878625d74ac571fdc8622499035d977d"],["dist/assets/talent-icons-small/Blackfeather/Blackfeather_Rare.png","3f89dd2e878f4b9af38588084ae040b0"],["dist/assets/talent-icons-small/Catherine/Catherine_Epic.png","c237d2d4bbc46efd644b8309bbf3e0e2"],["dist/assets/talent-icons-small/Catherine/Catherine_Legendary.png","646df36e03a9c84285c81b142a8735fd"],["dist/assets/talent-icons-small/Catherine/Catherine_Rare.png","5ecc5a9c638d52cc8fd5995f05be5308"],["dist/assets/talent-icons-small/Celeste/Celeste_Epic.png","766d526df7aeac98f2fe3461fcbc58fd"],["dist/assets/talent-icons-small/Celeste/Celeste_Legendary.png","f3a5cdae9d26d0f83e8a973e22928479"],["dist/assets/talent-icons-small/Celeste/Celeste_Rare.png","f9126da780789ef35856dea827f89386"],["dist/assets/talent-icons-small/Churnwalker/Churnwalker_Epic.png","8b8d4c627109f6ece565280f9739bbc3"],["dist/assets/talent-icons-small/Churnwalker/Churnwalker_Legendary.png","0c249644f1aca430445f89b1a1e41f16"],["dist/assets/talent-icons-small/Churnwalker/Churnwalker_Rare.png","e2e912ce71f1ac971cb509396cea9007"],["dist/assets/talent-icons-small/Flicker/Flicker_Epic.png","3d149bf825f645080bda33568b78fc86"],["dist/assets/talent-icons-small/Flicker/Flicker_Legendary.png","a56419a45eb43bed1e5cc59c019e87dd"],["dist/assets/talent-icons-small/Flicker/Flicker_Rare.png","7949d25a2fc54b0767588f35ac811ec1"],["dist/assets/talent-icons-small/Fortress/Fortress_Epic.png","eb78815e6873e35220656422b8f42f2b"],["dist/assets/talent-icons-small/Fortress/Fortress_Legendary.png","e5c3278072f3b7c6d5b2efe461ca910b"],["dist/assets/talent-icons-small/Fortress/Fortress_Rare.png","44cf6e22e0676b91c740683c11d2eb23"],["dist/assets/talent-icons-small/Glaive/Glaive_Epic.png","0ec931f064c2ca462d2c779f9f42097d"],["dist/assets/talent-icons-small/Glaive/Glaive_Legendary.png","899c337824b83fcda27159a759cacbf4"],["dist/assets/talent-icons-small/Glaive/Glaive_Rare.png","1f61dbab6497e0ea44237995d570f36c"],["dist/assets/talent-icons-small/Grace/Grace_Epic.png","f4d6f027e7eb8866810b4e82923b3dd7"],["dist/assets/talent-icons-small/Grace/Grace_Legendary.png","a170331da7b2e143bee25f9d6a257bf2"],["dist/assets/talent-icons-small/Grace/Grace_Rare.png","fdf02ed030c60d0067cff18a8b2fc4e5"],["dist/assets/talent-icons-small/Grumpjaw/Grumpjaw_Epic.png","ae38e9935a7521b1f63f615aab859078"],["dist/assets/talent-icons-small/Grumpjaw/Grumpjaw_Legendary.png","c46dd8a7c9f969d76749137bda65c378"],["dist/assets/talent-icons-small/Grumpjaw/Grumpjaw_Rare.png","a56d2e8140c6552443e1b58a29ea9980"],["dist/assets/talent-icons-small/Gwen/Gwen_Epic.png","45c8fe9fbd9135421f68a07ddd01cc57"],["dist/assets/talent-icons-small/Gwen/Gwen_Legendary.png","04f1d648656b54fac2796c7a44dddb61"],["dist/assets/talent-icons-small/Gwen/Gwen_Rare.png","251b6bed5756c06061fb75c95ea53bed"],["dist/assets/talent-icons-small/Idris/Idris_Epic.png","b5b1bba7f30d84f105e22364420d3d55"],["dist/assets/talent-icons-small/Idris/Idris_Legendary.png","aeb4af66347f97c886b43674f0ec6047"],["dist/assets/talent-icons-small/Idris/Idris_Rare.png","b0e4be2b9f0f9d585e160a66d0770af1"],["dist/assets/talent-icons-small/Joule/Joule_Epic.png","d09fffe2f478f3ff571899429a1b1d84"],["dist/assets/talent-icons-small/Joule/Joule_Legendary.png","da47004a190d812a962513f4143cd315"],["dist/assets/talent-icons-small/Joule/Joule_Rare.png","fe7f40da34e0dca25f6c90e49cbc0e2e"],["dist/assets/talent-icons-small/Kensei/Kensei_Epic.png","55fc5673572271d6caef441fe1c83095"],["dist/assets/talent-icons-small/Kensei/Kensei_Legendary.png","9bc23f8662c16e0aedf57235e88a3557"],["dist/assets/talent-icons-small/Kensei/Kensei_Rare.png","73ba0af1ca2695673006bb7d47e7395b"],["dist/assets/talent-icons-small/Kestrel/Kestrel_Epic.png","e47467bd69c356a6c4ec81a0e33b3670"],["dist/assets/talent-icons-small/Kestrel/Kestrel_Legendary.png","cbdb9124e31d1c06d8b25897880b6f33"],["dist/assets/talent-icons-small/Kestrel/Kestrel_Rare.png","7b2b87144b321ef4b31fc1138fac8546"],["dist/assets/talent-icons-small/Koshka/Koshka_Epic.png","8adcc9cd492584e6ad98771d1d1fe29a"],["dist/assets/talent-icons-small/Koshka/Koshka_Legendary.png","42624b7a69215c76878c3b0bf10dfcbd"],["dist/assets/talent-icons-small/Koshka/Koshka_Rare.png","881a02f2b04c274c0d976ca090a9bdf4"],["dist/assets/talent-icons-small/Krul/Krul_Epic.png","e3d60566b7697b6e5f52b1c4e950d20c"],["dist/assets/talent-icons-small/Krul/Krul_Legendary.png","c4d64552226af16dd0e100393dce49d1"],["dist/assets/talent-icons-small/Krul/Krul_Rare.png","fd2ba85266d31f4f0179d3aeaf319ecf"],["dist/assets/talent-icons-small/Lance/Lance_Epic.png","b206eb2dfba21bc1231b00ab15c4cb30"],["dist/assets/talent-icons-small/Lance/Lance_Legendary.png","2cb63c017aa845dfad0e299c2135c3c5"],["dist/assets/talent-icons-small/Lance/Lance_Rare.png","7959622073f4ec4366fb37771a91d094"],["dist/assets/talent-icons-small/Lorelai/Lorelai_Epic.png","f940074f62075e262fccb9256537ab51"],["dist/assets/talent-icons-small/Lorelai/Lorelai_Legendary.png","8c271b412141aa9fa51415aa849bb00f"],["dist/assets/talent-icons-small/Lorelai/Lorelai_Rare.png","7909c6ae2a69a70eb6b9dcdfea4d38b0"],["dist/assets/talent-icons-small/Lyra/Lyra_Epic.png","cddcd73968476674bb77145260f2ef4a"],["dist/assets/talent-icons-small/Lyra/Lyra_Legendary.png","a4b263e0ed46f21705d5e7eb152f4461"],["dist/assets/talent-icons-small/Lyra/Lyra_Rare.png","65fe95514e98b15e5da992565d603bb4"],["dist/assets/talent-icons-small/Malene/Malene_Epic.png","ef778396320db4784d218cd6fbd677bd"],["dist/assets/talent-icons-small/Malene/Malene_Legendary.png","bc21f33eb31ff801d3c84e79a4c36027"],["dist/assets/talent-icons-small/Malene/Malene_Rare.png","36c31ecf59e39b6af0dc08133cd11bf3"],["dist/assets/talent-icons-small/Ozo/Ozo_Epic.png","72a0895cd5bb16daa86c08741f5ca2f9"],["dist/assets/talent-icons-small/Ozo/Ozo_Legendary.png","cb97052fcda04a4228a3930f03730fdb"],["dist/assets/talent-icons-small/Ozo/Ozo_Rare.png","5e4fa2954a63c7481b829fb0280121ac"],["dist/assets/talent-icons-small/Petal/Petal_Epic.png","2e5404bb31e56e0b3b89700135fbdc6b"],["dist/assets/talent-icons-small/Petal/Petal_Legendary.png","4e1b089eb01d925dd70c7d11dee55580"],["dist/assets/talent-icons-small/Petal/Petal_Rare.png","336c8a27b78cde30a869d98117e3be58"],["dist/assets/talent-icons-small/Phinn/Phinn_Epic.png","417f9989902718a6641ade25e04b2491"],["dist/assets/talent-icons-small/Phinn/Phinn_Legendary.png","63cc8d4f62f697188816305fb32aee02"],["dist/assets/talent-icons-small/Phinn/Phinn_Rare.png","675059bab054b04c470e262442d28611"],["dist/assets/talent-icons-small/Reim/Reim_Epic.png","39cfb68fcd689e64f89d0a7054d402bb"],["dist/assets/talent-icons-small/Reim/Reim_Legendary.png","78fb8c305870a2f3decedd49a38c2f44"],["dist/assets/talent-icons-small/Reim/Reim_Rare.png","21d5b9f4d0eaa78e0f02b80b95b037e7"],["dist/assets/talent-icons-small/Reza/Reza_Rare.png","d0aecc22eb44c8eba521c614ff13d8a2"],["dist/assets/talent-icons-small/Ringo/Ringo_Epic.png","661a89515ade8660d85a563875a20776"],["dist/assets/talent-icons-small/Ringo/Ringo_Legendary.png","8967e3c9ed9d99045f5429d90de682cd"],["dist/assets/talent-icons-small/Ringo/Ringo_Rare.png","329ad8b9c3942cf23b4a5c3781a7071f"],["dist/assets/talent-icons-small/Rona/Rona_Epic.png","93529e308103d36f0cf1aa1664b3b394"],["dist/assets/talent-icons-small/Rona/Rona_Legendary.png","6491a3195757eb7619d44f8c89baf009"],["dist/assets/talent-icons-small/Rona/Rona_Rare.png","430867ca7bc56597d10e08d1f0ee6112"],["dist/assets/talent-icons-small/SAW/SAW_Epic.png","0101d65003f956b192e239eb39ba42fe"],["dist/assets/talent-icons-small/SAW/SAW_Legendary.png","99ac23b1e3f7bcfa119ffcadbe101861"],["dist/assets/talent-icons-small/SAW/SAW_Rare.png","f97f7ab3c731e5c6878e1a13078451e7"],["dist/assets/talent-icons-small/Samuel/Samuel_Epic.png","b5820136520a1fe570877fbd565e5d94"],["dist/assets/talent-icons-small/Samuel/Samuel_Legendary.png","c7bbcf859b995e406a496b010c7f1d55"],["dist/assets/talent-icons-small/Samuel/Samuel_Rare.png","7d82b13e9028d85db1b571c7ce7f6a15"],["dist/assets/talent-icons-small/Skaarf/Skaarf_Epic.png","f325fae0681d55828857c32c784f2c44"],["dist/assets/talent-icons-small/Skaarf/Skaarf_Legendary.png","6bf3b8ab0400a76438a4c436231f034e"],["dist/assets/talent-icons-small/Skaarf/Skaarf_Rare.png","0bd803b5d26552bb24a070d7573019d3"],["dist/assets/talent-icons-small/Skye/Skye_Epic.png","41b50564f5fa10ff8bdf3d3321521251"],["dist/assets/talent-icons-small/Skye/Skye_Legendary.png","a33b254e0604f985e0e42620a3701cec"],["dist/assets/talent-icons-small/Skye/Skye_Rare.png","4c9255d754051af69784f607cf83be69"],["dist/assets/talent-icons-small/Taka/Taka_Epic.png","f157ba8532e70ea4bf74713a9f0159ba"],["dist/assets/talent-icons-small/Taka/Taka_Legendary.png","63f037f9f9b887273839551b18fe9690"],["dist/assets/talent-icons-small/Taka/Taka_Rare.png","c7534e7c8eabc5971516274c48fb12f6"],["dist/assets/talent-icons-small/Tony/Tony_Epic.png","96e136cd6d4ac18a6c154081df967f6a"],["dist/assets/talent-icons-small/Tony/Tony_Legendary.png","9a91f4428e9564d1ec08ea684b1e8aab"],["dist/assets/talent-icons-small/Tony/Tony_Rare.png","620d0d1c1206a03b3c29ac8e56802199"],["dist/assets/talent-icons-small/Varya/Varya_Epic.png","80afba97f4f97f06bf90f9f304d84754"],["dist/assets/talent-icons-small/Varya/Varya_Legendary.png","3a46974a6ce9243a1c529a30e9da3ef1"],["dist/assets/talent-icons-small/Varya/Varya_Rare.png","ced8e04cf673933a0689088d5e4c2b5a"],["dist/assets/talent-icons-small/Vox/Vox_Epic.png","3c52356b2366f2f8447da48aaad1cae6"],["dist/assets/talent-icons-small/Vox/Vox_Legendary.png","c1ed1f97dbce431b923516531eda7da5"],["dist/assets/talent-icons-small/Vox/Vox_Rare.png","bd276535637304a52c29c9c43dafbd64"],["dist/build.js","1f4fe6af5669af1fae8c75dbd5250053"],["dist/index.html","71111db55779780abd8aedef0b4d3f00"],["dist/main.css","f7ebd439af8684078a89534f4bb14576"],["dist/manifest.json","f7c5bfa148a818b7f5bfa88df6910795"],["index.html","eb51e41a829dcff68648975b98471c99"]],cacheName="sw-precache-v3-brokentalents-1-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,s){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=s),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(s){return new Response(s,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,s,a,t){var n=new URL(e);return t&&n.pathname.match(t)||(n.search+=(n.search?"&":"")+encodeURIComponent(s)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,s){if(0===e.length)return!0;var a=new URL(s).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,s){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return s.every(function(s){return!s.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var s=e[0],a=e[1],t=new URL(s,self.location),n=createCacheKey(t,hashParamName,a,!1);return[t.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(s){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!s.has(a)){var t=new Request(a,{credentials:"same-origin"});return fetch(t).then(function(s){if(!s.ok)throw new Error("Request for "+a+" returned a response with status "+s.status);return cleanResponse(s).then(function(s){return e.put(a,s)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var s=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!s.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var s,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(s=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),s=urlsToCacheKeys.has(a));0,s&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(s){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,s),fetch(e.request)}))}});