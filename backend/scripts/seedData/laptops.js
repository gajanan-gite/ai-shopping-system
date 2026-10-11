// Row format:
// [name, brand, price, rating, ram_gb, storage_gb, processor, gpu, display, strengths, weaknesses]
// strengths/weaknesses are "trait keys"; the seed script turns them into review sentences.
const rows = [
  ['ASUS Vivobook 15 (X1502)', 'ASUS', 38990, 4.0, 8, 512, 'Intel Core i3-1315U', 'Intel UHD Graphics', '15.6" FHD IPS 60Hz', 'value,portability', 'slow,webcam'],
  ['Acer Aspire 5 (A515)', 'Acer', 44990, 4.1, 16, 512, 'Intel Core i5-1235U', 'Intel Iris Xe Graphics', '15.6" FHD IPS 60Hz', 'value,keyboard,performance', 'webcam,display_dim'],
  ['Lenovo IdeaPad Slim 3', 'Lenovo', 42990, 4.0, 8, 512, 'AMD Ryzen 5 7520U', 'AMD Radeon 610M', '15.6" FHD 60Hz', 'value,battery', 'slow,display_dim'],
  ['HP Pavilion 14', 'HP', 62990, 4.2, 16, 512, 'Intel Core i5-1335U', 'Intel Iris Xe Graphics', '14" FHD IPS 60Hz', 'build,portability,display', 'fan_noise,webcam'],
  ['Dell Inspiron 15', 'Dell', 52990, 4.0, 16, 512, 'AMD Ryzen 5 5625U', 'AMD Radeon Graphics', '15.6" FHD 120Hz', 'performance,value', 'weight,webcam'],
  ['Lenovo IdeaPad Gaming 3', 'Lenovo', 64990, 4.3, 16, 512, 'AMD Ryzen 5 6600H', 'NVIDIA RTX 3050 4GB', '15.6" FHD IPS 120Hz', 'gaming,performance,keyboard', 'heating,fan_noise,short_battery'],
  ['ASUS TUF Gaming F15', 'ASUS', 67990, 4.4, 16, 512, 'Intel Core i5-11400H', 'NVIDIA RTX 3050 4GB', '15.6" FHD IPS 144Hz', 'gaming,build,value', 'heating,weight,short_battery'],
  ['HP Victus 15', 'HP', 54990, 4.1, 16, 512, 'AMD Ryzen 5 5600H', 'NVIDIA GTX 1650 4GB', '15.6" FHD IPS 144Hz', 'gaming,value', 'heating,display_dim'],
  ['Acer Nitro V 15', 'Acer', 71990, 4.3, 16, 512, 'Intel Core i5-13420H', 'NVIDIA RTX 4050 6GB', '15.6" FHD IPS 144Hz', 'gaming,performance,display', 'heating,weight,fan_noise'],
  ['MSI Thin GF63', 'MSI', 58990, 4.1, 16, 512, 'Intel Core i5-12450H', 'NVIDIA RTX 2050 4GB', '15.6" FHD IPS 144Hz', 'gaming,portability', 'heating,short_battery,webcam'],
  ['Lenovo LOQ 15', 'Lenovo', 76990, 4.5, 16, 512, 'AMD Ryzen 5 7640HS', 'NVIDIA RTX 3050 6GB', '15.6" FHD IPS 144Hz', 'gaming,performance,keyboard,display', 'fan_noise,weight'],
  ['ASUS Vivobook Pro 15 OLED', 'ASUS', 84990, 4.4, 16, 512, 'AMD Ryzen 7 6800H', 'NVIDIA RTX 3050 4GB', '15.6" FHD OLED 60Hz', 'display,performance,build', 'short_battery,heating'],
  ['Dell G15', 'Dell', 89990, 4.2, 16, 512, 'AMD Ryzen 7 7840HS', 'NVIDIA RTX 4050 6GB', '15.6" FHD 120Hz', 'gaming,performance', 'heating,weight,fan_noise'],
  ['HP Omen 16', 'HP', 104990, 4.5, 16, 1024, 'Intel Core i7-13700HX', 'NVIDIA RTX 4060 8GB', '16.1" QHD IPS 165Hz', 'gaming,performance,display', 'weight,heating,short_battery'],
  ['ASUS ROG Strix G16', 'ASUS', 129990, 4.6, 16, 1024, 'Intel Core i7-13650HX', 'NVIDIA RTX 4060 8GB', '16" FHD+ IPS 165Hz', 'gaming,performance,build', 'weight,fan_noise'],
  ['Lenovo Legion 5i', 'Lenovo', 119990, 4.6, 16, 1024, 'Intel Core i7-14650HX', 'NVIDIA RTX 4060 8GB', '15.6" WQHD IPS 165Hz', 'gaming,keyboard,performance', 'weight'],
  ['MSI Katana 15', 'MSI', 94990, 4.3, 16, 1024, 'Intel Core i7-13620H', 'NVIDIA RTX 4060 8GB', '15.6" FHD IPS 144Hz', 'gaming,value', 'heating,short_battery,webcam'],
  ['Acer Predator Helios Neo 16', 'Acer', 114990, 4.5, 16, 1024, 'Intel Core i7-13700HX', 'NVIDIA RTX 4060 8GB', '16" WUXGA IPS 165Hz', 'gaming,performance,display', 'weight,fan_noise'],
  ['Apple MacBook Air M1', 'Apple', 69990, 4.7, 8, 256, 'Apple M1', 'Apple 7-core GPU', '13.3" Retina IPS 60Hz', 'battery,build,portability,performance', 'limited_storage'],
  ['Apple MacBook Air M2', 'Apple', 94990, 4.7, 8, 256, 'Apple M2', 'Apple 8-core GPU', '13.6" Liquid Retina 60Hz', 'battery,build,display,portability', 'limited_storage,expensive'],
  ['Apple MacBook Pro 14 (M3)', 'Apple', 169900, 4.8, 16, 512, 'Apple M3', 'Apple 10-core GPU', '14.2" Liquid Retina XDR 120Hz', 'performance,battery,display,build', 'expensive'],
  ['Dell XPS 13', 'Dell', 139990, 4.4, 16, 512, 'Intel Core Ultra 7 155H', 'Intel Arc Graphics', '13.4" FHD+ IPS 60Hz', 'build,portability,display', 'short_battery,expensive'],
  ['HP Spectre x360 14', 'HP', 149990, 4.4, 16, 1024, 'Intel Core Ultra 7 155H', 'Intel Arc Graphics', '14" 2.8K OLED 120Hz Touch', 'display,build,portability', 'expensive,fan_noise'],
  ['Lenovo ThinkPad E14 Gen 5', 'Lenovo', 66990, 4.3, 16, 512, 'Intel Core i5-1335U', 'Intel Iris Xe Graphics', '14" FHD IPS 60Hz', 'keyboard,build,battery', 'display_dim,webcam'],
  ['Lenovo ThinkPad T14 Gen 4', 'Lenovo', 118000, 4.5, 16, 512, 'AMD Ryzen 7 PRO 7840U', 'AMD Radeon 780M', '14" WUXGA IPS 60Hz', 'keyboard,build,battery,performance', 'expensive'],
  ['ASUS Zenbook 14 OLED', 'ASUS', 79990, 4.5, 16, 512, 'Intel Core Ultra 5 125H', 'Intel Arc Graphics', '14" 2.8K OLED 120Hz', 'display,portability,battery,performance', 'webcam'],
  ['Acer Swift Go 14', 'Acer', 72990, 4.3, 16, 512, 'Intel Core i5-13500H', 'Intel Iris Xe Graphics', '14" 2.8K OLED 90Hz', 'display,portability,performance', 'fan_noise,short_battery'],
  ['HP 15s', 'HP', 36990, 3.9, 8, 512, 'AMD Ryzen 5 5500U', 'AMD Radeon Graphics', '15.6" FHD anti-glare 60Hz', 'value', 'slow,display_dim,webcam'],
  ['Lenovo Yoga Slim 7', 'Lenovo', 89990, 4.4, 16, 512, 'AMD Ryzen 7 7735U', 'AMD Radeon 680M', '14" 2.8K OLED 90Hz', 'display,battery,portability,performance', 'webcam,expensive'],
  ['Infinix INBook Y3 Max', 'Infinix', 34990, 3.8, 16, 512, 'Intel Core i5-1235U', 'Intel Iris Xe Graphics', '16" FHD IPS 60Hz', 'value,display', 'plastic_build,slow'],
];

module.exports = rows.map(
  ([name, brand, price, rating, ram_gb, storage_gb, processor, gpu, display, pos, neg]) => ({
    name, brand, category: 'laptop', price, rating, ram_gb, storage_gb, processor, gpu, display,
    specs: {},
    pos: pos.split(','),
    neg: neg.split(','),
  })
);