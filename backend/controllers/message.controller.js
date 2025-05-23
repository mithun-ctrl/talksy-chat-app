import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import couldinary from "../lib/couldinary.js";
import {getReceiverSocketId, io} from "../lib/socket.js";

export const getUsersForSideBar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(error){
        console.log("Error from getUserSideBar", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessages  = async (req, res) => {
    try{
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ]
        })

        res.status(200).json(messages);
    }catch (error) {
        console.log("Error from getMessages", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const sendMessages = async (req, res) => {
    try{
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;

        if (image) {
            const uploadResponse = await couldinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,

        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(200).json(newMessage);

    }catch(error){
        console.log("Error from sendMessages", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}