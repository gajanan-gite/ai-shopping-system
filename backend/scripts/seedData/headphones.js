// Row format:
// [name, brand, price, rating, type, battery_hours, has_anc, strengths, weaknesses]
const rows = [
  ['Sony WH-1000XM5', 'Sony', 26990, 4.6, 'Over-ear', 30, true, 'sound,anc,comfort,mic', 'expensive'],
  ['Sony WH-CH720N', 'Sony', 9990, 4.3, 'Over-ear', 35, true, 'comfort,anc,battery', 'weak_bass,plastic_build'],
  ['Bose QuietComfort 45', 'Bose', 24990, 4.6, 'Over-ear', 24, true, 'anc,comfort,sound', 'expensive,mic_quality'],
  ['Sennheiser HD 450BT', 'Sennheiser', 7990, 4.2, 'Over-ear', 30, true, 'sound,comfort', 'connectivity,plastic_build'],
  ['JBL Tune 770NC', 'JBL', 6999, 4.2, 'Over-ear', 70, true, 'battery,bass,value', 'uncomfortable,mic_quality'],
  ['JBL Tune 520BT', 'JBL', 3499, 4.1, 'On-ear', 57, false, 'battery,bass,value', 'mic_quality,plastic_build'],
  ['boAt Rockerz 450', 'boAt', 1499, 3.9, 'On-ear', 15, false, 'value,bass', 'plastic_build,mic_quality,connectivity'],
  ['boAt Airdopes 141', 'boAt', 1299, 3.9, 'TWS earbuds', 42, false, 'value,battery,bass', 'mic_quality,connectivity'],
  ['boAt Rockerz 551 ANC', 'boAt', 2999, 4.0, 'Over-ear', 100, true, 'battery,value', 'mic_quality,weak_bass'],
  ['Apple AirPods Pro (2nd Gen)', 'Apple', 24900, 4.7, 'TWS earbuds', 30, true, 'sound,anc,mic,comfort', 'expensive'],
  ['Apple AirPods (3rd Gen)', 'Apple', 17900, 4.5, 'TWS earbuds', 30, false, 'sound,mic', 'expensive,uncomfortable'],
  ['Samsung Galaxy Buds2 Pro', 'Samsung', 17999, 4.3, 'TWS earbuds', 29, true, 'sound,anc,comfort', 'expensive,connectivity'],
  ['OnePlus Buds Pro 2', 'OnePlus', 11999, 4.3, 'TWS earbuds', 39, true, 'sound,anc,bass', 'connectivity,uncomfortable'],
  ['OnePlus Nord Buds 2', 'OnePlus', 2999, 4.2, 'TWS earbuds', 36, true, 'value,bass,battery', 'mic_quality,plastic_build'],
  ['Realme Buds Air 5 Pro', 'Realme', 4999, 4.1, 'TWS earbuds', 40, true, 'bass,anc,value', 'mic_quality,connectivity'],
  ['Nothing Ear (a)', 'Nothing', 7999, 4.3, 'TWS earbuds', 42, true, 'sound,build,anc', 'connectivity,mic_quality'],
  ['Sony WF-1000XM5', 'Sony', 19990, 4.5, 'TWS earbuds', 24, true, 'sound,anc,comfort', 'expensive'],
  ['Sennheiser Momentum 4', 'Sennheiser', 24990, 4.5, 'Over-ear', 60, true, 'sound,battery,comfort', 'expensive,plastic_build'],
  ['Logitech G435 Wireless Gaming Headset', 'Logitech', 5495, 4.2, 'Over-ear', 18, false, 'comfort,mic,value', 'weak_bass,plastic_build'],
  ['HyperX Cloud II', 'HyperX', 8499, 4.5, 'Over-ear (wired)', 0, false, 'comfort,mic,sound', 'plastic_build'],
];

module.exports = rows.map(
  ([name, brand, price, rating, type, battery_hours, anc, pos, neg]) => ({
    name, brand, category: 'headphones', price, rating,
    ram_gb: null, storage_gb: null, processor: null, gpu: null, display: null,
    specs: { type, battery_hours, anc },
    pos: pos.split(','),
    neg: neg.split(','),
  })
);