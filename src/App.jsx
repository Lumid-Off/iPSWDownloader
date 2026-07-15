import { useEffect, useMemo, useState } from 'react'
import './App.css'

const categories = ['all', 'iPhone', 'iPad', 'Mac', 'Apple Watch', 'Apple TV', 'iPod', 'HomePod']

const categoryLabels = {
  all: 'All devices',
  iPhone: 'iPhone',
  iPad: 'iPad',
  Mac: 'Mac',
  'Apple Watch': 'Watch',
  'Apple TV': 'TV',
  iPod: 'iPod',
  HomePod: 'HomePod',
}

const iphoneImages = {
  'iphone 2g': '94fb69cdb7102e42c748660a50c96259818af99d', 'iphone 3g': 'f005f7dd7505fa45c487c762eecc42cae2a5246c', 'iphone 3gs': 'bd68092b8841baa6ef36321af526876f3558aef0',
  'iphone 4 (gsm)': '99f47530aa998c676c9da88ab7194df6729fa482', 'iphone 4 (cdma)': '677a4ad55a4c5e327f4f4c10fba20b74468b2d3c', 'iphone 4s': 'b66ed9c2b009d5d857c663381a568965a3cb9daf',
  'iphone 5 (gsm)': '3c7ac44ba4bca9c61a32cc89fc60e613b4f8e28a', 'iphone 5s': 'b1578c720837786a15b90fcccf3213c9d285e44b', 'iphone 5c': '531cf6cde9a5db3c7228e55a6007083096340c59',
  'iphone 6+': 'a5b90af902bc843c4f301c73b3babe1ab16a08ee', 'iphone 6 plus': 'a5b90af902bc843c4f301c73b3babe1ab16a08ee', 'iphone 6s+': '996d69bbcd38cd3e73081ecbf0b66332cd5c39fb',
  'iphone 6s plus': '996d69bbcd38cd3e73081ecbf0b66332cd5c39fb', 'iphone 6s': 'e5fd20a50ad488b712624cd8f0560511dea52458', 'iphone 6': 'e44bc3d3e604597f06e7b33bc1ec9dc72a2fb670',
  'iphone se': '776da1247cee331824ea38b64b4aacae90b90ff3', 'iphone 7 plus': 'fbeb64f9239cb433001316158b3194a8ee5fbb8b', 'iphone 7': 'b7368649ec8965c05167f45f866a9b0a316f8727',
  'iphone 8 plus': '80f1bc74c4644fe16d1b826ae21ec869a48cbe1f', 'iphone 8': '446bec7c6d378a22c9f24d8e22908538d6480a40', 'iphone x': '6a5e430271e5cd9cbce6eac350af2fbf0c8b73c2',
  'iphone xs max': 'c98d303ae1279c693ea6da7f097e9d0c5e945e5f', 'iphone xs': 'c09a8924aff18cdfda0974a48dd09df0901019d6', 'iphone xr': '955c31562c230f90a30f761ed1ae6c97aefa2bac',
  'iphone 11 pro max': '622e05f9d2519140b1d013403c78f69598db6fea', 'iphone 11 pro': 'c0f054a7baaf8e0ab43336208f3d3810d4e4500f', 'iphone 11': 'b2cf31eb0ff5e8702d6c42a6f8b2ec4609931727',
  'iphone 12 pro max': 'dae9f2ca878e1719d2515ab35678ab0e35a53f9d', 'iphone 12 pro': 'e1ff7bbcd3e810873070d5d8f4fc54e8d8171a24', 'iphone 12 mini': '005a9d7548ba11a3c86b270f289f743f2313be1f', 'iphone 12': 'e9a333a57694a97cb63752d56e4fdef7a8f06ae6',
  'iphone 13 pro max': 'c618fdc99a745d4d971f55190da357defe014e81', 'iphone 13 pro': '9b4f7744a0d3f3996a952a7ff14f96c1bee4053b', 'iphone 13 mini': 'b0e51705066f0981cfe23d989a57cbc9c5606f23', 'iphone 13': '27c25bd7762a838b295a81e20ea3e19105c8a803',
  'iphone 14 pro max': 'c960a752fbc08daf5cddda1a271edb270a0f8520', 'iphone 14 pro': '7eff2dfbf230b0887bfc32187f3b7f0e7f450713', 'iphone 14 plus': '310f3c8e8fcf1e3cc1ab0f7db2b4735b0523cd4b', 'iphone 14': '4ea44d41f1cc3a3a91229b490ba0fed2b6de19c3',
  'iphone 15 pro max': 'b19ea241d6859cf7dd785b2b987ac27c9e700489', 'iphone 15 pro': 'c7b539e24c240eb0ab24ebd608712494d3f4fd02', 'iphone 15 plus': '69d6770ff6f8c43513bece77d72e2842ede23cd2', 'iphone 15': 'dfb49c5b8fb0023e4ab060c49ae89b57e5ad2190',
  'iphone 16 pro max': '9ec271b39b94169fb12b3f567a86e7adde280d47', 'iphone 16 pro': '6f2efda860b18f66237c05852665b12b6833c1fc', 'iphone 16 plus': '250967caa105b20934cbc42f232ae20602dde014', 'iphone 16e': '2ee8526b37e7094a07b57c9ccc93abe3d740716c', 'iphone 16': 'd6eb976c75dac562fc7e68b64d747fe9513cd089',
  'iphone 17 pro max': '86ba355d188876aa696ce2a63794f29c33d80ef2', 'iphone 17 pro': '9d3cf7526b0aaf77625151a23362cccb4f7f33be', 'iphone air': 'aa58359dea54a4a1d8b076ca2dcce740cd60bd30', 'iphone 17e': 'c886907b8dbc0a01e7c2e65483927bfd99bd998d',
}

const macImages = {
  'macbook pro (m1, late 2020)': '0d40c4b5cdd0654027489fa8ead4658c1a6c6d4c', 'macbook air (m1, late 2020)': '2f51e91044047e0775406acf90fc409f3dfb7c07', 'developer transition kit': '42968cfda7136beadfb21a464515410d69c01362', 'mac mini (m1, late 2020)': '859c711202eecbad2f1d5ed643d282f27492a60c',
  'imac 24-inch (m1, two ports, 2021)': '6e216c2bb64bac435b63e8f7f5c1235832e7cb90', 'imac 24-inch (m1, four ports, 2021)': 'b7ed3015465c9ab0d1618510dfbed093842099e7', 'macbook pro (m1 max, 16-inch, 2021)': '0fe7713405bba080bc97d38233977285414fbd97', 'macbook pro (m1 pro, 14-inch, 2021)': 'eedc6716369dfb077251072b1ab2cb1d69c56627', 'macbook pro (m1 pro, 16-inch, 2021)': 'c8bdfb38e468b495e4a388600553d54cbffb8379', 'macbook pro (m1 max, 14-inch, 2021)': 'c98d4eb40b26671040b45f80e82906576891b89f',
  'mac studio (m1 max)': '4a76a7b83412d6b3f296634f0c1e91021eefeaa3', 'mac studio (m1 ultra)': 'bf7ad2341ea4c3110a4aa407403a4ebcd8929a33', 'macbook air (m2, 2022)': 'c7985852933859d10dcd0970268b6a9907e2839c', 'macbook pro (13-inch, m2, 2022)': '923391268d2604da7ee75e5db48c2a7f1217a318', 'mac mini (m2, 2023)': '0daf9c11699467aa13990282704c15c673eb00d4',
  'macbook pro (m2 max, 14-inch, 2023)': 'af2fcae74417f40cae043c0c32fa3551ee3da765', 'macbook pro (m2 max, 16-inch, 2023)': 'e7bba458d19bb27fb5c5fdafc3cc1b2dc92c776e', 'macbook pro (m2 pro, 14-inch, 2023)': '7e310fc6e5ec5ef25add7b7e0ca4ef9ae37f6188', 'mac mini (m2 pro, 2023)': '3a4daa789e9c32af28c8e18939297c63028a7697', 'macbook pro (m2 pro, 16-inch, 2023)': '0a5200db386e14fc10e51df60d57948f77a06ea8', 'macbook air (15-inch, m2, 2023)': '2a3439e293251650cfb995ac05677c65f68dbc68',
  'mac studio (m2 max, 2023)': '4ee7838378ccf7cc629785be0ea83415f62aadab', 'mac studio (m2 ultra, 2023)': 'e35de67e1acc3ed7ab1f5029314e3f097afa9262', 'mac pro (2023)': '5b1880b7ca03de97c0ea57d758b09661f0bc2501', 'imac (two ports, 24-inch, 2023)': 'd1252af740dcf7d449a4ceea4a1b761eff480ebd', 'imac (four ports, 24-inch, 2023)': 'ad8e2ff31d012bc07ed2a5f9a5c266cdd4f16fae',
  'macbook pro (m3 pro, 14-inch, nov 2023)': '53b41d0a53df324ab7d66f91e9f435608091c0cc', 'macbook pro (m3 max, 16-inch, nov 2023)': '5035465a27fbd7428b4ac34f1179eba50c338e22', 'macbook pro (m3, 14-inch, nov 2023)': 'e00e517d09adc847e7ec516a03290b09ad16c898', 'macbook pro (m3 max, 14-inch, nov 2023)': '744e9d9b5f951dd363cdb58824058ae8a156d796', 'macbook pro (m3 pro, 16-inch, nov 2023)': '4ff7c1c12915e0c2b45ac355c38b272dc818f44c', 'macbook air (15-inch, m3, 2024)': 'c06c062ecfee4933f3da10fa4afcd8cb9a4f5d3f', 'macbook air (13-inch, m3, 2024)': '83705a9c5f4d8856f4e5152ebbb1e898b52af61a',
  'mac mini (m4, 2024)': '7f873c6b80ba359ba8292fe9b995e3a606c59343', 'macbook pro (m4 max, 14-inch, nov 2024)': 'd11e660915d8d7b13f0fa37aec4bbe64540b743c', 'macbook pro (m4, 14-inch, nov 2024)': '209fb8b7f6349ae6406aa53f2a3c27f408edbc77', 'macbook pro (m4 max, 16-inch, nov 2024)': '70b9b186979d703e99cbc0ba3409b99930bc703c', 'imac (four ports, 24-inch, 2024)': 'e83316d4f7b6097263a46ff77d658b9b440b0629', 'mac mini (m4 pro, 2024)': 'ce1882ee1b31dc8bbbb5bd34020f6600175f6c79', 'macbook pro (m4 pro, 16-inch, nov 2024)': 'c367bcb6177f11dc2810dca7d30f40a5b55fc183', 'imac (two ports, 24-inch, 2024)': 'b0e8fbdf44346550691b81891d0801e67df4d26e', 'macbook pro (m4 pro, 14-inch, nov 2024)': 'b24b728bf7025108019b838f1cc70582e57011dd',
  'mac studio (2025)': '396bc9ecb127996295f6e4f02466abe02407e45a', 'macbook air (15-inch, m4, 2025)': 'd76b8ebebcf868b62580c85152c3d8dce9f6d30e', 'macbook air (13-inch, m4, 2025)': '8d1918621436d44006fc91cf565c57e0f6e52c6d', 'macbook pro (14-inch, m5)': '129d0208f6f74969e9f06ed1837e8207bdefa836', 'macbook neo': 'da0896713231174ba4d7579e996d602fc63fda55', 'macbook pro (14-inch, m5 max)': 'f0d7f319f957af1cea44445a6adf990c32657aba', 'macbook air (13-inch, m5)': '2bc9b4b9bd81e1badb0622dbae9cf7ff65fa841e', 'macbook pro (16-inch, m5 max)': 'cd673d296d39fb8711305adddb4c95a26cbd0298', 'macbook air (15-inch, m5)': '1c29e36a433e33b61655f28ea99461639fd84c95', 'macbook pro (14-inch, m5 pro)': 'c3ed7ffa4354c68b50ca4c62f4b75b0f1526bb47', 'macbook pro (16-inch, m5 pro)': '36c4f667276a0945e62841311e880a8b16c58a54',
}

const watchImages = {
  'apple watch (38mm)': '3d3e52c200f9d6dcfb067bcb299424405ef49320', 'apple watch (42mm)': '21b8c2185509708bac5b61995111e423cf1a95df',
  'apple watch series 2 (38mm)': '0cd24b09485cbe7204c906aa5aa67b1c1040a996', 'apple watch series 2 (42mm)': 'c22fc9378fedca13295da1976a50b5c07309933d',
  'apple watch series 1 (38mm)': '1c7b04e905f9e5ca8b920df28b5eb72cd8330821', 'apple watch series 1 (42mm)': '06cff67448c93e27ade87e9fa2ae1f5d623df820',
  'apple watch series 3 (38mm, lte)': 'f928331c68f05c1488ca5556d75f0fd0b71d8412', 'apple watch series 3 (42mm, lte)': '57e5e18a885d0d49f8fd8fdee43c530ea7a5d64b',
  'apple watch series 3 (38mm)': '0907be0b9dfd05a5a94cbdaf8b8d6d36ebe810bd', 'apple watch series 3 (42mm)': '2bea03a29949d5c86ce5b97e4735ac9484383bd8',
  'apple watch series 4 (44mm)': '43522dca5150e53761539a3d20c30c87cad478fc', 'apple watch series 4 (40mm)': '37a3e5462faa98a8ab8270ecf2a17fb5da453e61',
  'apple watch series 4 (40mm, lte)': 'a0ef46576d38a2f717fda142b90558077edaa640', 'apple watch series 4 (44mm, lte)': '3208ff9605162e9f4ad753f44a7b731c59dcc57c',
  'apple watch series 5 (40mm)': '6325a00bb024746e181788087f56507d5bcc3a3a', 'apple watch series 5 (44mm)': '966700a404b5a6b432363515586f1481fcd6fae3',
  'apple watch series 5 (40mm, lte)': '884479e2ec2d459c77b44135a0fcdf7f63b99c77', 'apple watch series 5 (44mm, lte)': '6eb022d5b372a55f04801e11ade472c3f39a86fd',
}

const ipadImages = {
  "ipad 1": '015f46d56cc15f6cf5461be431a09a0dc9c82115',
  "ipad 2 (wifi)": 'd927bb97db9f67b4b0180e1821024566218e75ef',
  "ipad 2 (gsm)": 'd991580fe4da7f54374b646b0fb26ca7157eac80',
  "ipad 2 (cdma)": '6056cf9078cfe0db0527e6eca5a40f64b78b29a1',
  "ipad 2 (mid 2012)": '3d6478f3cbadd44f2166c65e5820ac5e8e70f879',
  "ipad 3 (wifi)": '8f61043399f9932dd3b0f45e13941ef3d6d8ae1e',
  "ipad 3 (cdma)": '616e24cb68ba8006fcb343d06f5cd2dc0509c34c',
  "ipad 3 (gsm)": '60a206184678cbcbefbf4acb0dbf9081845e2ef4',
  "ipad mini (wifi)": '912a254d69a55974a44d71c6eff89d3dd9986b2a',
  "ipad mini (gsm)": '0f0cb4bde177a3251131c11284d981fdce687374',
  "ipad mini (global)": 'd81ad2095112f85cb3434b2daf52a84de2a438e6',
  "ipad 4 (wifi)": 'bc4deafc7a0aefab4683be2435384c7ba012db38',
  "ipad 4 (gsm)": 'adff62a4b066eafde364f376d098b6f4c62a80e5',
  "ipad 4 (global)": '5e22f81a0e208fcc94d51850ee55805060761b5c',
  "ipad mini 2 (wifi)": '60289d683a6758badc01ba0b884fb3c9f1edbd8f',
  "ipad mini 2 (cellular)": '60289d683a6758badc01ba0b884fb3c9f1edbd8f',
  "ipad air (wifi cellular china)": 'b321dbf62c9d247182e466425bba2fc04e34d3e9',
  "ipad mini 2 (china)": 'a826af5c991f7972c7410b0e60adfba6dedaa25e',
  "ipad mini 3 (wifi)": '0ee41f4526ae6b2e05cee276d05e920c9c0b8f93',
  "ipad mini 3 (cellular)": '2433c3ff04ad3f8b594cf700cf1d26c4b117329e',
  "ipad mini 3 (china)": '061f361779ccefd953b021b171299fbd5204ce21',
  "ipad air 2 (wifi)": '8a6c5cdc342a9a0e78908bb82bc33a1cc8dd2954',
  "ipad air 2 (cellular)": '2f40af2bf1701bc17287009775f8e4a19c1ec959',
  "ipad mini 4 (wifi)": 'c9c8e135537314e2049ce04fe4c677a1dbb0f376',
  "ipad mini 4 (cellular)": '6d0a4172e932ed56ba07ade9bd10995a73094b7a',
  "ipad pro 12.9-inch (wifi cellular)": '3e90454f900084af3bcf23174d06009c95d34f92',
  "ipad pro 9.7-inch (wifi cellular)": '45f427f8a3098171efb75c12c097fff3d2d97184',
  "ipad 5 (wifi cellular)": '7507555cb915c6333db8cb03b78e24bfddecf0c6',
  "ipad pro 2 (12.9-inch, cellular)": '526de350025cd95b9b398c0c2ed39add0cee33c0',
  "ipad pro (10.5-inch, cellular)": '39bb3347137a3313f8c9bde8cb56bde7690c6b41',
  "ipad pro (10.5-inch, wifi)": 'cdb8869cec199ccdc8f40ee09ee1b6038cfa4b48',
  "ipad pro 2 (12.9-inch, wifi)": '86a63f43298a9de30efe4c0be4d7c98b5085180c',
  "ipad 6 (wifi)": '24148999a3877ee48e9eb3cb79f0073585f650fe',
  "ipad 6 (cellular)": '87993140eb4b75d83bc93e54606d27a71504171e',
  "ipad pro 3 (12.9-inch, wifi, 1tb model)": '455bedc9ca7a8bf4f006b45f8714913171ee9582',
  "ipad pro 3 (11-inch, cellular)": '4c755c6a9eb559c5bc6566d3aaf9a84bf5526b16',
  "ipad pro 3 (11-inch, wifi)": 'f3024852a7bb3126635fd01af8033671f3fa7b20',
  "ipad pro 3 (11-inch, wifi, 1tb model)": '9968042f0dc9bdfd4cf0139684d746387f0efe9a',
  "ipad pro 3 (11-inch, cellular, 1tb model)": 'baa74c7b204b4f75e42bec4865531ebdb1b0e970',
  "ipad pro 3 (12.9-inch, wifi)": '317eaf31a9abcafbad9887c4f31439364bd6563e',
  "ipad pro 3 (12.9-inch, cellular)": 'ea7e207b4c3ff6ca9055efe448fad28948f45aba',
  "ipad pro 3 (12.9-inch, cellular, 1tb model)": 'a6fa76fd3f84d3ccdf084d460464146e231a0e0f',
  "ipad mini 5 (wifi)": '07a1c534ff7b70248dad20bf9b3ad8faac6a1235',
  "ipad mini 5 (cellular)": '9edfbe63487bd6e1a78d979ee82a99d1398a4dc3',
  "ipad air 3 (wifi)": '81f5cfccd75e4d0b1eea2cc45cabb02d3ff2b9c4',
  "ipad air 3 (cellular)": '70b4402ab716999511420d8cd8a582e2761bc738',
  "ipad 7 (cellular)": 'dce0f0cd21a6cb781123c8d3111d2bfee5592ed6',
  "ipad 7 (wifi)": 'c112aa862718877891b810e56ae213259f08760d',
  "ipad pro 4 (12.9-inch, cellular)": 'b9510aa5d2479e88a427e561da32379b7b69f098',
  "ipad pro 4 (11-inch, wifi)": 'd2cc85e219afc0c8fdcd76bb2af8dcfee35893a5',
  "ipad pro 4 (12.9-inch, wifi)": '75c146d576c6ed6579521cd6a447d5dcfb8806e6',
  "ipad pro 4 (11-inch, cellular)": '385f6911c7d3627ec7093fa739f6131fb9dedb38',
  "ipad air 4 (wifi)": 'd044893f0d83fd0ea94ea295183389e4b4695a37',
  "ipad 8 (wifi)": 'eedc089a75fa68134341c4dfba0be944c37339e9',
  "ipad 8 (cellular)": 'aff2fc5a2d45dcef34a97c4d3aa053f035fc6443',
  "ipad air 4 (cellular)": 'e44c45cd3ade3d9053fd3a3dc98b03150c85558f',
  "ipad pro (11-inch, wifi) (3rd generation)": '97cd8dceb876eb84d540fc3c407dda4311314735',
  "ipad pro (11-inch, cellular) (3rd generation)": '5ce35209cb7ce0c6452cafe94336eefa8a93b212',
  "ipad pro (12.9-inch, wifi) (5th generation)": '7ba68029b4e739a380139ec033e0ceba035d2b96',
  "ipad pro (12.9-inch, cellular) (5th generation)": '1ce552296d38db82a9875927cee36cffcc90198c',
  "ipad (wifi, 9th generation)": 'a6fefc107a44286b7d061f1d657c684c7543f35c',
  "ipad (cellular, 9th generation)": '81c9cc8a79868955b0ef76f2eddcc074ef477e46',
  "ipad mini 6 (wifi)": '26a8e5395bea3420b386c06b3506e059c690bef8',
  "ipad mini 6 (cellular)": '81a52b35c362b0bee5a8dc833bab74b3f5916677',
  "ipad air 5 (cellular)": 'eddaf92fc20aa58eb02a1c46c49915049d675d88',
  "ipad air 5 (wifi)": '2e15a70ae77cf95d337acc7ea66e0d16f8585575',
  "ipad (wifi, 10th generation)": '839f9d93b71b90d342b1747202baeb51e6ba31dc',
  "ipad (cellular, 10th generation)": '79d46b1e8567ab18137c50b89d3862b8273cf8d4',
  "ipad pro (11-inch, wifi) (4th generation)": 'f6c51038520b80388a965e9444243fc7dddfe426',
  "ipad pro (11-inch, cellular) (4th generation)": 'd5e26b0b882b4c16512e5e2fb2a029a4b5ddd94a',
  "ipad pro (12.9-inch, wifi) (6th generation)": '7be73192e0b768d8869602939c819319ac65b070',
  "ipad pro (12.9-inch, cellular) (6th generation)": '1bd8e3a133bc9e1608a7c0ed30fae6c13ec48831',
  "ipad pro (m4, 11-inch, cellular)": '57c962dc3a376b91322b3ac597c43505e3a86d2e',
  "ipad pro (m4, 11-inch, wifi)": '1df9aa9508bb768fd2b6b38bb8422dab7f2a7e26',
  "ipad air (m2, 13-inch, wifi)": '3e7534962f1f749781f86caf6b723234f304238f',
  "ipad pro (m4, 13-inch, wifi)": 'ad223999b2e3ddec96b6d063c80cb94881907ca6',
  "ipad pro (m4, 13-inch, cellular)": '8377e5bd7852545a8dd43db12b036af1ce0b5afa',
  "ipad air (m2, 13-inch, cellular)": 'e676a74f93abf0e76b378bed2e02f6801d010e63',
  "ipad air (m2, 11-inch, cellular)": 'ce5d311bd3c679415eed9738c64cfa4a98f48d63',
  "ipad air (m2, 11-inch, wifi)": '2efb4a61519a241021ef03e024532076f4ea7b2e',
  "ipad mini (a17 pro, cellular)": '37b0fc4b0f1ca08dea9e599b4465be28a02b1440',
  "ipad mini (a17 pro, wifi)": 'f3ca36d832f8f19297dc313f94dda539d2509347',
  "ipad air 11-inch (m3, wifi)": 'f1e27bec6f3291114622b8abc6d0501b39f6a0fe',
  "ipad air 13-inch (m3, wifi)": '9eb76c04803a3233c18c710feb5800512f38195b',
  "ipad (a16, cellular)": '4d856647f4fc3a5d7c75c52a0a9ccbe8adb3f0a9',
  "ipad air 11-inch (m3, cellular)": '21756e32b55e929ef312a36f55902cfb948bb984',
  "ipad (a16, wifi)": 'cdc0ac5c4fadf7f6b8544e8e0c410d992ad71eca',
  "ipad air 13-inch (m3, cellular)": 'dcc715511fee177f94602e41fdb81d09b2cf9817',
  "ipad pro 13-inch (m5, cellular)": '529df80e07e630a834b4263a7c2d773bfbdfea82',
  "ipad pro 13-inch (m5, wifi)": '8612380caea4477af5984493f7f0420fd1c1428b',
  "ipad pro 11-inch (m5, wifi)": 'c38edb657e9cb802d39b6e6e267fef26ae07d324',
  "ipad pro 11-inch (m5, cellular)": '120dc9b534027cf9fa92024b6733ac84070052df',
  "ipad air 11-inch (m4, cellular)": '47b5d851a4dc710f1b1e4c506575a641a20dce99',
  "ipad air 13-inch (m4, cellular)": '867d76e07695a18620ecec545d6628f02d3e4647',
  "ipad air 11-inch (m4, wifi)": '08f21a088a1767593baed2b735ac5f512ab4f0be',
  "ipad air 13-inch (m4, wifi)": 'a411edda1c31e12dc790b1eb8ab6b4e849e0d59d',
}

const tvImage = '7547215777e2e8f88fa574b296b9d608790f0357'
const homepodImages = {
  homepod: 'd40875b76a501c3c35913eca64c7b7751926f03a',
  'homepod (unknown model)': '025ea05d31eebcc08ed1f5affa070bfdcb36ebd3',
  'homepod mini': '535dfe8f068e4d9f7c137743f8e77aebbfdde375',
  'homepod (2nd generation)': '7452ed2c80100dbcbe7fabc2635a0830ce66d05f',
}
const ipodImages = {
  'ipod touch 1g': '84e0d889466f48bd273b92a76c6321f2cea2bca0',
  'ipod touch 2g': '1dc9b3f3ae216408fc5992783e20fb1abcb130f2',
  'ipod touch 3': '3654499f0e5235bb6e95935a9b4a75073ca92754',
  'ipod touch 4': '9abd2a9977e7a5f10879635fa140a92b58d4e9dc',
  'ipod touch 5': '8ceb9539df20bac321619a1b81edb9c7de9cecd6',
  'ipod touch 6': '1250c9b4c8054792a79364d6101b15023a31bcc5',
  'ipod touch 7': 'cfceac15fa651f7950d2b6a125381c823a9fbfca',
}

function categorizeDevice(device) {
  const name = device.name.toLowerCase()
  if (name.includes('iphone')) return 'iPhone'
  if (name.includes('ipad')) return 'iPad'
  if (name.includes('mac')) return 'Mac'
  if (name.includes('watch')) return 'Apple Watch'
  if (name.includes('tv')) return 'Apple TV'
  if (name.includes('ipod')) return 'iPod'
  if (name.includes('homepod')) return 'HomePod'
  return 'Other'
}

function getDeviceImage(device) {
  const name = device.name.toLowerCase()
  const iphoneKey = Object.keys(iphoneImages).find((key) => name.includes(key))
  if (iphoneKey) return `https://ipsw.me/images/devices/${iphoneImages[iphoneKey]}.webp`
  const macKey = Object.keys(macImages).find((key) => name.includes(key))
  if (macKey) return `https://ipsw.me/images/devices/${macImages[macKey]}.webp`
  const watchKey = Object.keys(watchImages).find((key) => name.includes(key))
  if (watchKey) return `https://ipsw.me/images/devices/${watchImages[watchKey]}.webp`
  const ipadKey = Object.keys(ipadImages).find((key) => name.includes(key))
  if (ipadKey) return `https://ipsw.me/images/devices/${ipadImages[ipadKey]}.webp`
  if (name.includes('ipad pro')) return 'https://www.apple.com/v/ipad/home/ck/images/overview/select/product-tile/pt_ipad_pro__6bgrkek0jnm2_large.png'
  if (name.includes('ipad air')) return 'https://www.apple.com/v/ipad/home/ck/images/overview/select/product-tile/pt_ipad_air__cr381zljqdi_large.png'
  if (name.includes('ipad')) return 'https://www.apple.com/v/ipad/home/ck/images/overview/select/product-tile/pt_ipad_10th_gen__ej5p5x6ysmq6_large.png'
  if (name.includes('watch')) return 'https://www.apple.com/v/watch/bo/images/overview/select/product_s10__flhztv6d68ae_large.png'
  if (name.includes('tv')) return `https://ipsw.me/images/devices/${tvImage}.webp`
  const ipodKey = Object.keys(ipodImages).find((key) => name.includes(key))
  if (ipodKey) return `https://ipsw.me/images/devices/${ipodImages[ipodKey]}.webp`
  const homepodKey = Object.keys(homepodImages).sort((a, b) => b.length - a.length).find((key) => name.includes(key))
  if (homepodKey) return `https://ipsw.me/images/devices/${homepodImages[homepodKey]}.webp`
  if (name.includes('mac')) return 'https://ipsw.me/images/devices/2f51e91044047e0775406acf90fc409f3dfb7c07.webp'
  return 'https://ipsw.me/images/devices/d6eb976c75dac562fc7e68b64d747fe9513cd089.webp'
}

function App() {
  const [devices, setDevices] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [firmwares, setFirmwares] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('home')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.ipsw.me/v4/devices')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load the device catalog')
        return res.json()
      })
      .then(setDevices)
      .catch(() => setError('The catalog is temporarily unavailable. Try refreshing the page.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredDevices = useMemo(() => devices.filter((device) => {
    const matchesCategory = selectedCategory === 'all' || categorizeDevice(device) === selectedCategory
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    return matchesCategory && matchesSearch
  }), [devices, searchQuery, selectedCategory])

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device)
    setLoading(true)
    setView('firmwares')
    fetch(`https://api.ipsw.me/v4/device/${device.identifier}?type=ipsw`)
      .then((res) => res.json())
      .then((data) => setFirmwares(data.firmwares || []))
      .catch(() => setError('Could not load firmware versions.'))
      .finally(() => setLoading(false))
  }

  const goHome = () => {
    setView('home')
    setSelectedDevice(null)
    setFirmwares([])
    setError('')
  }

  if (view === 'firmwares') {
    return (
      <main className="app firmware-view">
        <header className="topbar">
          <button className="brand" onClick={goHome} aria-label="Back to catalog">
            <span className="brand-mark">⌁</span><span>IPSW<span className="brand-muted">/</span>ARCHIVE</span>
          </button>
        </header>
        <section className="firmware-hero">
          <button className="back-link" onClick={goHome}>← Back to devices</button>
          <p className="eyebrow">DEVICE / {selectedDevice?.identifier}</p>
          <h1>{selectedDevice?.name}</h1>
          <p className="lede">All available IPSW files and current signing status.</p>
        </section>
        {error && <div className="notice error">{error}</div>}
        {loading ? <div className="empty-state"><span className="loader" />Checking the firmware archive…</div> : (
          <section className="firmware-list">
            <div className="list-heading"><span>Version</span><span>Release date</span><span>Size</span><span /></div>
            {firmwares.map((fw) => (
              <article className={`firmware-row ${fw.signed ? 'is-signed' : 'is-unsigned'}`} key={`${fw.version}-${fw.buildid}`}>
                <div><strong>{fw.version}</strong><code>{fw.buildid}</code></div>
                <span>{new Date(fw.releasedate).toLocaleDateString('ru-RU')}</span>
                <span>{fw.filesize ? `${(fw.filesize / 1024 / 1024 / 1024).toFixed(2)} GB` : '—'}</span>
                <div className="row-action"><span className="sign-status"><i />{fw.signed ? 'Signing active' : 'Not signed'}</span><a href={fw.url} target="_blank" rel="noreferrer">Download ↗</a></div>
              </article>
            ))}
            {!firmwares.length && <div className="empty-state">No firmware found for this device.</div>}
          </section>
        )}
      </main>
    )
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">⌁</span><span>IPSW<span className="brand-muted">/</span>ARCHIVE</span></div>
      </header>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">APPLE FIRMWARE CATALOG / 2026</p><h1>IPSW <span className="title-accent">Downloader</span></h1><p className="lede">Find official firmware for every Apple device — without noise, extra steps, or outdated links.</p></div>
      </section>
      <section className="catalog-bar">
        <div className="search-wrap"><span>⌕</span><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or model…" /><kbd>⌘ K</kbd></div>
      </section>
      <nav className="filters" aria-label="Device categories">
        {categories.map((cat) => <button className={selectedCategory === cat ? 'active' : ''} key={cat} onClick={() => setSelectedCategory(cat)}>{categoryLabels[cat]}</button>)}
      </nav>
      {error && <div className="notice error">{error}</div>}
      {loading ? <div className="empty-state"><span className="loader" />Loading device catalog…</div> : <section className="device-grid">
        {filteredDevices.map((device, index) => <button className="device-card" key={device.identifier} onClick={() => handleDeviceSelect(device)}>
          <span className="card-index">{String(index + 1).padStart(2, '0')}</span><div className="device-image"><img src={getDeviceImage(device)} alt="" /></div><span className="device-category">{categorizeDevice(device)}</span><strong>{device.name}</strong><code>{device.identifier}</code><span className="card-arrow">↗</span>
        </button>)}
        {!filteredDevices.length && <div className="empty-state">Nothing found. Try a different name.</div>}
      </section>}
      <footer><span>IPSW / ARCHIVE</span><span>by lumid_off · by iOSDumps · <a href="https://t.me/iOSDumps" target="_blank" rel="noreferrer">TG (t.me/iOSDumps)</a></span></footer>
    </main>
  )
}

export default App
