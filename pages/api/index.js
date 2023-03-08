import data from "../../assets/data.json"

export default function getData(req, res) {
  res.status(200).json(data["data"]);
}