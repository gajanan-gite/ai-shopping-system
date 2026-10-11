// Sentence templates used to generate demo reviews.
// Each product lists "strengths" and "weaknesses" keys; the seed script picks
// matching sentences, so a product's recurring complaint appears in many reviews.
// That gives the Review Agent something real to detect later.

const openers = {
  good: ['Very happy with this purchase.', 'Excellent product, would recommend.', 'Great buy overall.'],
  mid: ['Decent product but not perfect.', 'Okay for the price.', 'Good in some ways, average in others.'],
  bad: ['Disappointed with this purchase.', 'Not what I expected.', 'Has too many problems for me.'],
};

const banks = {
  laptop: {
    pos: {
      performance: ['Handles coding, multitasking and heavy apps without any lag.', 'Very fast for the price, VS Code and Docker run smoothly.'],
      battery: ['Battery easily lasts a full workday.', 'Great battery life, I get 7-8 hours on normal use.'],
      display: ['The display is sharp with great colours.', 'Screen quality is excellent and very bright.'],
      build: ['Build quality feels solid and premium.', 'Sturdy body with no flex in the keyboard deck.'],
      keyboard: ['Typing experience is very comfortable.', 'The keyboard feels great for long coding sessions.'],
      value: ['Excellent value for money.', 'Great features at this price point.'],
      portability: ['Light and easy to carry around daily.', 'Slim and portable, fits easily in my bag.'],
      gaming: ['Runs games like Valorant and GTA V smoothly at high settings.', 'Gaming performance is great with the high refresh rate screen.'],
    },
    neg: {
      heating: ['Gets quite hot while gaming.', 'Heats up noticeably under heavy load.'],
      fan_noise: ['Fans get very loud under load.', 'Fan noise is distracting during long sessions.'],
      weight: ['It is quite heavy to carry around.', 'Bulky and heavy, not ideal for travel.'],
      short_battery: ['Battery drains fast, around 3 hours only.', 'Battery life is poor when gaming or on heavy use.'],
      webcam: ['Webcam quality is poor.', 'The 720p webcam looks grainy in video calls.'],
      display_dim: ['Screen is a bit dim, hard to use outdoors.', 'Display brightness is average and colours look washed out.'],
      slow: ['Feels slow when many tabs and apps are open.', 'Struggles with heavier workloads.'],
      limited_storage: ['Base storage fills up quickly.', 'Storage is too small for the price.'],
      expensive: ['Quite expensive for what it offers.', 'Premium pricing is hard to justify.'],
      plastic_build: ['The plastic body feels cheap.', 'Build feels a bit flimsy.'],
    },
  },
  smartphone: {
    pos: {
      camera: ['Camera captures detailed photos in daylight.', 'Excellent camera, photos look natural and sharp.'],
      battery: ['Battery easily lasts more than a day.', 'Great battery backup even with heavy usage.'],
      performance: ['Smooth performance, apps and games run without lag.', 'Very fast and responsive in daily use.'],
      display: ['The display is bright and vibrant.', 'Smooth high refresh rate screen, great for videos.'],
      value: ['Great value for money.', 'Best phone in this price range.'],
      software: ['Clean software with timely updates.', 'The UI is smooth and almost free of ads.'],
      charging: ['Fast charging fills the battery in under an hour.', 'Charging is really quick.'],
      build: ['Premium build and looks great.', 'Feels sturdy and well built.'],
    },
    neg: {
      heating: ['Phone gets warm while gaming.', 'Heats up during long camera or gaming use.'],
      camera_low_light: ['Camera struggles in low light.', 'Night photos are noisy and soft.'],
      bloatware: ['Too many pre-installed apps and ads.', 'Bloatware is annoying to remove.'],
      slow_charging: ['Charging is slow compared with rivals.', 'Takes a long time to charge fully.'],
      weight: ['It is heavy and a bit hard to hold for long.', 'Quite bulky and heavy.'],
      battery_drain: ['Battery drains faster than expected.', 'Battery life is only average with heavy use.'],
      slow: ['Lags a bit when multitasking.', 'Performance is average for heavy apps.'],
      expensive: ['Overpriced compared with competitors.', 'Too expensive for the features offered.'],
    },
  },
  headphones: {
    pos: {
      sound: ['Sound quality is clear and well balanced.', 'Crisp highs and detailed audio, great for music.'],
      bass: ['Bass is punchy and fun.', 'Deep bass makes music and games enjoyable.'],
      anc: ['Noise cancellation works really well on commutes.', 'ANC blocks most background noise.'],
      battery: ['Battery lasts for days on a single charge.', 'Excellent battery life.'],
      comfort: ['Very comfortable even after hours of wear.', 'Lightweight and comfortable for long sessions.'],
      value: ['Great sound for the price.', 'Very good value for money.'],
      build: ['Feels well built and durable.', 'Solid, premium build quality.'],
      mic: ['The mic is clear on calls and meetings.', 'Voice pickup is excellent for gaming and calls.'],
    },
    neg: {
      uncomfortable: ['Becomes uncomfortable after a couple of hours.', 'Ear pads press tightly and cause fatigue.'],
      mic_quality: ['Microphone quality is poor on calls.', 'People say my voice sounds muffled on calls.'],
      connectivity: ['Bluetooth connection drops occasionally.', 'Pairing is sometimes unreliable.'],
      expensive: ['Too expensive compared with similar options.', 'The price is on the higher side.'],
      weak_bass: ['Bass is a bit weak for my taste.', 'Lacks low-end punch.'],
      plastic_build: ['The plastic build feels cheap.', 'Build quality could be better.'],
    },
  },
  monitor: {
    pos: {
      color: ['Colours are accurate and vibrant.', 'Great colour reproduction for the price.'],
      refresh: ['High refresh rate makes gaming very smooth.', 'Smooth motion, great for fast-paced games.'],
      build: ['Solid build and clean design.', 'Slim bezels and sturdy build.'],
      value: ['Excellent value for money.', 'Great monitor at this price.'],
      resolution: ['Text and images look very sharp.', 'The sharp resolution is great for productivity and gaming.'],
      ergonomics: ['The stand is fully adjustable for height and tilt.', 'Easy to adjust and set up comfortably.'],
      ports: ['Plenty of ports including USB-C, very convenient.', 'Good connectivity options reduce desk clutter.'],
    },
    neg: {
      backlight_bleed: ['Some backlight bleed visible in dark scenes.', 'Noticeable backlight bleeding on the edges.'],
      speakers: ['Built-in speakers are weak or missing.', 'Speakers are basic, you will need external ones.'],
      stand: ['The stand is wobbly and only tilts.', 'Stand has limited adjustability.'],
      brightness: ['Brightness is low in well-lit rooms.', 'The display could be brighter.'],
      expensive: ['Pricey compared to other monitors.', 'Costly for the features offered.'],
      low_refresh: ['Only 60Hz, not great for gaming.', 'Low refresh rate is a drawback for gamers.'],
    },
  },
};

module.exports = { openers, banks };