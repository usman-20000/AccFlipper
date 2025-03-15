import React, { useState, useEffect, useRef } from 'react';

const AdminChat = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([
    { 
      id: 1, 
      user: 'John Doe', 
      lastMessage: 'When will my account be valued?', 
      time: '10:30 AM',
      unread: true,
      messages: [
        { id: 1, sender: 'user', text: 'Hi, I\'ve submitted my Netflix account for valuation', time: '10:15 AM' },
        { id: 2, sender: 'user', text: 'When will my account be valued?', time: '10:30 AM' }
      ]
    },
    { 
      id: 2, 
      user: 'Jane Smith', 
      lastMessage: 'Thanks for your help!', 
      time: 'Yesterday',
      unread: false,
      messages: [
        { id: 1, sender: 'user', text: 'I have a question about my listing', time: 'Yesterday' },
        { id: 2, sender: 'admin', text: 'Of course, how can I help?', time: 'Yesterday' },
        { id: 3, sender: 'user', text: 'Is it possible to edit the price?', time: 'Yesterday' },
        { id: 4, sender: 'admin', text: 'Yes, you can edit your listing from your profile page.', time: 'Yesterday' },
        { id: 5, sender: 'user', text: 'Thanks for your help!', time: 'Yesterday' }
      ]
    },
    { 
      id: 3, 
      user: 'Mike Johnson', 
      lastMessage: 'I need help with my account', 
      time: 'Jul 15',
      unread: true,
      messages: [
        { id: 1, sender: 'user', text: 'I need help with my account', time: 'Jul 15' }
      ]
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    // Scroll to bottom of messages when messages change or active conversation changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation, conversations]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        const updatedMessages = [
          ...conv.messages,
          {
            id: conv.messages.length + 1,
            sender: 'admin',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: newMessage,
          time: 'Just now'
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setNewMessage('');
    
    // Update active conversation with new messages
    if (activeConversation) {
      const updated = updatedConversations.find(c => c.id === activeConversation.id);
      setActiveConversation(updated);
    }
  };
  
  const handleSelectConversation = (conversation) => {
    // Mark conversation as read when selected
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id && conv.unread) {
        return { ...conv, unread: false };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Set the updated conversation as active
    const updated = updatedConversations.find(c => c.id === conversation.id);
    setActiveConversation(updated);
    
    // Load user notes and profile data for the selected conversation
    if (conversation.id === 1) {
      setUserNotes('Customer inquired about valuation process. Explanation provided on 2023-07-14.');
      setUserProfile({
        username: 'johndoe123',
        email: 'john_doe@example.com',
        phone: '+1 (555) 123-4567',
        memberSince: '2023-05-12',
        listings: 3,
        transactions: 1
      });
    } else if (conversation.id === 2) {
      setUserNotes('Frequent customer with good transaction history. Has purchased 5 accounts in the past.');
      setUserProfile({
        username: 'janesmith22',
        email: 'jane_smith@example.com',
        phone: '+1 (555) 987-6543',
        memberSince: '2023-02-18',
        listings: 0,
        transactions: 5
      });
    } else if (conversation.id === 3) {
      setUserNotes('New user, first time contacting support.');
      setUserProfile({
        username: 'mikejohnson44',
        email: 'mike_johnson@example.com',
        phone: '+1 (555) 456-7890',
        memberSince: '2023-07-10',
        listings: 1,
        transactions: 0
      });
    }
  };
  
  const handleNotesSubmit = (e) => {
    e.preventDefault();
    setShowNotesModal(false);
    // In a real app, you would save these notes to the database
    console.log('Notes saved:', userNotes);
  };
  
  return (
    <div className="admin-chat">
      <h2>Chat Console</h2>
      
      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h3>Conversations</h3>
          </div>
          <div className="chat-conversations">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`chat-conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''} ${conversation.unread ? 'unread' : ''}`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="chat-user-avatar">{conversation.user.charAt(0)}</div>
                <div className="chat-conversation-info">
                  <div className="chat-conversation-header">
                    <span className="chat-user-name">{conversation.user}</span>
                    <span className="chat-time">{conversation.time}</span>
                  </div>
                  <div className="chat-last-message">
                    {conversation.lastMessage}
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
                  <div className="chat-user-avatar larger">{activeConversation.user.charAt(0)}</div>
                  <div className="chat-user-info">
                    <h3 className="chat-active-user">{activeConversation.user}</h3>
                    <span className="chat-user-status online">Online</span>
                  </div>
                </div>
                <div className="chat-header-actions">
                  <button className="chat-action-btn" onClick={() => setShowNotesModal(true)}>
                    <span className="action-icon"><i className="fa fa-file-alt"></i></span> View Notes
                  </button>
                  <button className="chat-action-btn" onClick={() => setShowProfileModal(true)}>
                    <span className="action-icon"><i className="fa fa-user"></i></span> Profile
                  </button>
                </div>
              </div>
              
              <div className="chat-messages">
                {activeConversation.messages.map(message => (
                  <div 
                    key={message.id}
                    className={`chat-message ${message.sender === 'admin' ? 'outgoing' : 'incoming'}`}
                  >
                    <div className="chat-message-content">
                      <p>{message.text}</p>
                      <span className="chat-message-time">{message.time}</span>
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
                <span className="empty-icon"><i className="fa fa-comments fa-3x"></i></span>
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
          <div className={`chat-backdrop ${showNotesModal ? 'show' : ''}`} onClick={() => setShowNotesModal(false)}></div>
          <div className={`chat-modal ${showNotesModal ? 'show' : ''}`}>
            <div className="chat-modal-header">
              <h3>User Notes - {activeConversation?.user}</h3>
              <button className="chat-modal-close" onClick={() => setShowNotesModal(false)}>×</button>
            </div>
            <form onSubmit={handleNotesSubmit}>
              <div className="chat-modal-body">
                <div className="chat-notes-container">
                  <textarea 
                    className="chat-notes-textarea"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Enter notes about this customer..."
                  ></textarea>
                </div>
              </div>
              <div className="chat-modal-footer">
                <button className="admin-btn admin-btn-secondary" type="button" onClick={() => setShowNotesModal(false)}>Cancel</button>
                <button className="admin-btn admin-btn-primary" type="submit">Save Notes</button>
              </div>
            </form>
          </div>
        </>
      )}
      
      {/* Profile Modal */}
      {showProfileModal && userProfile && (
        <>
          <div className={`chat-backdrop ${showProfileModal ? 'show' : ''}`} onClick={() => setShowProfileModal(false)}></div>
          <div className={`chat-modal ${showProfileModal ? 'show' : ''}`}>
            <div className="chat-modal-header">
              <h3>User Profile - {activeConversation?.user}</h3>
              <button className="chat-modal-close" onClick={() => setShowProfileModal(false)}>×</button>
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
              
              <div className="user-actions">
                <h4>Quick Actions</h4>
                <div className="admin-action-buttons" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="admin-btn admin-btn-secondary">View Listings</button>
                  <button className="admin-btn admin-btn-primary">View Transactions</button>
                </div>
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
        </>
      )}
    </div>
  );
};

export default AdminChat;
