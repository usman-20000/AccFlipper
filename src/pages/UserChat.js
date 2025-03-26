import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BaseUrl, fetchUser, timeAgo } from '../utils/data';
import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';


const UserChat = () => {

  const { recId } = useParams();
  const navigate = useNavigate();

  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [socket, setSocket] = useState(null);
  const [id, setId] = useState('');

  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    if (recId) {
      const myId = localStorage.getItem('id');
      fetchChat(recId);
      console.log('id:', myId, recId);

      const ws = new WebSocket("https://yt-realtime-production.up.railway.app");

      ws.onopen = () => {
        console.log("Connected to WebSocket server");

        // Join chat room
        const joinRoomData = {
          type: "join_room",
          senderId: myId,
          receiverId: recId,
        };
        ws.send(JSON.stringify(joinRoomData));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "receive_message") {
          setActiveConversation((prevMessages) => [...prevMessages, data.message]);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [recId]);

  // useEffect(() => {
  //   if (recId) {
  //     const userId = localStorage.getItem('id');
  //     fetchChat(recId);

  //     if (userId && recId) {
  //       console.log(`Emitting join_room with senderId: ${userId}, receiverId: ${recId}`);
  //       socket.emit('join_room', { senderId: userId, receiverId: recId });
  //     }

  //     const handleReceiveMessage = (data) => {
  //       setActiveConversation((prevMessages) => [...prevMessages, data]);
  //     };

  //     socket.on('receive_message', handleReceiveMessage);

  //     return () => {
  //       socket.off('receive_message', handleReceiveMessage);
  //     };
  //   }
  // }, [recId]);


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

        
      const receiver = await fetchUser(receiverId);
      const receiverName = await receiver.name;

    const newMessageData = {
      senderId: userId,
      receiverId: recId ? recId : receiverId,
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

      const newMessageData2 = {
        senderId: userId,
        receiverId: recId ? recId : receiverId,

        message: newMessage,
        time: new Date().toISOString(),
      };

      console.log('newMessageData2:', newMessageData2);
      // setActiveConversation((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const sendMessage = async () => {
    const myId = localStorage.getItem('id');
    const name = localStorage.getItem('name');

    if (socket && newMessage.trim() !== "") {

      const receiverId =
        activeConversation[0]?.receiverId === myId
          ? activeConversation[0]?.senderId
          : activeConversation[0]?.receiverId;

      const receiver = await fetchUser(receiverId);
      const receiverName = await receiver.name;

      const messageData = {
        type: "send_message",
        senderId: myId,
        receiverId: recId ? recId : receiverId,
        senderName: name,
        receiverName: receiverName,
        message: newMessage,
      };

      console.log('messageData:', messageData);

      socket.send(JSON.stringify(messageData));
      handleSendMessage();
      setNewMessage(""); // Clear input
      fetchChatList();
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
      navigate(`/chat/${conversation.senderId}`);
      fetchChat(conversation.senderId);
    } else {
      navigate(`/chat/${recId ? recId : conversation.receiverId}`);
      fetchChat(recId ? recId : conversation.receiverId);
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
          {activeConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-header-user">
                  <div className="chat-user-avatar larger">
                    {activeConversation[0]?.receiverId === id
                      ? activeConversation[0]?.senderName?.charAt(0)
                      : activeConversation[0]?.receiverName?.charAt(0)}
                  </div>
                  <div className="chat-user-info">
                    <h3 className="chat-active-user">
                      {activeConversation[0]?.receiverId === id
                        ? activeConversation[0]?.senderName
                        : activeConversation[0]?.receiverName}
                    </h3>
                    <span className="chat-user-status online">Online</span>
                  </div>
                </div>
                <div className="chat-header-actions">
                  <button className="chat-action-btn" onClick={() => setShowNotesModal(true)}>
                    <span className="action-icon">
                      <i className="fa fa-file-alt"></i>
                    </span>{' '}
                    View Notes
                  </button>
                  <button className="chat-action-btn" onClick={() => setShowProfileModal(true)}>
                    <span className="action-icon">
                      <i className="fa fa-user"></i>
                    </span>{' '}
                    Profile
                  </button>
                </div>
              </div>

              <div className="chat-messages">
                {activeConversation?.map((message, index) => (
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
                      // handleSendMessage();
                      sendMessage();
                    }
                  }}
                  className="chat-input-field"
                ></textarea>
                <button
                  className="chat-send-btn"
                  onClick={sendMessage}
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

      {/* Notes Modal */}
      {showNotesModal && (
        <>
          <div
            className={`chat-backdrop ${showNotesModal ? 'show' : ''}`}
            onClick={() => setShowNotesModal(false)}
          ></div>
          <div className={`chat-modal ${showNotesModal ? 'show' : ''}`}>
            <div className="chat-modal-header">
              <h3>User Notes</h3>
              <button className="chat-modal-close" onClick={() => setShowNotesModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleNotesSubmit}>
              <div className="chat-modal-body">
                <textarea
                  className="chat-notes-textarea"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Enter notes about this customer..."
                ></textarea>
              </div>
              <div className="chat-modal-footer">
                <button
                  className="admin-btn admin-btn-secondary"
                  type="button"
                  onClick={() => setShowNotesModal(false)}
                >
                  Cancel
                </button>
                <button className="admin-btn admin-btn-primary" type="submit">
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Profile Modal */}
      {showProfileModal && userProfile && (
        <>
          <div
            className={`chat-backdrop ${showProfileModal ? 'show' : ''}`}
            onClick={() => setShowProfileModal(false)}
          ></div>
          <div className={`chat-modal ${showProfileModal ? 'show' : ''}`}>
            <div className="chat-modal-header">
              <h3>User Profile</h3>
              <button className="chat-modal-close" onClick={() => setShowProfileModal(false)}>
                ×
              </button>
            </div>
            <div className="chat-modal-body">
              <div className="user-profile-info">
                <div className="info-row">
                  <span className="info-label">Username:</span>
                  <span className="info-value">{userProfile.username}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{userProfile.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{userProfile.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Member Since:</span>
                  <span className="info-value">{userProfile.memberSince}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Listings:</span>
                  <span className="info-value">{userProfile.listings}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Transactions:</span>
                  <span className="info-value">{userProfile.transactions}</span>
                </div>
              </div>
              <div className="chat-modal-footer">
                <button
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowProfileModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserChat;