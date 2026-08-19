const Notification =
    require("../models/notification");

const {
    sendEmail
} =
    require("./email_service");

const {
    sendSMS
} =
    require("./sms_service");


// =====================================================
// CREATE NOTIFICATION
// =====================================================

const createNotification = async (data) => {

    console.log(
        "SERVICE DATA:",
        data
    );


    const {

        userId,

        title,

        message,

        type = "GENERAL",

        email,

        phone

    } = data;


    // =================================================
    // 1. SAVE IN DATABASE
    // =================================================

    const notification =
        await Notification.create({

            userId,

            title,

            message,

            type

        });


    console.log(
        "Notification saved successfully"
    );


    // =================================================
    // 2. SEND EMAIL
    // =================================================

    if (email) {

        try {

            await sendEmail({

                email,

                subject: title,

                title,

                message

            });

        }

        catch (error) {

            console.error(
                "EMAIL ERROR:",
                error.message
            );

        }

    }


    // =================================================
    // 3. SEND SMS
    // =================================================

    if (phone) {

        try {

            await sendSMS({

                phone,

                message

            });

        }

        catch (error) {

            console.error(
                "SMS ERROR:",
                error.message
            );

        }

    }


    // =================================================
    // RETURN DB NOTIFICATION
    // =================================================

    return notification;

};


// =====================================================
// GET NOTIFICATIONS
// =====================================================

const getNotifications = async (userId) => {

    return await Notification.find({

        userId

    }).sort({

        createdAt: -1

    });

};


// =====================================================
// GET UNREAD COUNT
// =====================================================

const getUnreadCount = async (userId) => {

    return await Notification.countDocuments({

        userId,

        isRead: false

    });

};


// =====================================================
// MARK READ
// =====================================================

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


// =====================================================
// MARK ALL READ
// =====================================================

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


// =====================================================
// DELETE
// =====================================================

const deleteNotification = async (id) => {

    return await Notification.findByIdAndDelete(
        id
    );

};


module.exports = {

    createNotification,

    getNotifications,

    getUnreadCount,

    markAsRead,

    markAllAsRead,

    deleteNotification

};