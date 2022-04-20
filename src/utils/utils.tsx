const API = '70d8c86384c54070875fe68be67e3541';

export default async function getCurrencyRate() {
  try {
    const responce = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${API}`)
    const data = await responce.json();
    return data.rates || {};
  } catch (error) {
    console.log(error);
  }
}