import express from "express";
import router from "./routes";
const app = express()

app.use(express.urlencoded({ extended: false }))

app.use("/", router)


app.get('/', (req, res) => {
    const data = {
      succsess: true,
      message: 'Backend is running well'
    }
    return res.json(data)
  })
  
  app.listen(8080, () => {
    console.log(`App runing on port 8080`)
  })