/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("/dist/workbox-v3.2.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/dist/workbox-v3.2.0"});

importScripts(
  "/dist/precache-manifest.b3adefa2ccbfb762f4b919d3bf968f31.js"
);

workbox.core.setCacheNameDetails({prefix: "brokentalents"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "dist/assets/backend-flow.png",
    "revision": "61db84489bb0f929df8220a9378e3a59"
  },
  {
    "url": "dist/assets/gwenbarf.png",
    "revision": "1d290fd6aeddde8d1fb5fa3855b9fa84"
  },
  {
    "url": "dist/assets/hero-icons/adagio.jpg",
    "revision": "45a7dedff61554287a67bb5a3e4f6383"
  },
  {
    "url": "dist/assets/hero-icons/alpha.jpg",
    "revision": "a6e6e78b528f37f055897e30ce07fc71"
  },
  {
    "url": "dist/assets/hero-icons/ardan.jpg",
    "revision": "d134c9769f7b7541c3dd54e40cd0bb99"
  },
  {
    "url": "dist/assets/hero-icons/baptiste.jpg",
    "revision": "bdbb056f20067009458e4de74f4a20e0"
  },
  {
    "url": "dist/assets/hero-icons/baron.jpg",
    "revision": "1ba5d27afb1e3d081a5da8964776f567"
  },
  {
    "url": "dist/assets/hero-icons/blackfeather.jpg",
    "revision": "576e7dd1efdadaf49dbd8ac33ec72b09"
  },
  {
    "url": "dist/assets/hero-icons/catherine.jpg",
    "revision": "e3526d76cc2bf896d7e57bb034e34e67"
  },
  {
    "url": "dist/assets/hero-icons/celeste.jpg",
    "revision": "c87ad1ad203a2e79dc6de5f2149fd8a6"
  },
  {
    "url": "dist/assets/hero-icons/churnwalker.jpg",
    "revision": "71578b6d54e1db3fbda8880d5b0b4935"
  },
  {
    "url": "dist/assets/hero-icons/flicker.jpg",
    "revision": "41184135868eaea6eed7684cd34cbf9d"
  },
  {
    "url": "dist/assets/hero-icons/fortress.jpg",
    "revision": "fe6b2151f69dbc812f80e2ee9b0aa266"
  },
  {
    "url": "dist/assets/hero-icons/glaive.jpg",
    "revision": "eccf5fed3fea44891df983f2ae326aae"
  },
  {
    "url": "dist/assets/hero-icons/grace.jpg",
    "revision": "e6f396db2307b7e6a537e4bce1ffa9c8"
  },
  {
    "url": "dist/assets/hero-icons/grumpjaw.jpg",
    "revision": "f536f07d1be6a32eed453fc979ed8a0c"
  },
  {
    "url": "dist/assets/hero-icons/gwen.jpg",
    "revision": "8715a59e20988c783befc597ceb5a661"
  },
  {
    "url": "dist/assets/hero-icons/idris.jpg",
    "revision": "b740fc68188c7ffdf2f508c203121cf0"
  },
  {
    "url": "dist/assets/hero-icons/joule.jpg",
    "revision": "d67f3623a1ea9e000c200e1ba875833f"
  },
  {
    "url": "dist/assets/hero-icons/kensei.jpg",
    "revision": "9088602eafea4276f109f1e9c1723736"
  },
  {
    "url": "dist/assets/hero-icons/kestrel.jpg",
    "revision": "c3eecb875edc98d8622cf736f74a11e2"
  },
  {
    "url": "dist/assets/hero-icons/koshka.jpg",
    "revision": "de6bce86fe780d1ed4c45f6fbd65a2c6"
  },
  {
    "url": "dist/assets/hero-icons/krul.jpg",
    "revision": "7d09330ceac57a8e0541fb165ff539f7"
  },
  {
    "url": "dist/assets/hero-icons/lance.jpg",
    "revision": "37411a2f291b4e92d060654cbc8a9211"
  },
  {
    "url": "dist/assets/hero-icons/lorelai.jpg",
    "revision": "6dbd9c25e75a298f0b7a2d623838ed7f"
  },
  {
    "url": "dist/assets/hero-icons/lyra.jpg",
    "revision": "246e28646aad6e4b9d250b5cef797ffb"
  },
  {
    "url": "dist/assets/hero-icons/malene.jpg",
    "revision": "6e2429d194e073186444dd546896c54b"
  },
  {
    "url": "dist/assets/hero-icons/ozo.jpg",
    "revision": "6703eacc6500b6b3702829aca9988368"
  },
  {
    "url": "dist/assets/hero-icons/petal.jpg",
    "revision": "b8a1a2ca04882c21686e57ba88f23019"
  },
  {
    "url": "dist/assets/hero-icons/phinn.jpg",
    "revision": "50a89135e144671d817d50a7736f42b7"
  },
  {
    "url": "dist/assets/hero-icons/reim.jpg",
    "revision": "db4b1584131e89fd9e6ba652f6f0ed94"
  },
  {
    "url": "dist/assets/hero-icons/reza.jpg",
    "revision": "0313307d8c85408d8eca0978ab1b2b2d"
  },
  {
    "url": "dist/assets/hero-icons/ringo.jpg",
    "revision": "66a7d6ccf7d98da6a1db07a439f17631"
  },
  {
    "url": "dist/assets/hero-icons/rona.jpg",
    "revision": "4068ca62f32dc4b5660b2f33c22168cb"
  },
  {
    "url": "dist/assets/hero-icons/samuel.jpg",
    "revision": "6fdc75d8870d864915fa2ec0206d33e4"
  },
  {
    "url": "dist/assets/hero-icons/saw.jpg",
    "revision": "ba6205febdcd3a882190db1981790b02"
  },
  {
    "url": "dist/assets/hero-icons/skaarf.jpg",
    "revision": "05459ea3273f94d4b0029dacddec5071"
  },
  {
    "url": "dist/assets/hero-icons/skye.jpg",
    "revision": "90f2714f5b8c4cbfd0fa76df7fa5cb5f"
  },
  {
    "url": "dist/assets/hero-icons/taka.jpg",
    "revision": "93686aee77396bf61b9ab26926cdf108"
  },
  {
    "url": "dist/assets/hero-icons/tony.jpg",
    "revision": "a086c4f93a7431b08ced350ccb789fc6"
  },
  {
    "url": "dist/assets/hero-icons/varya.jpg",
    "revision": "6dd50fceffbe6ea22809bd81e655978e"
  },
  {
    "url": "dist/assets/hero-icons/vox.jpg",
    "revision": "e5c4df8d73ab458b51c43e355e23427e"
  },
  {
    "url": "dist/assets/talent-icons-small/Adagio/Adagio_Epic.jpg",
    "revision": "d266b7f16cc635583dab38330fb2c78c"
  },
  {
    "url": "dist/assets/talent-icons-small/Adagio/Adagio_Legendary.jpg",
    "revision": "9b00bcbfdd79cd5afecb5cde0a345cde"
  },
  {
    "url": "dist/assets/talent-icons-small/Adagio/Adagio_Rare.jpg",
    "revision": "21e01fbfd5c89027dea2dac0a8b7443f"
  },
  {
    "url": "dist/assets/talent-icons-small/Alpha/Alpha_Epic.jpg",
    "revision": "a0a1c53f9eae4bf1d4eee6f37c314d9b"
  },
  {
    "url": "dist/assets/talent-icons-small/Alpha/Alpha_Legendary.jpg",
    "revision": "eb67765f95b25885777f0cf644ef2b03"
  },
  {
    "url": "dist/assets/talent-icons-small/Alpha/Alpha_Rare.jpg",
    "revision": "4c8688085810c88ec0b3af95eb2cf49c"
  },
  {
    "url": "dist/assets/talent-icons-small/Ardan/Ardan_Epic.jpg",
    "revision": "fcbbc1709d9252671015fa9c7316f758"
  },
  {
    "url": "dist/assets/talent-icons-small/Ardan/Ardan_Legendary.jpg",
    "revision": "e91b04d2899bf083edbacce771b21e46"
  },
  {
    "url": "dist/assets/talent-icons-small/Ardan/Ardan_Rare.jpg",
    "revision": "7bf372f287681fd5da410f2db6f9fba2"
  },
  {
    "url": "dist/assets/talent-icons-small/Baptiste/Baptiste_Epic.jpg",
    "revision": "3d0713613dd076df651fff497a5f76d2"
  },
  {
    "url": "dist/assets/talent-icons-small/Baptiste/Baptiste_Legendary.jpg",
    "revision": "158226c5b9711fbb845ba26c6aa03199"
  },
  {
    "url": "dist/assets/talent-icons-small/Baptiste/Baptiste_Rare.jpg",
    "revision": "2be77a1d5f3c3dab6b796c30512186a6"
  },
  {
    "url": "dist/assets/talent-icons-small/Baron/Baron_Epic.jpg",
    "revision": "bd36c57ed0fbe65c6b4bba8c85a325a8"
  },
  {
    "url": "dist/assets/talent-icons-small/Baron/Baron_Legendary.jpg",
    "revision": "53b61b5452112184030db5b5eac4a214"
  },
  {
    "url": "dist/assets/talent-icons-small/Baron/Baron_Rare.jpg",
    "revision": "a47e8e9586e3f6a3a8dc30ab776194b9"
  },
  {
    "url": "dist/assets/talent-icons-small/Blackfeather/Blackfeather_Epic.jpg",
    "revision": "f4aafecfa26fbfa6d2dea2ecbd4ac8db"
  },
  {
    "url": "dist/assets/talent-icons-small/Blackfeather/Blackfeather_Legendary.jpg",
    "revision": "17ea5f9b2910c9f2777be3f86ec60571"
  },
  {
    "url": "dist/assets/talent-icons-small/Blackfeather/Blackfeather_Rare.jpg",
    "revision": "d529624b29cba6e7dac83bd23875b151"
  },
  {
    "url": "dist/assets/talent-icons-small/Catherine/Catherine_Epic.jpg",
    "revision": "9e0a3019fae274f12e4f65c96beaa2f9"
  },
  {
    "url": "dist/assets/talent-icons-small/Catherine/Catherine_Legendary.jpg",
    "revision": "e85ebf3066f6bbcb4b7db0b61676a020"
  },
  {
    "url": "dist/assets/talent-icons-small/Catherine/Catherine_Rare.jpg",
    "revision": "931c57393c8da046a770d023d2333add"
  },
  {
    "url": "dist/assets/talent-icons-small/Celeste/Celeste_Epic.jpg",
    "revision": "d74ab7670e14aeee05cc8d6143c71c80"
  },
  {
    "url": "dist/assets/talent-icons-small/Celeste/Celeste_Legendary.jpg",
    "revision": "fea4cbdf3b2de7e6ae66d812cadc33af"
  },
  {
    "url": "dist/assets/talent-icons-small/Celeste/Celeste_Rare.jpg",
    "revision": "5aa79d490ffa81e50ba64461f6d4c22f"
  },
  {
    "url": "dist/assets/talent-icons-small/Churnwalker/Churnwalker_Epic.jpg",
    "revision": "c8cb73d59cbb4cab1b48d45b5a840391"
  },
  {
    "url": "dist/assets/talent-icons-small/Churnwalker/Churnwalker_Legendary.jpg",
    "revision": "ad82eb409c228f0885cf91b92930e14a"
  },
  {
    "url": "dist/assets/talent-icons-small/Churnwalker/Churnwalker_Rare.jpg",
    "revision": "e5038d07dc9eb31488f03ab2bef7ec40"
  },
  {
    "url": "dist/assets/talent-icons-small/Flicker/Flicker_Epic.jpg",
    "revision": "b842c95b70b85dac9867b18b1cb520cb"
  },
  {
    "url": "dist/assets/talent-icons-small/Flicker/Flicker_Legendary.jpg",
    "revision": "e7ab54c32277a5ae6cfde188150525d3"
  },
  {
    "url": "dist/assets/talent-icons-small/Flicker/Flicker_Rare.jpg",
    "revision": "31660ebe1749178fb741f4ec38a70b11"
  },
  {
    "url": "dist/assets/talent-icons-small/Fortress/Fortress_Epic.jpg",
    "revision": "8132793896b4d9e3e7db96e2ebcb7597"
  },
  {
    "url": "dist/assets/talent-icons-small/Fortress/Fortress_Legendary.jpg",
    "revision": "a8acd1c1170a454443d08967b00bd613"
  },
  {
    "url": "dist/assets/talent-icons-small/Fortress/Fortress_Rare.jpg",
    "revision": "7f818b1802025eab0d0ccb0721978ea7"
  },
  {
    "url": "dist/assets/talent-icons-small/Glaive/Glaive_Epic.jpg",
    "revision": "ca9bc5b8d823cb62f74f6b6b0ccb3f82"
  },
  {
    "url": "dist/assets/talent-icons-small/Glaive/Glaive_Legendary.jpg",
    "revision": "475ec6821c706559ab33db1b57812b05"
  },
  {
    "url": "dist/assets/talent-icons-small/Glaive/Glaive_Rare.jpg",
    "revision": "0311d3a1d49373a7e70896630441f96a"
  },
  {
    "url": "dist/assets/talent-icons-small/Grace/Grace_Epic.jpg",
    "revision": "eb6add052c6b4863976b3f3cbdcfbc8e"
  },
  {
    "url": "dist/assets/talent-icons-small/Grace/Grace_Legendary.jpg",
    "revision": "17e754fcff6fdd62f0f5a9c9806d376e"
  },
  {
    "url": "dist/assets/talent-icons-small/Grace/Grace_Rare.jpg",
    "revision": "e3e4cd9b69c3b735cbf6ca61110debe3"
  },
  {
    "url": "dist/assets/talent-icons-small/Grumpjaw/Grumpjaw_Epic.jpg",
    "revision": "8cdbdbbe0031d0f54196229ada6a0d2a"
  },
  {
    "url": "dist/assets/talent-icons-small/Grumpjaw/Grumpjaw_Legendary.jpg",
    "revision": "7926de2d6082a0e82bfea4b003ef20ea"
  },
  {
    "url": "dist/assets/talent-icons-small/Grumpjaw/Grumpjaw_Rare.jpg",
    "revision": "a2a3f2e2392bccc46ae06dbe86aa2fd7"
  },
  {
    "url": "dist/assets/talent-icons-small/Gwen/Gwen_Epic.jpg",
    "revision": "422450f47a884a7dde90bce1d20b4281"
  },
  {
    "url": "dist/assets/talent-icons-small/Gwen/Gwen_Legendary.jpg",
    "revision": "4fad029b384d32b1e6c7c2316f4e288b"
  },
  {
    "url": "dist/assets/talent-icons-small/Gwen/Gwen_Rare.jpg",
    "revision": "a8ab0fae88477ff56c040b4494b73e77"
  },
  {
    "url": "dist/assets/talent-icons-small/Idris/Idris_Epic.jpg",
    "revision": "08feefbacd1ca03eb733583c098cdd34"
  },
  {
    "url": "dist/assets/talent-icons-small/Idris/Idris_Legendary.jpg",
    "revision": "4ba8db2f39829d176925a653d5c7809f"
  },
  {
    "url": "dist/assets/talent-icons-small/Idris/Idris_Rare.jpg",
    "revision": "e24962024f5a1caaa76eb96af87d571c"
  },
  {
    "url": "dist/assets/talent-icons-small/Joule/Joule_Epic.jpg",
    "revision": "908596e343a002dde4a1129d9979c25a"
  },
  {
    "url": "dist/assets/talent-icons-small/Joule/Joule_Legendary.jpg",
    "revision": "99d98d42cb0a6413d9d02e5ab8a5bd18"
  },
  {
    "url": "dist/assets/talent-icons-small/Joule/Joule_Rare.jpg",
    "revision": "64d7bcc4d59432fc9fed532ef7f6e86c"
  },
  {
    "url": "dist/assets/talent-icons-small/Kensei/Kensei_Epic.jpg",
    "revision": "38cf0d2eee1c52fe49ac5ea9a80998e3"
  },
  {
    "url": "dist/assets/talent-icons-small/Kensei/Kensei_Legendary.jpg",
    "revision": "37ac6c80ca8e26148f76d0717368e957"
  },
  {
    "url": "dist/assets/talent-icons-small/Kensei/Kensei_Rare.jpg",
    "revision": "a27591a04e6fd73895e6e94e3ed84d21"
  },
  {
    "url": "dist/assets/talent-icons-small/Kestrel/Kestrel_Epic.jpg",
    "revision": "3f86ef1fb25f90602e8a4e12beed8990"
  },
  {
    "url": "dist/assets/talent-icons-small/Kestrel/Kestrel_Legendary.jpg",
    "revision": "8d03dc8b9a98940f8d27eb32ea4a1368"
  },
  {
    "url": "dist/assets/talent-icons-small/Kestrel/Kestrel_Rare.jpg",
    "revision": "08972b107dfff3574309a8b0819e72f9"
  },
  {
    "url": "dist/assets/talent-icons-small/Koshka/Koshka_Epic.jpg",
    "revision": "518bc3bf8ee8e49d477a25d14ea0153a"
  },
  {
    "url": "dist/assets/talent-icons-small/Koshka/Koshka_Legendary.jpg",
    "revision": "55cc192c4433245db759c8bf236b950e"
  },
  {
    "url": "dist/assets/talent-icons-small/Koshka/Koshka_Rare.jpg",
    "revision": "59f37010e0fe8d4ddd143971192ea78b"
  },
  {
    "url": "dist/assets/talent-icons-small/Krul/Krul_Epic.jpg",
    "revision": "a2fadffa4395b4877801829438abda12"
  },
  {
    "url": "dist/assets/talent-icons-small/Krul/Krul_Legendary.jpg",
    "revision": "7d89d9c39893cda6b52a85564cf3ea2e"
  },
  {
    "url": "dist/assets/talent-icons-small/Krul/Krul_Rare.jpg",
    "revision": "2125ef1d8f20a8818e5a6f843e4395c0"
  },
  {
    "url": "dist/assets/talent-icons-small/Lance/Lance_Epic.jpg",
    "revision": "573e39fc1ed0b4a7f07a1f03fd097e8f"
  },
  {
    "url": "dist/assets/talent-icons-small/Lance/Lance_Legendary.jpg",
    "revision": "f7e55086c7e3aebab22aac3a6f5b5076"
  },
  {
    "url": "dist/assets/talent-icons-small/Lance/Lance_Rare.jpg",
    "revision": "8246ce44b52d8ae2d5884586e46d76b8"
  },
  {
    "url": "dist/assets/talent-icons-small/Lorelai/Lorelai_Epic.jpg",
    "revision": "050b327ee926409d72d3a030e172abe0"
  },
  {
    "url": "dist/assets/talent-icons-small/Lorelai/Lorelai_Legendary.jpg",
    "revision": "846ce0645e8d42dc100948e150f85ab1"
  },
  {
    "url": "dist/assets/talent-icons-small/Lorelai/Lorelai_Rare.jpg",
    "revision": "7b90ab36cbc0402407bd83fc98d01ff2"
  },
  {
    "url": "dist/assets/talent-icons-small/Lyra/Lyra_Epic.jpg",
    "revision": "a32fa661c0d3d125cb9a85f3a5bb7c14"
  },
  {
    "url": "dist/assets/talent-icons-small/Lyra/Lyra_Legendary.jpg",
    "revision": "3dd3f280e9faf080b52a5d896dc746ef"
  },
  {
    "url": "dist/assets/talent-icons-small/Lyra/Lyra_Rare.jpg",
    "revision": "ff6eacfd48c4159b56389f6d356a541c"
  },
  {
    "url": "dist/assets/talent-icons-small/Malene/Malene_Epic.jpg",
    "revision": "ac5d41e80b48d26bde566ba02631df75"
  },
  {
    "url": "dist/assets/talent-icons-small/Malene/Malene_Legendary.jpg",
    "revision": "2b91ce53d83815504801989953b9068f"
  },
  {
    "url": "dist/assets/talent-icons-small/Malene/Malene_Rare.jpg",
    "revision": "13d5da2a40912fd5220039df439ebef5"
  },
  {
    "url": "dist/assets/talent-icons-small/Ozo/Ozo_Epic.jpg",
    "revision": "edd0a2dd0fc5f2286e7d99d57c11f1ac"
  },
  {
    "url": "dist/assets/talent-icons-small/Ozo/Ozo_Legendary.jpg",
    "revision": "32a3748090d46326f9716668b895eabd"
  },
  {
    "url": "dist/assets/talent-icons-small/Ozo/Ozo_Rare.jpg",
    "revision": "11e3e02d7925612010a669728e9fbbc4"
  },
  {
    "url": "dist/assets/talent-icons-small/Petal/Petal_Epic.jpg",
    "revision": "c64e926f928421d6cd23e0d37a1ae34e"
  },
  {
    "url": "dist/assets/talent-icons-small/Petal/Petal_Legendary.jpg",
    "revision": "7aee100dfa7e075198c8c3ce083de531"
  },
  {
    "url": "dist/assets/talent-icons-small/Petal/Petal_Rare.jpg",
    "revision": "1bb670283ec3f9fe7f8f14e77cd13b82"
  },
  {
    "url": "dist/assets/talent-icons-small/Phinn/Phinn_Epic.jpg",
    "revision": "460a7a69f7ea28204a03edaa9167d194"
  },
  {
    "url": "dist/assets/talent-icons-small/Phinn/Phinn_Legendary.jpg",
    "revision": "b300fe269be4106f0ed3eaee81ae1554"
  },
  {
    "url": "dist/assets/talent-icons-small/Phinn/Phinn_Rare.jpg",
    "revision": "20fab6d543ca835273883bcc4b3f07ce"
  },
  {
    "url": "dist/assets/talent-icons-small/Reim/Reim_Epic.jpg",
    "revision": "43c987fc58706b7109991b1a1aeae2f0"
  },
  {
    "url": "dist/assets/talent-icons-small/Reim/Reim_Legendary.jpg",
    "revision": "2f43a99ab0c50d9d539793dc604c7ab0"
  },
  {
    "url": "dist/assets/talent-icons-small/Reim/Reim_Rare.jpg",
    "revision": "0690f90c8392e568bf3fe3d280a71cc3"
  },
  {
    "url": "dist/assets/talent-icons-small/Reza/Reza_Epic.jpg",
    "revision": "d96a49c1a1d7eac3d178a1cec303c722"
  },
  {
    "url": "dist/assets/talent-icons-small/Reza/Reza_Legendary.jpg",
    "revision": "09995538467640dcd7b87fec6272e881"
  },
  {
    "url": "dist/assets/talent-icons-small/Reza/Reza_Rare.jpg",
    "revision": "d567ec66c19e3ca9a5124873c8b4fa20"
  },
  {
    "url": "dist/assets/talent-icons-small/Ringo/Ringo_Epic.jpg",
    "revision": "481e8a779bb20b80f743f101bbfc4da5"
  },
  {
    "url": "dist/assets/talent-icons-small/Ringo/Ringo_Legendary.jpg",
    "revision": "b1671d34a1729e87cc464277a89dbfec"
  },
  {
    "url": "dist/assets/talent-icons-small/Ringo/Ringo_Rare.jpg",
    "revision": "5124562e4cbdc01342c6d295f4989f3e"
  },
  {
    "url": "dist/assets/talent-icons-small/Rona/Rona_Epic.jpg",
    "revision": "92e0eb4606e531db384ffc6b3be33da8"
  },
  {
    "url": "dist/assets/talent-icons-small/Rona/Rona_Legendary.jpg",
    "revision": "a67d3e75f2c41b891eb6208d3e13be57"
  },
  {
    "url": "dist/assets/talent-icons-small/Rona/Rona_Rare.jpg",
    "revision": "b89af0c56ccb6c7aba710f07a9f2c0ad"
  },
  {
    "url": "dist/assets/talent-icons-small/Samuel/Samuel_Epic.jpg",
    "revision": "2810d981db711354d14f1d4d3d8a4ab5"
  },
  {
    "url": "dist/assets/talent-icons-small/Samuel/Samuel_Legendary.jpg",
    "revision": "55e21ceddd78fd8f673a3926eefc38d4"
  },
  {
    "url": "dist/assets/talent-icons-small/Samuel/Samuel_Rare.jpg",
    "revision": "ad6133acc430586d73ce9f417d8df3ef"
  },
  {
    "url": "dist/assets/talent-icons-small/SAW/SAW_Epic.jpg",
    "revision": "ac9b7d3b52f8a9bcdd0087a67aa511fb"
  },
  {
    "url": "dist/assets/talent-icons-small/SAW/SAW_Legendary.jpg",
    "revision": "0035887a0ee01ade2dca019a09b781c2"
  },
  {
    "url": "dist/assets/talent-icons-small/SAW/SAW_Rare.jpg",
    "revision": "dd9bd79299a4f3f7ee7d909b4a28bf8d"
  },
  {
    "url": "dist/assets/talent-icons-small/Skaarf/Skaarf_Epic.jpg",
    "revision": "83c3c0902a3f54e3a688d03062cffafd"
  },
  {
    "url": "dist/assets/talent-icons-small/Skaarf/Skaarf_Legendary.jpg",
    "revision": "5f82baa32d36ff596af75679778d7c1e"
  },
  {
    "url": "dist/assets/talent-icons-small/Skaarf/Skaarf_Rare.jpg",
    "revision": "70196a03b3a5b9b2f08fae90876ec230"
  },
  {
    "url": "dist/assets/talent-icons-small/Skye/Skye_Epic.jpg",
    "revision": "9289e8b24959476d3a3f2b057394a7b7"
  },
  {
    "url": "dist/assets/talent-icons-small/Skye/Skye_Legendary.jpg",
    "revision": "f2b0640998cd7accbd6902af3f7df12b"
  },
  {
    "url": "dist/assets/talent-icons-small/Skye/Skye_Rare.jpg",
    "revision": "5fc8db4b3f31fa1175ef35dc40cdc34a"
  },
  {
    "url": "dist/assets/talent-icons-small/Taka/Taka_Epic.jpg",
    "revision": "06af0f2cdcd655701b96c81c3382a315"
  },
  {
    "url": "dist/assets/talent-icons-small/Taka/Taka_Legendary.jpg",
    "revision": "28f7d75647069955a121551a1f058b2e"
  },
  {
    "url": "dist/assets/talent-icons-small/Taka/Taka_Rare.jpg",
    "revision": "d6cebc75bb756392f6d19b3921fc8261"
  },
  {
    "url": "dist/assets/talent-icons-small/Tony/Tony_Epic.jpg",
    "revision": "ef854da90ebde8a094ec447ae1df305d"
  },
  {
    "url": "dist/assets/talent-icons-small/Tony/Tony_Legendary.jpg",
    "revision": "42436f4d805ba5ff9f046c739ed68918"
  },
  {
    "url": "dist/assets/talent-icons-small/Tony/Tony_Rare.jpg",
    "revision": "23b8cb3ee4dea8850f058bb48957f18e"
  },
  {
    "url": "dist/assets/talent-icons-small/Varya/Varya_Epic.jpg",
    "revision": "49f2519cd1e255d56b15bc4a5afeb9b4"
  },
  {
    "url": "dist/assets/talent-icons-small/Varya/Varya_Legendary.jpg",
    "revision": "b74e39c3f78e937e8bcda32cc58279b6"
  },
  {
    "url": "dist/assets/talent-icons-small/Varya/Varya_Rare.jpg",
    "revision": "d557389acca0f52085775404de67773f"
  },
  {
    "url": "dist/assets/talent-icons-small/Vox/Vox_Epic.jpg",
    "revision": "0d4ff57d064ab02732421597f200e889"
  },
  {
    "url": "dist/assets/talent-icons-small/Vox/Vox_Legendary.jpg",
    "revision": "4a4e4f5e9e4b7adca8cba882c15d7cc9"
  },
  {
    "url": "dist/assets/talent-icons-small/Vox/Vox_Rare.jpg",
    "revision": "8f7f7ff292c35927c64ee324054cfc17"
  },
  {
    "url": "dist/assets/TalentGrab_192x192.png",
    "revision": "768e4c313abaf28521f205fd7988fe91"
  },
  {
    "url": "dist/assets/TalentGrab_512x512.png",
    "revision": "a4d7c072399c3f6e3c48cc6855c9e8e3"
  },
  {
    "url": "dist/assets/TalentGrab_square.jpg",
    "revision": "597eeab3c4b12e97364ef60ef32fa503"
  },
  {
    "url": "dist/assets/TalentGrab.jpg",
    "revision": "3e361406f2124104228af4794e7dd2e0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
