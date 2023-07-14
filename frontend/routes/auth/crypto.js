import express from 'express'
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();
router.get("/api/users/cryptocurrencies", async (req, res) => {
  console.log("Processing request to /api/users/cryptocurrencies");

  // Получаем токен из куки или локального хранилища
  const { access } = req.cookies;

  // Добавляем лог токена
  console.log("Token:", access);

  try {
    // Делаем запрос к бекенду по адресу из переменной окружения с заголовком Authorization
    const apiRes = await fetch(`${process.env.API_URL}/api/users/cryptocurrencies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    // Добавляем лог статуса ответа от бекенда
    console.log("Status:", apiRes.status);

    const data = await apiRes.json();

    // Добавляем лог данных в консоль
    console.log(data);

    return res.status(apiRes.status).json(data);
  } catch (err) {
    // Добавляем лог ошибки в консоль
    console.log("errror")
    console.error(err);

    return res.status(500).json({
      error: "Something went wrong when trying to retrieve cryptos",
    });
  }
});

export default router;