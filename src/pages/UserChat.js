import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BaseUrl, fetchUser, markMessagesAsRead, timeAgo, CLOUDINARY_URL } from '../utils/data';
import { useNavigate, useParams } from 'react-router-dom';
import LinkifyText from '../components/LinkifyText';
import { Image } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';

const linkifyOptions = {
  attributes: {
    class: "text-blue-500 hover:text-blue-700 underline decoration-dotted transition-all duration-200",
    target: "_blank",
  },
};

const UserChat = () => {
  const { recId } = useParams();
  const navigate = useNavigate();

  const [activeConversation, setActiveConversation] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [onlineStatus, setOnlineStatus] = useState('Offline');
  const [id, setId] = useState('');
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Scroll to the bottom of the chat messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Fetch user ID and scroll to the bottom
  useEffect(() => {
    const userId = localStorage.getItem('id');
    setId(userId);
    scrollToBottom();
  }, [activeConversation, conversations, scrollToBottom]);

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('Received WebSocket message:', data); // Debug log
      if (data.type === 'receive_message') {
        setActiveConversation((prevMessages) => {
          if (prevMessages.some((msg) => msg._id === data.message._id)) {
            return prevMessages;
          }
          return [...prevMessages, data.message];
        });
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }, []);

  // Initialize WebSocket
  useEffect(() => {
    if (!recId) return;

    const userId = localStorage.getItem('id');
    fetchChat(recId);
    markMessagesAsRead(userId, recId);

    const connectWebSocket = () => {
      const ws = new WebSocket('https://yt-realtime-production.up.railway.app');
      // const ws = new WebSocket('ws://localhost:4001');
      socketRef.current = ws;

      ws.onopen = () => {
        const roomId = [userId, recId].sort().join('_');
        ws.send(JSON.stringify({ type: 'join_room', senderId: userId, receiverId: recId }));
      };

      ws.onmessage = handleWebSocketMessage;

      ws.onerror = (error) => console.error('WebSocket error:', error);

      ws.onclose = () => {
        console.warn('WebSocket closed. Reconnecting...');
        setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
      };
    };

    connectWebSocket();

    return () => socketRef.current?.close();
  }, [recId, handleWebSocketMessage]);

  // Fetch chat list
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

  // Fetch single chat
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
      setReceiverName(receiver?.name || 'Unknown');
      setOnlineStatus(receiver?.online ? 'Online' : 'Offline');
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  }, []);

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Set the image state
      setIsModalOpen(true); // Open the modal
    } else {
      setImage(null); // Clear the image state if no file is selected
    }
  };
  // Send message
  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !image) || sending) return;
  
    setSending(true);
    const userId = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    let cloudinaryData;
  
    if (image) {
      try {
        const form = new FormData();
        form.append('file', image);
        form.append('upload_preset', 'FirstAccFlipper_preset');
        form.append('cloud_name', 'dgh6eftpe');
  
        const cloudinaryResponse = await fetch(CLOUDINARY_URL, { method: 'POST', body: form });
        cloudinaryData = await cloudinaryResponse.json();
  
        if (!cloudinaryData.secure_url) {
          alert('Image upload failed. Please try again.');
          setSending(false);
          return;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setSending(false);
        return;
      }
    }
  
    const newMessageData = {
      senderId: userId,
      receiverId: recId,
      senderName: name || 'Unknown',
      receiverName: receiverName || 'Unknown',
      text: modalMessage || newMessage, // Ensure `text` is included
      image: image ? cloudinaryData.secure_url : null,
    };
  
    console.log('Sending message:', newMessageData); // Debug log
  
    try {
      const response = await fetch(`${BaseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessageData),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('response', data);
      } else {
        console.log('ERROR:', data);
      }
      socketRef.current?.send(JSON.stringify({ ...newMessageData, type: 'send_message' }));
      // setActiveConversation((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage('');
      setImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  // Handle modal actions
  const handleSendFromModal = async () => {
    if (!modalMessage.trim()) return;

    // setNewMessage(modalMessage);
    setIsModalOpen(false);
    await handleSendMessage();
    setModalMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImage(null);
  };

  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    const updatedConversations = conversations.map((conv) =>
      conv._id === conversation._id ? { ...conv, unread: false } : conv
    );
    setConversations(updatedConversations);

    const uid = localStorage.getItem('id');
    setActiveConversation([]);
    const targetId = conversation.receiverId === uid ? conversation.senderId : conversation.receiverId;
    navigate(`/chat/${targetId}`);
    fetchChat(targetId);
  };

  return (
    <div className="admin-chat" style={{ marginTop: '5%' }}>
      <div className="chat-container" style={{ height: '520px' }}>
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h3>Conversations</h3>
          </div>
          <div className="chat-conversations">
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                className={`chat-conversation-item ${conversation.unread ? 'unread' : ''}`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="chat-user-avatar">
                  {conversation.receiverId === id
                    ? conversation.senderName?.charAt(0)
                    : conversation.receiverName?.charAt(0)}
                </div>
                <div className="chat-conversation-info">
                  <div className="chat-conversation-header">
                    <span className="chat-user-name">
                      {conversation.receiverId === id
                        ? conversation.senderName
                        : conversation.receiverName}
                    </span>
                    <span className="chat-time">
                      {conversation.createdAt && timeAgo(conversation.createdAt)}
                    </span>
                  </div>
                  <div className="chat-last-message">{conversation.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          {activeConversation.length > 0 || recId ? (
            <>
              <div className="chat-header">
                <div className="chat-header-user">
                  <div className="chat-user-avatar larger">{receiverName?.charAt(0)}</div>
                  <div className="chat-user-info">
                    <h3 className="chat-active-user">{receiverName}</h3>
                    <span className="chat-user-status">{onlineStatus}</span>
                  </div>
                </div>
              </div>
              <div className="chat-messages">
  {activeConversation.map((message, index) => (
    <div
      key={index}
      className={`chat-message ${message.senderId === id ? 'outgoing' : 'incoming'}`}
    >
      <div className="chat-message-content">
        {message.image && (
          <img
            src={message.image}
            alt="Message"
            style={{ height: 120, width: 200, borderRadius: 5 }}
          />
        )}
        {message.text ? (
          <p
            className="text-sm break-words text-left w-full"
            style={{ textAlign: 'left', width: '100%' }}
          >
            <LinkifyText text={message.text} />
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic">No message content</p>
        )}
        <span className="chat-message-time">
          {message.createdAt && timeAgo(message.createdAt)}
        </span>
      </div>
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>
              <div className="chat-input w-full">
                <IconButton color="primary" component="label">
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                  <Image />
                </IconButton>
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
                  className="chat-input-field w-full"
                ></textarea>
                <button
                  className="chat-send-btn"
                  onClick={handleSendMessage}
                  disabled={(!newMessage.trim() && !image) || sending}
                >
                  {sending ? 'Sending...' : 'Send'}
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

      {/* Modal for Image Preview */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="image-preview-modal"
        aria-describedby="image-preview-and-message"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {image && (
            <div className="image-preview">
              <img
                src={(() => {
                  try {
                    return URL.createObjectURL(image);
                  } catch (error) {
                    console.error('Error creating object URL:', error);
                    return '';
                  }
                })()}
                alt="Preview"
                style={{ width: '100%', borderRadius: 5, marginBottom: 10 }}
              />
            </div>
          )}
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Type your message..."
            value={modalMessage}
            onChange={(e) => setModalMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendFromModal}
              disabled={!modalMessage.trim()}
            >
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserChat;