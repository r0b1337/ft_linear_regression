import fs from 'fs';

const { ø0, ø1 } = JSON.parse(fs.readFileSync(import.meta.dir + '/thresholds.json', 'utf8'));
export const estimatePrice = (mileage: number) => ø0 + (ø1 * mileage);