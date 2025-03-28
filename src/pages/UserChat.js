import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BaseUrl, fetchUser, timeAgo } from '../utils/data';
import { useParams } from 'react-router-dom';

const UserChat = () => {
  const { recId } = useParams();

  const [activeConversation, setActiveConversation] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const [onlineStatus, setOnlineStatus] = useState('Offline');
  const [id, setId] = useState('');

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Scroll to the bottom of the chat messages
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    setId(userId);
    scrollToBottom();
  }, [activeConversation, conversations, scrollToBottom]);

  // Initialize WebSocket and handle events
  useEffect(() => {
    if (recId) {
      const userId = localStorage.getItem('id');
      fetchChat(recId);

      const ws = new WebSocket('https://yt-realtime-production.up.railway.app');
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        ws.send(
          JSON.stringify({
            type: 'join_room',
            senderId: userId,
            receiverId: recId,
          })
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'receive_message') {
          setActiveConversation((prevMessages) => [...prevMessages, data.message]);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      return () => {
        ws.close();
      };
    }
  }, [recId]);

  // Fetch the list of conversations
  const fetchChatList = useCallback(async () => {
    try {
      const userId = localStorage.getItem('id');
      const response = await fetch(`${BaseUrl}/chatList/${userId}`);
      const json = await response.json();
      setConversations(json);
    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  }, []);

  // Fetch a single chat
  const fetchChat = useCallback(async (senderId) => {
    try {
      const userId = localStorage.getItem('id');
      const response = await fetch(`${BaseUrl}/singlechat/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId }),
      });
      const json = await response.json();
      setActiveConversation(json);

      const receiver = await fetchUser(senderId);
      setReceiverName(receiver.name);
      setOnlineStatus(receiver.online ? 'Online' : 'Offline');
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  }, []);

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    const userId = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const receiverId =
      activeConversation[0]?.receiverId === userId
        ? activeConversation[0]?.senderId
        : activeConversation[0]?.receiverId;

    const newMessageData = {
      senderId: userId,
      receiverId,
      senderName: name || 'unknown',
      receiverName: receiverName || 'unknown',
      text: newMessage,
      time: new Date().toISOString(),
    };

    try {
      await fetch(`${BaseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessageData),
      });

      socketRef.current?.send(
        JSON.stringify({
          type: 'send_message',
          message: newMessageData,
        })
      );

      setActiveConversation((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    const updatedConversations = conversations.map((conv) =>
      conv._id === conversation._id ? { ...conv, unread: false } : conv
    );
    setConversations(updatedConversations);

    const uid = localStorage.getItem('id');
    if (conversation.receiverId === uid) {
      fetchChat(conversation.senderId);
    } else {
      fetchChat(conversation.receiverId);
    }
  };

  // Handle submitting notes
  const handleNotesSubmit = (e) => {
    e.preventDefault();
    setShowNotesModal(false);
    console.log('Notes saved:', userNotes);
  };

  return (
    <div className="admin-chat" style={{ marginTop: '5%' }}>
      <div className="chat-container" style={{ height: '500px' }}>
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h3>Conversations</h3>
          </div>
          <div className="chat-conversations">
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                className={`chat-conversation-item ${activeConversation?._id === conversation._id ? 'active' : ''
                  } ${conversation?.unread ? 'unread' : ''}`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="chat-user-avatar">
                  {conversation?.receiverId === id
                    ? conversation?.senderName?.charAt(0)
                    : conversation?.receiverName?.charAt(0)}
                </div>
                <div className="chat-conversation-info">
                  <div className="chat-conversation-header">
                    <span className="chat-user-name">
                      {conversation?.receiverId === id
                        ? conversation?.senderName
                        : conversation?.receiverName}
                    </span>
                    <span className="chat-time">
                      {conversation?.createdAt && timeAgo(conversation?.createdAt)}
                    </span>
                  </div>
                  <div className="chat-last-message">
                    {conversation?.text}
                    {conversation.unread && <span className="chat-unread-indicator"></span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          {activeConversation.length > 0 ? (
            <>
              <div className="chat-header">
                <div className="chat-header-user">
                  <div className="chat-user-avatar larger">
                    {receiverName.charAt(0)}
                    {/* {activeConversation[0]?.receiverId === id
                      ? activeConversation[0]?.senderName?.charAt(0)
                      : activeConversation[0]?.receiverName?.charAt(0)} */}
                  </div>
                  <div className="chat-user-info">
                    <h3 className="chat-active-user">{receiverName}</h3>
                    <span className="chat-user-status online">{onlineStatus}</span>
                  </div>
                </div>
              </div>

              <div className="chat-messages">
                {activeConversation.map((message, index) => (
                  <div
                    key={index}
                    className={`chat-message ${message.senderId === id ? 'outgoing' : 'incoming'
                      }`}
                  >
                    <div className="chat-message-content">
                      <p>{message.text}</p>
                      <span className="chat-message-time">
                        {message.createdAt && timeAgo(message.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input">
                <textarea
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="chat-input-field"
                ></textarea>
                <button
                  className="chat-send-btn"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="chat-no-conversation">
              <div className="chat-empty-state">
                <span className="empty-icon">
                  <i className="fa fa-comments fa-3x"></i>
                </span>
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChat;