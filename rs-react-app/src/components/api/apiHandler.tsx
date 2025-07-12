export default async function getItems(): Promise<void> {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/item/1');
    const data = await response.json();
    console.log('Пришел ответ:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
  }
}
