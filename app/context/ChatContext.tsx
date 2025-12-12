'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
    isOpen: boolean;
    activeIntent: string | null;
    openChat: () => void;
    closeChat: () => void;
    openChatWithIntent: (message: string) => void;
    clearIntent: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIntent, setActiveIntent] = useState<string | null>(null);

    const openChat = () => setIsOpen(true);
    const closeChat = () => setIsOpen(false);

    const openChatWithIntent = (message: string) => {
        setActiveIntent(message);
        setIsOpen(true);
    };

    const clearIntent = () => setActiveIntent(null);

    return (
        <ChatContext.Provider value={{ isOpen, activeIntent, openChat, closeChat, openChatWithIntent, clearIntent }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
