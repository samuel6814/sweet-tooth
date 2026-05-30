import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { authClient } from '../../lib/auth';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const Header = styled.div`
  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    color: #00658d;
    margin: 0 0 0.5rem 0;
    letter-spacing: 1px;
  }
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #3e4850;
    margin: 0;
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 1024px) { grid-template-columns: 1fr 1fr; }
`;

const Section = styled(motion.div)`
  background: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid #e0e3e5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #191c1e;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid #e0e3e5;
    padding-bottom: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #3e4850;
  }

  input {
    padding: 0.75rem 1rem;
    border: 1px solid #bdc8d1;
    border-radius: 0.75rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1rem;
    color: #191c1e;
    background: #f7f9fb;
    outline: none;
    transition: border-color 0.2s;

    &:focus { border-color: #26b1ff; background: #ffffff; }
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text {
    h4 {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #191c1e;
      margin: 0 0 0.25rem 0;
    }
    p {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.85rem;
      color: #8fa3b0;
      margin: 0;
    }
  }

  /* Simple CSS Toggle Switch */
  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;

    input { opacity: 0; width: 0; height: 0; }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #bdc8d1;
      transition: .4s;
      border-radius: 24px;

      &:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
    }

    input:checked + .slider { background-color: #ff5722; }
    input:checked + .slider:before { transform: translateX(20px); }
  }
`;

const SaveButton = styled.button`
  background: #00658d;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;

  &:hover { background: #004c6b; }
`;

const Feedback = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${(props) => (props.$error ? '#ffebee' : '#e8f7ee')};
  color: ${(props) => (props.$error ? '#c62828' : '#15803d')};
`;

const UserSettings = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) {
        setProfileMsg({ error: true, text: error.message || 'Failed to update profile.' });
      } else {
        setProfileMsg({ error: false, text: 'Profile updated successfully.' });
      }
    } catch (err) {
      setProfileMsg({ error: true, text: 'Something went wrong. Please try again.' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      setPwdMsg({ error: true, text: 'Please fill in both password fields.' });
      return;
    }
    if (newPassword.length < 8) {
      setPwdMsg({ error: true, text: 'New password must be at least 8 characters.' });
      return;
    }
    setSavingPwd(true);
    setPwdMsg(null);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });
      if (error) {
        setPwdMsg({ error: true, text: error.message || 'Failed to update password.' });
      } else {
        setPwdMsg({ error: false, text: 'Password updated successfully.' });
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setPwdMsg({ error: true, text: 'Something went wrong. Please try again.' });
    } finally {
      setSavingPwd(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <h1>Account Settings</h1>
        <p>Manage your profile, security, and notification preferences.</p>
      </Header>

      <SettingsGrid>
        <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3><User size={20} color="#00658d" /> Profile Information</h3>
          <FormGroup>
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </FormGroup>
          <FormGroup>
            <label>Email Address</label>
            <input type="email" value={email} disabled title="Email cannot be changed here" style={{ opacity: 0.7, cursor: 'not-allowed' }} />
          </FormGroup>
          <FormGroup>
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Kumasi, Ghana" />
          </FormGroup>
          {profileMsg && (
            <Feedback $error={profileMsg.error}>
              {!profileMsg.error && <CheckCircle2 size={16} />} {profileMsg.text}
            </Feedback>
          )}
          <SaveButton onClick={handleSaveProfile} disabled={savingProfile}>
            {savingProfile ? <Loader2 size={18} /> : <Save size={18} />} Save Changes
          </SaveButton>
        </Section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3><Bell size={20} color="#00658d" /> Notifications</h3>
            <ToggleRow>
              <div className="text">
                <h4>AI Scan Updates</h4>
                <p>Get notified when your scan report is ready.</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </ToggleRow>
            <ToggleRow>
              <div className="text">
                <h4>Clinic Reminders</h4>
                <p>Alerts for upcoming consultation bookings.</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </ToggleRow>
          </Section>

          <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3><Lock size={20} color="#00658d" /> Security</h3>
            <FormGroup>
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>New Password</label>
              <input type="password" placeholder="At least 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </FormGroup>
            {pwdMsg && (
              <Feedback $error={pwdMsg.error}>
                {!pwdMsg.error && <CheckCircle2 size={16} />} {pwdMsg.text}
              </Feedback>
            )}
            <SaveButton onClick={handleUpdatePassword} disabled={savingPwd} style={{ background: '#e1f2ff', color: '#00658d' }}>
              {savingPwd ? <Loader2 size={18} /> : null} Update Password
            </SaveButton>
          </Section>
        </div>
      </SettingsGrid>
    </PageContainer>
  );
};

export default UserSettings;