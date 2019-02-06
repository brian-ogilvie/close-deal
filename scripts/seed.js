const { User, Product, Review, Transaction } = require('../models')

const seed = async () => {
  try {
    await User.truncate({cascade: true, restartIdentity: true})
    await Product.truncate({cascade:true, restartIdentity: true})
    await Transaction.truncate({cascade: true, restartIdentity:true})
    await Review.truncate({restartIdentity: true})

    await User.bulkCreate([
      {email: 'brian@brianogilvie.com', first_name: 'Brian', last_name: 'Ogilvie', password: 'abc123'},
      {email: 'daniel.kim@gmail.com', password: 'abc123', first_name: 'Daniel', last_name: 'Kim'},
      {email: 'jose@cruz.net', password: 'abc123', first_name: 'Jose', last_name: 'Cruz'}
    ], {
      validate: true,
      individualHooks: true
    })

    await Product.bulkCreate([
      {
        name: 'Awesome Lamp',
        price: 149.63,
        image_url: 'https://img.letgo.com/images/f1/24/86/49/f12486498172eb9dc20c28514cdd5c0e.jpeg?impolicy=img_600',
        description: 'Red and Blue hand painted ceramic Bambanani 3 Lady Lamp base is 14 inches tall. Very decorative and Includes the silver metal lamp shade (pictured) with hand drilled cutout design created to let light pass through when on. Red beads are added around the top and bottom of the shade. Treat yourself or Lovely Gift. The lamp is part of the Bambanani collection from Zizamele Ceramics and Imported from South Africa as a fair trade item. Ceramic Lamp base:  14" H x  4.72" W.  Metal Shade: 10.24" H x 11.81" in diameter.',
        user_id: 1,
      },
      {
        name: 'Cordless Drill',
        price: 44,
        image_url: 'https://img.letgo.com/images/ed/ec/e9/07/edece907802ac3c6fd9c439d047269bb.jpg?impolicy=img_600',
        description: 'This is the best drill I\'ve ever used. Feel manly and useful just by taking it in your hand and squeezing the trigger.',
        user_id: 1,
      },
      {
        name: ' Nikon FM2N 35mm Film Camera',
        price: 250,
        image_url: 'https://img.letgo.com/images/23/1a/5b/2d/231a5b2da27d531bd261be2397bb8306.jpeg?impolicy=img_600',
        description: 'Nikon FM2n 35mm Film Camera. Great condition. Fully functioning. Meter is working and all shutter speeds are working. Film tested and ready for use. Tripod plate included.',
        user_id: 1,
      },
      {
        name: 'Digimon Season 1 Digivice',
        price: 25.00,
        image_url: 'https://images3.sw-cdn.net/product/picture/710x528_15929000_8561872_1522060884.jpg',
        description: '3D printed model of the original Digivice!',
        user_id: 2,
      },
      {
        name: 'almost deck',
        price: 39.95,
        image_url: 'https://cdn.ccs.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/8/0/805538643459-1.1548333230.jpg',
        description: 'Almost coming in correct with their New Wave',
        user_id: 3,
      },
      {
        name: 'Punisher Kevlar Vest',
        price: 385,
        image_url: 'http://action-figure-district.de/wp-content/uploads/2017/06/tw-punisher05.jpg',
        description: 'Commit a sin and be prepared for any punishment.',
        user_id: 2,
      },
      {
        name: 'Final Fantasy 7 Buster Sword',
        price: 863.50,
        image_url: 'https://i.etsystatic.com/15773976/d/il/4e8ea2/1650231396/il_340x270.1650231396_6kt6.jpg?version=0',
        description: 'From summoning Bahamut to slicing down Shinra Corporation, this sword can do it all! Get your\'s today. (Materia not included)',
        user_id: 2,
      },
      {
        name: 'MacBook Pro',
        price: 1799,
        image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/m/bp/mbp13touch/space/mbp13touch-space-select-201807?wid=452&hei=420&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1529520060550',
        description: 'It\'s apple so just buy it',
        user_id: 3,
      },
      {
        name: 'Ludwig Questlove Pocket Kit Drum Set - Black Sparkle',
        price: 250,
        image_url: 'https://media.sweetwater.com/api/i/f-webp__q-82__ha-a90197f7cfebf02d__hmac-b4d65c3ad217f6b81ee73a4b3a98a41fb95a93ae/images/items/750/PocketKit-BS-large.jpg.auto.webp',
        description: 'it works, trust us.',
        user_id: 3,
      },
    ])

    await Review.bulkCreate([
      {
        stars: 5,
        comment: 'This guy was laid back and awesome',
        poster_id: 1,
        subject_id: 3
      },
      {
        stars: 2,
        comment: 'Couldn\'t find his apartment!',
        poster_id: 3,
        subject_id: 1
      },
      {
        stars: 4,
        comment: 'Nice guy, but he kept playing the guitar during pickup. Sort of weird.',
        poster_id: 2,
        subject_id: 1
      },
      {
        stars: 3,
        comment: 'Great customer service. Lackluster bedside manner.',
        poster_id: 1,
        subject_id: 2
      },
      {
        stars: 1,
        comment: 'Don\'t trust this guy. He\'s a criminal.',
        poster_id: 2,
        subject_id: 3
      },    
    ])

    console.log('🗂  database seed complete')
  } catch (e) {
    console.error('‼️ ', e.message)
  }
  process.exit()
}

seed()
