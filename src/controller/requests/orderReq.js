import Order from "../../models/Order"

export const addNewOrder = async (req, res) => {
    try{
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch  {
        res.status(400).json({ error: error.message });
    }
}
export const editOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedOrder = await Category.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
export const getItems = (req, res) => {

}

export const updateStatus = async (req, res) => {
    
}