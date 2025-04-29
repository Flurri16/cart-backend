import Item from "../models/Item.js";

// Создаём item
export const addItem = async (req, res) => {
    try {
        const { title, text, cost } = req.body;

        let imgUrl = '';

        if (req.file) {
            imgUrl = '/uploads/' + req.file.filename; // сохраняем путь если есть файл
        }

        const newItem = new Item({
            title,
            text,
            cost,
            imgUrl, // будет пустым если нет файла
        });

        await newItem.save();

        res.json({newItem, message: "Item was added in data base."});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка при добавлении item' });
    }
};
export const getAll = async (req, res) => {
    try {
        const items = await Item.find()
        return res.json({items})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "Error all"})
    }
}
export const remove = async (req, res) => {
    try {
        const {id} = req.params
        await Item.findByIdAndDelete(id)
        return res.json({message: "Item was deleted"})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "Error delete"})
    }
}
export const getOne = async (req, res) => {
    try {
      const { id } = req.params
      const item = await Item.findById(id)
      if (!item) {
        return res.status(404).json({ message: 'Item not found' })
      }
      return res.json(item)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Error getting item' })
    }
  }
  