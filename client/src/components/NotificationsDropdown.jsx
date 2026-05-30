import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

const DropdownContainer = styled(motion.div)`
  position: absolute;
  top: 120%;
  right: -10px; /* Aligns roughly with the bell icon */
  width: 320px;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 101, 141, 0.12);
  border: 1px solid #e0e3e5;
  z-index: 50;
  overflow: hidden;

  @media (max-width: 640px) {
    position: fixed;
    top: 4.5rem;
    right: 1rem;
    left: 1rem;
    width: auto;
  }
`;

const Header = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e0e3e5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #191c1e;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: #00658d;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const NotificationItem = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #f2f4f6;
  background-color: ${(props) => (props.$unread ? '#fcfdfd' : '#ffffff')};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f7f9fb;
  }

  &:last-child {
    border-bottom: none;
  }

  .icon-box {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    &.primary { background-color: #e1f2ff; color: #00658d; }
    &.alert { background-color: #fff6f3; color: #ff5722; }
    &.success { background-color: #dcfce7; color: #166534; }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    h4 {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      color: #191c1e;
      margin: 0;
    }

    p {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.85rem;
      color: #3e4850;
      margin: 0;
      line-height: 1.4;
    }

    span {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.75rem;
      color: #8fa3b0;
      margin-top: 0.25rem;
    }
  }

  .unread-dot {
    width: 8px;
    height: 8px;
    background-color: #ff5722;
    border-radius: 50%;
    margin-top: 0.5rem;
  }
`;

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Monthly Scan Due",
    message: "It's time for your May check-up! Upload a fresh photo of your teeth to track your progress.",
    time: "2 hours ago",
    icon: <Camera size={18} />,
    type: "alert",
    unread: true,
  },
  {
    id: 2,
    title: "Estimate Saved",
    message: "Your financial estimate for Orthodontic Braces has been saved to your dashboard.",
    time: "1 day ago",
    icon: <FileText size={18} />,
    type: "primary",
    unread: true,
  },
  {
    id: 3,
    title: "Welcome to Sweet Tooth!",
    message: "Your profile is set up. Let's start by taking your first AI oral health scan.",
    time: "3 days ago",
    icon: <Sparkles size={18} />,
    type: "success",
    unread: false,
  }
];

const NotificationsDropdown = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <DropdownContainer
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Header>
            <h3>Notifications</h3>
            <button>Mark all as read</button>
          </Header>
          <NotificationList>
            {MOCK_NOTIFICATIONS.map((notif) => (
              <NotificationItem key={notif.id} $unread={notif.unread}>
                <div className={`icon-box ${notif.type}`}>
                  {notif.icon}
                </div>
                <div className="content">
                  <h4>{notif.title}</h4>
                  <p>{notif.message}</p>
                  <span>{notif.time}</span>
                </div>
                {notif.unread && <div className="unread-dot" />}
              </NotificationItem>
            ))}
          </NotificationList>
        </DropdownContainer>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDropdown;