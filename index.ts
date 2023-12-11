import fs from 'fs';

const parseDataset = (dataset: string) => {
  const lines = dataset.split("\n").slice(1).filter(Boolean);
  
  return lines.map((line) => {
    const [km, price] = line.split(",").map(Number);

    return { km, price };
  });
}

const dataset = parseDataset(fs.readFileSync(import.meta.dir + '/data.csv', 'utf8'));
let { ø0, ø1 } = JSON.parse(fs.readFileSync(import.meta.dir + '/thresholds.json', 'utf8'));
const learningRate = 0.1;

const estimatePrice = (mileage: number) => {
  // console.log(ø0, ø1);

  return ø0 + (ø1 * mileage);
}

const trainModel = () => {
  const m = dataset.length;

  // let ø0Sum = 0;
  // let ø1Sum = 0;

  for (let i = 0; i < m; i++) {
    // console.log({ i, ø0Sum, ø1Sum })

    const line = dataset[i];
    const mileage = line.km;
    const price = line.price;

    const tmpø0 = learningRate * ((1 / m) * estimatePrice(mileage) - price);
    const tmpø1 = learningRate * ((1 / m) * (estimatePrice(mileage) - price) * mileage);

    // ø0Sum += tmpø0;
    // ø1Sum += tmpø1;

    ø0 = tmpø0;
    ø1 = tmpø1;
  }

  // ø0 = learningRate * ((1 / m) * ø0Sum);
  // ø1 = learningRate * ((1 / m) * ø1Sum);

  console.log({ ø0, ø1 });
}

trainModel();

console.log(estimatePrice(63060));