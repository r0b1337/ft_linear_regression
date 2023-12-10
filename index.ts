import fs from 'fs';

const parseDataset = (dataset: string) => {
  const lines = dataset.split("\n").slice(1).filter(Boolean);
  
  return lines.map((line) => {
    const [km, price] = line.split(",").map(Number);

    return { km, price };
  });
}

const dataset = parseDataset(fs.readFileSync(import.meta.dir + '/data.csv', 'utf8'));
const { ø0, ø1 } = JSON.parse(fs.readFileSync(import.meta.dir + '/thresholds.json', 'utf8'));

export const estimatePrice = (mileage: number) => ø0 + (ø1 * mileage);

export const trainModel = () => {}

console.log(dataset);