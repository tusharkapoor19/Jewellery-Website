const notificationService =
    require("../service/notification_svc");


// =====================================================
// CREATE
// =====================================================

exports.createNotification = async (
    req,
    res,
    next
) => {

    try {

        console.log(
            "========= CREATE NOTIFICATION ========="
        );

        console.log(
            req.body
        );


        const notification =
            await notificationService
                .createNotification(
                    req.body
                );


        res.status(201).json({

            success: true,

            message:
                "Notification Created Successfully",

            notification

        });

    }

    catch (error) {

        console.log(
            "Notification Controller Error:"
        );

        console.log(error);

        next(error);

    }

};


// =====================================================
// GET
// =====================================================

exports.getNotifications = async (
    req,
    res,
    next
) => {

    try {

        const notifications =
            await notificationService
                .getNotifications(
                    req.params.userId
                );


        res.status(200).json({

            success: true,

            notifications

        });

    }

    catch (error) {

        next(error);

    }

};


// =====================================================
// UNREAD COUNT
// =====================================================

exports.getUnreadCount = async (
    req,
    res,
    next
) => {

    try {

        const count =
            await notificationService
                .getUnreadCount(
                    req.params.userId
                );


        res.status(200).json({

            success: true,

            unreadCount: count

        });

    }

    catch (error) {

        next(error);

    }

};


// =====================================================
// MARK READ
// =====================================================

exports.markAsRead = async (
    req,
    res,
    next
) => {

    try {

        const notification =
            await notificationService
                .markAsRead(
                    req.params.id
                );


        res.status(200).json({

            success: true,

            notification

        });

    }

    catch (error) {

        next(error);

    }

};


// =====================================================
// MARK ALL READ
// =====================================================

exports.markAllAsRead = async (
    req,
    res,
    next
) => {

    try {

        await notificationService
            .markAllAsRead(
                req.params.userId
            );


        res.status(200).json({

            success: true,

            message:
                "All Notifications Read"

        });

    }

    catch (error) {

        next(error);

    }

};


// =====================================================
// DELETE
// =====================================================

exports.deleteNotification = async (
    req,
    res,
    next
) => {

    try {

        await notificationService
            .deleteNotification(
                req.params.id
            );


        res.status(200).json({

            success: true,

            message:
                "Deleted Successfully"

        });

    }

    catch (error) {

        next(error);

    }

};