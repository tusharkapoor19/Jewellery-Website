const Notification = require("../models/notification");

const createNotification = async (data) => {

    console.log("SERVICE DATA:", data);

    return await Notification.create(data);

};

const getNotifications = async (userId) => {

    return await Notification.find({ userId }).sort({
        createdAt: -1
    });

};

const getUnreadCount = async (userId) => {

    return await Notification.countDocuments({
        userId,
        isRead: false
    });

};

const markAsRead = async (id) => {

    return await Notification.findByIdAndUpdate(
        id,
        {
            isRead: true
        },
        {
            new: true
        }
    );

};

const markAllAsRead = async (userId) => {

    return await Notification.updateMany(
        {
            userId,
            isRead: false
        },
        {
            isRead: true
        }
    );

};

const deleteNotification = async (id) => {

    return await Notification.findByIdAndDelete(id);

};

module.exports = {
    createNotification,
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
};