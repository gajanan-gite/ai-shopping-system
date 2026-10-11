// Row format:
// [name, brand, price, rating, size_inch, resolution, panel, refresh_hz, strengths, weaknesses]
const rows = [
  ['LG 22MR410', 'LG', 8499, 4.1, 22, 'FHD', 'VA', 75, 'value', 'stand,brightness'],
  ['Samsung S24C310', 'Samsung', 8999, 4.2, 24, 'FHD', 'IPS', 75, 'color,value', 'stand,speakers'],
  ['Dell SE2425H', 'Dell', 8499, 4.2, 24, 'FHD', 'VA', 75, 'value,build', 'stand,brightness'],
  ['HP M24f', 'HP', 9499, 4.2, 24, 'FHD', 'IPS', 75, 'color,value,build', 'stand,speakers'],
  ['Acer Nitro VG240Y', 'Acer', 11999, 4.3, 24, 'FHD', 'IPS', 165, 'refresh,value,color', 'stand,backlight_bleed'],
  ['BenQ GW2480', 'BenQ', 10999, 4.3, 24, 'FHD', 'IPS', 60, 'color,build', 'speakers,low_refresh'],
  ['AOC 24G2', 'AOC', 13999, 4.5, 24, 'FHD', 'IPS', 144, 'refresh,color,value', 'backlight_bleed,stand'],
  ['LG 24GQ50F', 'LG', 12999, 4.3, 24, 'FHD', 'VA', 165, 'refresh,value', 'brightness,stand'],
  ['Samsung Odyssey G3 (G30D)', 'Samsung', 17499, 4.3, 27, 'FHD', 'VA', 165, 'refresh,build', 'brightness,stand'],
  ['Dell S2721DGF', 'Dell', 31999, 4.6, 27, 'QHD', 'IPS', 165, 'refresh,color,resolution,ergonomics', 'expensive'],
  ['LG UltraGear 27GP850-B', 'LG', 32999, 4.6, 27, 'QHD', 'Nano IPS', 165, 'color,refresh,resolution', 'backlight_bleed,expensive'],
  ['Gigabyte M27Q', 'Gigabyte', 27999, 4.5, 27, 'QHD', 'IPS', 170, 'refresh,resolution,ports', 'backlight_bleed,speakers'],
  ['MSI G274QPF', 'MSI', 26999, 4.4, 27, 'QHD', 'IPS', 170, 'refresh,color', 'stand,speakers'],
  ['ASUS TUF Gaming VG27AQ', 'ASUS', 29999, 4.5, 27, 'QHD', 'IPS', 165, 'refresh,build,resolution', 'backlight_bleed'],
  ['ASUS ProArt PA278QV', 'ASUS', 27999, 4.6, 27, 'QHD', 'IPS', 75, 'color,ergonomics,build', 'low_refresh,expensive'],
  ['LG UltraGear 27GR95QE OLED', 'LG', 74999, 4.5, 27, 'QHD', 'OLED', 240, 'color,refresh,resolution', 'expensive,brightness'],
  ['Samsung Odyssey G5 (32" Curved)', 'Samsung', 27999, 4.3, 32, 'QHD', 'VA', 165, 'resolution,refresh', 'brightness,stand'],
  ['Dell U2723QE', 'Dell', 58999, 4.6, 27, '4K', 'IPS Black', 60, 'color,ports,resolution,ergonomics', 'expensive,low_refresh'],
  ['LG 27UP850K', 'LG', 36999, 4.4, 27, '4K', 'IPS', 60, 'color,resolution,ports', 'low_refresh,speakers'],
  ['BenQ MOBIUZ EX2710Q', 'BenQ', 28999, 4.4, 27, 'QHD', 'IPS', 165, 'refresh,color,build', 'expensive'],
];

module.exports = rows.map(
  ([name, brand, price, rating, size_inch, resolution, panel, refresh_rate_hz, pos, neg]) => ({
    name, brand, category: 'monitor', price, rating,
    ram_gb: null, storage_gb: null, processor: null, gpu: null,
    display: `${size_inch}" ${resolution} ${panel} ${refresh_rate_hz}Hz`,
    specs: { size_inch, resolution, panel, refresh_rate_hz },
    pos: pos.split(','),
    neg: neg.split(','),
  })
);