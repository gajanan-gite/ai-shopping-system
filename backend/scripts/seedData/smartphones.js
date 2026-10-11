// Row format:
// [name, brand, price, rating, ram_gb, storage_gb, processor, gpu, display, battery_mah, camera, strengths, weaknesses]
const rows = [
  ['Redmi 13C 5G', 'Xiaomi', 10999, 4.0, 4, 128, 'MediaTek Dimensity 6100+', 'Mali-G57', '6.74" HD+ IPS 90Hz', 5000, '50MP', 'value,battery', 'bloatware,camera_low_light'],
  ['Realme Narzo N65 5G', 'Realme', 11499, 4.0, 6, 128, 'MediaTek Dimensity 6300', 'Mali-G57', '6.67" HD+ IPS 120Hz', 5000, '50MP', 'display,battery,value', 'camera_low_light,bloatware'],
  ['Samsung Galaxy M14 5G', 'Samsung', 12990, 4.1, 6, 128, 'Exynos 1330', 'Mali-G68', '6.6" FHD+ PLS 90Hz', 6000, '50MP', 'battery,software', 'slow_charging,slow'],
  ['Poco M6 Pro 5G', 'Poco', 11999, 4.1, 6, 128, 'Snapdragon 4 Gen 2', 'Adreno 613', '6.79" FHD+ 90Hz', 5000, '50MP', 'display,value', 'bloatware,camera_low_light'],
  ['Motorola G45 5G', 'Motorola', 10999, 4.1, 8, 128, 'Snapdragon 6s Gen 3', 'Adreno 619', '6.5" HD+ 120Hz', 5000, '50MP', 'software,value', 'camera_low_light,slow_charging'],
  ['Redmi Note 13 5G', 'Xiaomi', 17999, 4.2, 8, 128, 'MediaTek Dimensity 6080', 'Mali-G57', '6.67" FHD+ AMOLED 120Hz', 5000, '108MP', 'display,value,battery', 'bloatware,heating'],
  ['Realme 12 Pro 5G', 'Realme', 25999, 4.3, 8, 128, 'Snapdragon 6 Gen 1', 'Adreno 710', '6.7" FHD+ AMOLED 120Hz', 5000, '50MP', 'camera,display,build', 'battery_drain,bloatware'],
  ['Samsung Galaxy A35 5G', 'Samsung', 27999, 4.2, 8, 128, 'Exynos 1380', 'Mali-G68', '6.6" FHD+ Super AMOLED 120Hz', 5000, '50MP', 'software,display,build', 'slow_charging,expensive'],
  ['OnePlus Nord CE4', 'OnePlus', 24999, 4.3, 8, 128, 'Snapdragon 7 Gen 3', 'Adreno 720', '6.7" FHD+ AMOLED 120Hz', 5500, '50MP', 'performance,charging,display', 'camera_low_light,bloatware'],
  ['Poco X6 Pro 5G', 'Poco', 26999, 4.4, 8, 256, 'MediaTek Dimensity 8300 Ultra', 'Mali-G615', '6.67" 1.5K AMOLED 120Hz', 5000, '64MP', 'performance,display,value', 'bloatware,camera_low_light'],
  ['iQOO Z9 5G', 'iQOO', 19999, 4.3, 8, 128, 'MediaTek Dimensity 7200', 'Mali-G610', '6.67" FHD+ AMOLED 120Hz', 5000, '50MP', 'performance,display,value', 'bloatware,slow_charging'],
  ['Nothing Phone (2a)', 'Nothing', 23999, 4.3, 8, 128, 'MediaTek Dimensity 7200 Pro', 'Mali-G610', '6.7" FHD+ AMOLED 120Hz', 5000, '50MP', 'software,build,display', 'camera_low_light,slow_charging'],
  ['Google Pixel 8a', 'Google', 52999, 4.5, 8, 128, 'Google Tensor G3', 'Mali-G715', '6.1" FHD+ OLED 120Hz', 4492, '64MP', 'camera,software', 'slow_charging,heating'],
  ['Samsung Galaxy S23 FE', 'Samsung', 39999, 4.3, 8, 128, 'Exynos 2200', 'Xclipse 920', '6.4" FHD+ AMOLED 120Hz', 4500, '50MP', 'camera,display,software', 'heating,slow_charging'],
  ['OnePlus 12R', 'OnePlus', 39999, 4.5, 8, 128, 'Snapdragon 8 Gen 2', 'Adreno 740', '6.78" AMOLED 120Hz', 5500, '50MP', 'performance,battery,charging,display', 'bloatware,heating'],
  ['OnePlus 12', 'OnePlus', 64999, 4.6, 12, 256, 'Snapdragon 8 Gen 3', 'Adreno 750', '6.82" QHD+ LTPO AMOLED 120Hz', 5400, '50MP', 'performance,camera,display,charging', 'expensive,heating'],
  ['Samsung Galaxy S24', 'Samsung', 74999, 4.5, 8, 256, 'Exynos 2400', 'Xclipse 940', '6.2" FHD+ AMOLED 120Hz', 4000, '50MP', 'camera,display,software,build', 'slow_charging,battery_drain'],
  ['Samsung Galaxy S24 Ultra', 'Samsung', 129999, 4.7, 12, 256, 'Snapdragon 8 Gen 3', 'Adreno 750', '6.8" QHD+ AMOLED 120Hz', 5000, '200MP', 'camera,display,performance,software', 'expensive,weight'],
  ['Apple iPhone 15', 'Apple', 69900, 4.6, 6, 128, 'Apple A16 Bionic', 'Apple 5-core GPU', '6.1" Super Retina XDR OLED 60Hz', 3349, '48MP', 'camera,build,software,performance', 'slow_charging,expensive'],
  ['Apple iPhone 15 Pro', 'Apple', 119900, 4.7, 8, 128, 'Apple A17 Pro', 'Apple 6-core GPU', '6.1" Super Retina XDR OLED 120Hz', 3274, '48MP', 'performance,camera,build', 'heating,expensive'],
  ['Apple iPhone 13', 'Apple', 52999, 4.6, 4, 128, 'Apple A15 Bionic', 'Apple 4-core GPU', '6.1" Super Retina XDR OLED 60Hz', 3240, '12MP', 'camera,build,software,battery', 'slow_charging'],
  ['Google Pixel 9', 'Google', 74999, 4.5, 12, 128, 'Google Tensor G4', 'Mali-G715', '6.3" Actua OLED 120Hz', 4700, '50MP', 'camera,software,display', 'heating,slow_charging'],
  ['Xiaomi 14 Civi', 'Xiaomi', 42999, 4.3, 12, 256, 'Snapdragon 8s Gen 3', 'Adreno 735', '6.55" AMOLED 120Hz', 4700, '50MP', 'camera,performance,display', 'bloatware'],
  ['Vivo V30', 'Vivo', 33999, 4.3, 8, 128, 'Snapdragon 7 Gen 3', 'Adreno 720', '6.78" AMOLED Curved 120Hz', 5000, '50MP', 'camera,display,build', 'bloatware,slow'],
  ['Oppo Reno 11 5G', 'Oppo', 29999, 4.2, 8, 128, 'MediaTek Dimensity 7050', 'Mali-G68', '6.7" AMOLED 120Hz', 5000, '50MP', 'camera,display,build', 'bloatware,battery_drain'],
  ['Realme GT 6T', 'Realme', 30999, 4.4, 8, 128, 'Snapdragon 7+ Gen 3', 'Adreno 732', '6.78" LTPO AMOLED 120Hz', 5500, '50MP', 'performance,charging,display', 'bloatware,camera_low_light'],
  ['Motorola Edge 50 Fusion', 'Motorola', 22999, 4.3, 8, 128, 'Snapdragon 7s Gen 2', 'Adreno 710', '6.7" pOLED 144Hz', 5000, '50MP', 'display,software,build', 'camera_low_light,slow'],
  ['Infinix GT 20 Pro', 'Infinix', 22999, 4.1, 8, 256, 'MediaTek Dimensity 8200 Ultimate', 'Mali-G610', '6.78" AMOLED 144Hz', 5000, '108MP', 'performance,display,value', 'heating,bloatware'],
  ['Lava Agni 2 5G', 'Lava', 19999, 4.1, 8, 256, 'MediaTek Dimensity 7050', 'Mali-G68', '6.78" Curved AMOLED 120Hz', 4700, '50MP', 'software,display,value', 'camera_low_light,slow'],
  ['Tecno Pova 6 Pro', 'Tecno', 19999, 4.0, 8, 256, 'MediaTek Dimensity 6080', 'Mali-G57', '6.78" FHD+ 120Hz', 6000, '108MP', 'battery,charging,value', 'bloatware,camera_low_light'],
];

module.exports = rows.map(
  ([name, brand, price, rating, ram_gb, storage_gb, processor, gpu, display, battery_mah, camera, pos, neg]) => ({
    name, brand, category: 'smartphone', price, rating, ram_gb, storage_gb, processor, gpu, display,
    specs: { battery_mah, camera },
    pos: pos.split(','),
    neg: neg.split(','),
  })
);