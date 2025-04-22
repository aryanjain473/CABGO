import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    autoConnect: true,
    reconnection: true
});

const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [joinAttempted, setJoinAttempted] = useState(false);

    useEffect(() => {
        function attemptJoin() {
            const userId = localStorage.getItem('userId');
            const userType = localStorage.getItem('userType');
            
            console.log('Checking credentials:', { userId, userType });
            
            if (userId && userType) {
                console.log('🚀 Emitting join event with:', { userId, userType });
                socket.emit('join', { userId, userType });
                setJoinAttempted(true);
            } else {
                console.warn('⚠️ Missing credentials:', {
                    hasUserId: !!userId,
                    hasUserType: !!userType
                });
            }
        }

        socket.on('connect', () => {
            console.log('🟢 Connected to socket server:', socket.id);
            setIsConnected(true);
            attemptJoin();
        });

        socket.on('disconnect', () => {
            console.log('🔴 Disconnected from socket server');
            setIsConnected(false);
        });

        socket.on('join_confirmed', (data) => {
            console.log('✅ Join confirmed by server:', data);
        });

        socket.on('error', (error) => {
            console.error('❌ Socket error:', error);
        });

        // Attempt join if already connected
        if (socket.connected && !joinAttempted) {
            attemptJoin();
        }

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('error');
            socket.off('join_confirmed');
        };
    }, [joinAttempted]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
