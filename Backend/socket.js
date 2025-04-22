const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);

        // Debug all received events (optional, remove in prod)
        socket.onAny((event, data) => {
            console.log(`📩 Event received: ${event}`, data);
        });

        socket.on('join', async (data) => {
            try {
                console.log(`➡️ Join request from ${socket.id} with data:`, data);

                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid data received');
                }

                const { userId, userType } = data;

                // Validate required fields
                if (!userId) {
                    throw new Error(`Missing userId in join payload`);
                }
                if (!userType) {
                    throw new Error(`Missing userType in join payload`);
                }

                const normalizedUserType = userType.toLowerCase().trim();

                if (!['user', 'captain'].includes(normalizedUserType)) {
                    throw new Error(`Invalid userType: ${userType}`);
                }

                console.log(`✅ User joined: ${userId} as ${normalizedUserType}`);

                // Determine the correct model
                const Model = normalizedUserType === 'user' ? userModel : captainModel;

                // Update user's socketId in DB
                const updateResult = await Model.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    {
                        new: true,
                        runValidators: true,
                        select: '-password'
                    }
                );

                if (!updateResult) {
                    throw new Error(`${normalizedUserType} with ID ${userId} not found`);
                }

                console.log(`📌 Socket ID updated for ${normalizedUserType} ${userId}`);

                // Join room for targeted communication
                socket.join(`${normalizedUserType}-${userId}`);

                // Store data in socket session
                socket.data = {
                    userId,
                    userType: normalizedUserType,
                    socketId: socket.id
                };

                // Acknowledge successful connection
                socket.emit('join_confirmed', {
                    userId,
                    userType: normalizedUserType,
                    socketId: socket.id
                });

            } catch (error) {
                console.error('❌ Join error:', error.message);
                socket.emit('error', {
                    message: 'Failed to join',
                    details: error.message
                });
            }
        });

        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;

                if (!location || !location.ltd || !location.lng) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });

                console.log(`📍 Location updated for captain ${userId}`);
            } catch (error) {
                console.error('❌ Location update error:', error.message);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`⚠️ Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log('📤 Sending message to:', socketId, messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('❗ Socket.io not initialized.');
    }
};

module.exports = { initializeSocket, sendMessageToSocketId };
