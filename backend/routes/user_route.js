import express from 'express';

const router = express.Router();

router.post('/', async(req, res) => {
    const user = req.body;

    if (!user.name || !user.email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json({success: true , data: newUser});
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

router.delete('/:i', async(req, res) => {
    const {id} = req.params;
    console.log("id:",id);
    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'User deleted successfully'});
    }
    catch(error){
        res.status(500).json({success: false, message: 'Server error'});
    }
});

router.get('/', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({success: true, data: users});
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

router.put('/', async(req, res) => {
    const {id} = req.params;
    const user = req.body;

    if (!user.name || !user.email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    try {
        const updatedUser=await User.findByIdAndUpdate(id, user, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({success: true , data: updatedUser});
    } catch (error) {
        console.status(404).error("Error updating user:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

export default router;
